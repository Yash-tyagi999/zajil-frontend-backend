const ShiftInput = ({ day, shiftType, shiftData, onChange }) => {
  const enabled = shiftData?.enabled || false;

  const handleChange = (field, value) => {
    onChange(day, shiftType, field, value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "13px",
        border: "1px solid #304181",
        borderRadius: "5px",
        color: enabled ? "#fff" : "#304181",
        backgroundColor: !enabled ? "#fff" : "#304181",
        marginBottom: "5px",
      }}
    >
      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{ opacity: "0" }}
          type="checkbox"
          checked={enabled}
          onChange={(e) => handleChange("enabled", e.target.checked)}
        />
        <span
          style={{
            cursor: "pointer",
            fontSize: "15px",
            height: "70px",
            width: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: enabled ? "#fff" : "#304181",
            border: "none",
          }}
        >
          {enabled ? "Disable" : "Enable"}
        </span>
      </label>

      <div
        style={{
          display: "flex",
          gap: "10px",
          paddingLeft: "40px",
          paddingTop: "5px",
          backgroundColor: enabled ? "#304181" : "transparent",
          color: enabled ? "#fff" : "#304181",
        }}
      >
        <label>
          Start:
          <input
            type="time"
            value={shiftData.start}
            disabled={!enabled}
            onChange={(e) => handleChange("start", e.target.value)}
            style={{
              height: "30px",
              border: "none",
              backgroundColor: enabled ? "#304181" : "transparent",
              color: enabled ? "#fff" : "#304181",
            }}
          />
        </label>
        <label>
          End:
          <input
            type="time"
            value={shiftData.end}
            disabled={!enabled}
            onChange={(e) => handleChange("end", e.target.value)}
            style={{
              height: "30px",
              border: "none",
              backgroundColor: enabled ? "#304181" : "transparent",
              color: enabled ? "#fff" : "#304181",
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default ShiftInput;
