import Branch from "../models/branch.model.js";

export const createBranch = async (req, res) => {
  try {
    const {
      branch_name,
      branch_city,
      longitude,
      latitude,
      business_hours_start,
      business_hours_end,
    } = req.body;

    const branch = await Branch.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 100,
        },
      },
    });

    if (branch) {
      return res.status(409).json({
        message: "Branch already exists with the provided location.",
      });
    }
    const newBranch = new Branch({
      name: branch_name,
      city: branch_city,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      businessHours: { start: business_hours_start, end: business_hours_end },
    });
    await newBranch.save();
    return res
      .status(201)
      .json({ message: "Branch Created Sucessfully", newBranch });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Create Branch controller" });
  }
};

export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();

    return res.status(200).json({ message: "All branches Data", branches });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Get Branches Data controller" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { branchId, status } = req.body;
    const branch = await Branch.findOne({ branchId });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    branch.status = status;
    await branch.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Update Branch Status controller" });
  }
};

export const updateWeekdaysShift = async (req, res) => {
  try {
    const { branchId, weekdaysShift } = req.body;

    const branch = await Branch.findOne({ branchId });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    branch.weekdaysShift = weekdaysShift;
    await branch.save();

    return res.status(200).json({ message: "Weekdays Shift Updated", branch });
  } catch (error) {
    console.error("Error in Update Weekdays Shift controller:", error);

    return res.status(500).json({ message: "Error updating weekdays shift" });
  }
};
