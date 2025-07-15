import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getBranches,
  updateStatus,
  updateWeekdaysShift,
} from "../reduxToolkit/slices/branch";
import ShiftInput from "../components/ShiftInput";

const STATUS_OPEN = "Open";
const STATUS_CLOSE = "Close";

const dayList = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

function useFocusTrap(isActive, modalRef) {
  useEffect(() => {
    if (!isActive || !modalRef.current) return;

    const focusableSelectors =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

    const modalNode = modalRef.current;
    const focusableElements = modalNode.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      if (e.key === "Escape") {
      }
    }

    modalNode.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      modalNode.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, modalRef]);
}

function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({});
  const [savingShift, setSavingShift] = useState(false);
  const [updatingStatusIds, setUpdatingStatusIds] = useState(new Set());
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  const modalRef = useRef(null);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await dispatch(getBranches());
        if (res?.payload?.status === 200) {
          if (isMounted) setBranches(res.payload.data?.branches || []);
        } else {
          if (isMounted)
            setError(res?.payload?.message || "Failed to load Branches");
        }
      } catch {
        if (isMounted) setError("Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useFocusTrap(showModal, modalRef);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBranchStatus = async (branchId) => {
    if (updatingStatusIds.has(branchId)) return;

    const branch = branches.find((b) => b.branchId === branchId);
    if (!branch) return;

    const newStatus =
      branch.status === STATUS_OPEN ? STATUS_CLOSE : STATUS_OPEN;
    try {
      setUpdatingStatusIds((prev) => new Set(prev).add(branchId));
      const res = await dispatch(updateStatus({ branchId, status: newStatus }));
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setBranches((prevBranches) =>
          prevBranches.map((b) =>
            b.branchId === branchId ? { ...b, status: newStatus } : b
          )
        );
        toast.success(`Branch ${branch.name} status updated to "${newStatus}"`);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Network error while updating status");
    } finally {
      setUpdatingStatusIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(branchId);
        return newSet;
      });
    }
  };

  const filteredBranches = branches.filter(
    (b) =>
      !debouncedSearch ||
      b?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleOpenModal = useCallback((branch) => {
    const defaultShift = {
      morning: { enabled: false, start: "08:00", end: "11:30" },
      evening: { enabled: false, start: "11:31", end: "21:30" },
    };

    const transformedFormState = {};
    dayList.forEach((day) => {
      transformedFormState[day] = {
        morning: {
          enabled:
            branch?.weekdaysShift?.[day]?.morning?.enabled ??
            defaultShift.morning.enabled,
          start:
            branch?.weekdaysShift?.[day]?.morning?.start ??
            defaultShift.morning.start,
          end:
            branch?.weekdaysShift?.[day]?.morning?.end ??
            defaultShift.morning.end,
        },
        evening: {
          enabled:
            branch?.weekdaysShift?.[day]?.evening?.enabled ??
            defaultShift.evening.enabled,
          start:
            branch?.weekdaysShift?.[day]?.evening?.start ??
            defaultShift.evening.start,
          end:
            branch?.weekdaysShift?.[day]?.evening?.end ??
            defaultShift.evening.end,
        },
      };
    });
    setSelectedBranchId(branch.branchId);
    setFormState(transformedFormState);
    setFormErrors({});
    setShowModal(true);
  }, []);

  const handleShiftChange = (day, shift, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [shift]: {
          ...prev[day]?.[shift],
          [field]: value,
        },
      },
    }));
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[day]?.[shift]?.[field]) {
        newErrors[day][shift][field] = null;
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    const errors = {};
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    dayList.forEach((day) => {
      errors[day] = { morning: {}, evening: {} };

      ["morning", "evening"].forEach((shift) => {
        const shiftData = formState[day]?.[shift];
        if (!shiftData) return;

        if (shiftData.enabled) {
          if (!timeRegex.test(shiftData.start)) {
            errors[day][shift].start = "Invalid start time format";
          }
          if (!timeRegex.test(shiftData.end)) {
            errors[day][shift].end = "Invalid end time format";
          }
          if (
            timeRegex.test(shiftData.start) &&
            timeRegex.test(shiftData.end) &&
            shiftData.start >= shiftData.end
          ) {
            errors[day][shift].start = "Start time must be before end time";
            errors[day][shift].end = "End time must be after start time";
          }
        }
      });
    });

    for (const day in errors) {
      ["morning", "evening"].forEach((shift) => {
        if (!errors[day][shift].start && !errors[day][shift].end) {
          delete errors[day][shift];
        }
      });
      if (Object.keys(errors[day]).length === 0) {
        delete errors[day];
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmitWeekdaysShift = async () => {
    if (savingShift) return;

    if (!validateForm()) {
      toast.error("Please fix validation errors before saving");
      return;
    }

    setSavingShift(true);
    try {
      const branch = branches.find((b) => b.branchId === selectedBranchId);
      if (!branch) return;

      const res = await dispatch(
        updateWeekdaysShift({
          weekdaysShift: formState,
          branchId: selectedBranchId,
        })
      );
      const resStatus = res?.payload?.status;

      if (resStatus === 200) {
        setBranches((prevBranches) =>
          prevBranches.map((b) =>
            b.branchId === selectedBranchId
              ? { ...b, weekdaysShift: formState }
              : b
          )
        );
        toast.success(`Branch ${branch.name} Weekdays Shift updated`);
        setShowModal(false);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Network error while updating shift");
    } finally {
      setSavingShift(false);
    }
  };

  const BusinessHoursModal = () => {
    if (!showModal) return null;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setShowModal(false);
      }
    };

    return (
      <div
        className="modal-open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={handleKeyDown}
        ref={modalRef}
        tabIndex={-1}
        style={{ outline: "none" }}
      >
        <div className="ModalBox">
          <div className="modal fade show" style={{ display: "block" }}>
            <div
              className="modal-dialog"
              style={{ maxWidth: 1000, top: 0, width: "auto" }}
            >
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <button
                      type="button"
                      className="CloseModal"
                      aria-label="Close business hours settings modal"
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </button>
                    <h3 id="modal-title">Set Business Hours</h3>
                    <div
                      className="TableList ShiftBox"
                      style={{ overflowX: "auto" }}
                    >
                      <table>
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th>Morning Shift</th>
                            <th>Evening Shift</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dayList.map((day) => (
                            <tr key={day}>
                              <td>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </td>

                              <td>
                                <ShiftInput
                                  day={day}
                                  shiftType="morning"
                                  shiftData={formState?.[day]?.morning}
                                  onChange={handleShiftChange}
                                  errors={formErrors?.[day]?.morning || {}}
                                />
                              </td>

                              <td>
                                <ShiftInput
                                  day={day}
                                  shiftType="evening"
                                  shiftData={formState?.[day]?.evening}
                                  onChange={handleShiftChange}
                                  errors={formErrors?.[day]?.evening || {}}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="Button"
                      onClick={handleSubmitWeekdaysShift}
                      disabled={savingShift}
                      aria-disabled={savingShift}
                    >
                      {savingShift ? "Saving..." : "Save Timings"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BranchTable = () => (
    <>
      {loading && <p>Loading Branches...</p>}
      {error && (
        <p className="error" role="alert" tabIndex={0}>
          {error}
        </p>
      )}
      {!loading && filteredBranches.length === 0 && <p>No Branch found.</p>}

      {!loading && filteredBranches.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Branch ID</th>
              <th>Branch Name</th>
              <th>Branch City</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Business hours</th>
              <th>Status</th>
              <th>Business Hour Settings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.map((branch, index) => (
              <tr key={branch._id || branch.branchId}>
                <td>{index + 1}</td>
                <td>BR-{branch.branchId}</td>
                <td>{branch.name}</td>
                <td>{branch.city}</td>
                <td>{branch.location.coordinates[1]}</td>
                <td>{branch.location.coordinates[0]}</td>
                <td>
                  {branch.businessHours?.start} - {branch.businessHours?.end}
                </td>
                <td>
                  <span
                    className={branch.status === STATUS_OPEN ? "Green" : "Red"}
                    aria-live="polite"
                  >
                    {branch.status === STATUS_OPEN ? "Open" : "Close"}
                  </span>
                </td>
                <td>
                  <div className="Actions">
                    <button
                      type="button"
                      className="Orange"
                      onClick={() => handleOpenModal(branch)}
                      aria-label={`Set business hours for ${branch.name}`}
                    >
                      Set Hours
                    </button>
                  </div>
                </td>
                <td>
                  <label
                    className="Switch"
                    aria-label={`Toggle status of ${branch.name}`}
                  >
                    <input
                      type="checkbox"
                      checked={branch.status === STATUS_OPEN}
                      onChange={() => handleBranchStatus(branch.branchId)}
                      disabled={updatingStatusIds.has(branch.branchId)}
                    />
                    <span className="slider" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );

  return (
    <ErrorBoundary>
      <div>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">Branch Management</h4>
              <Link to="/createbranch" className="TitleLink">
                Add Branch
              </Link>
            </div>
            <div className="FilterBox">
              <div className="form-group">
                <label htmlFor="branch-search">Search By</label>
                <input
                  id="branch-search"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={search}
                  onChange={handleInputChange}
                  aria-label="Search Branch by Name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="TableList">
              <BranchTable />
            </div>
          </div>
        </div>

        <BusinessHoursModal />
      </div>
    </ErrorBoundary>
  );
}

export default BranchManagement;
