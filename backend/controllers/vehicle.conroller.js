import Vehicle from "../models/vehicle.model.js";

export const createVehicle = async (req, res) => {
  try {
    const {
      vehicleName,
      vehicleType,
      vehicleCapacity,
      vehicleNumber,
      vehicleImageUrl,
    } = req.body;
    const vehicle = await Vehicle.findOne({ vehicleNumber });
    if (vehicle) {
      return res.status(409).json({
        message: "Vehicle already exists with the provided Vehicle Number.",
      });
    }
    const newVehicle = new Vehicle({
      vehicleName,
      vehicleType,
      vehicleCapacity,
      vehicleNumber,
      vehicleImageUrl,
    });
    await newVehicle.save();

    return res
      .status(201)
      .json({ message: "Vehicle Created Successfully", vehicle: newVehicle });
  } catch (error) {
    console.log("Error in createVehicle controller", error);
    return res
      .status(500)
      .json({ message: "Error in createVehicle controller" });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    return res.status(200).json({ message: "All Vehicles Data", vehicles });
  } catch (error) {
    console.log("Error in getVehicles controller", error);
    return res
      .status(500)
      .json({ message: "error in Get Vehicles Data controller" });
  }
};

export const updateVehicleStatus = async (req, res) => {
  try {
    const { vehicleId, status } = req.body;
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.status = status;
    await vehicle.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log("Error in updateVehicleStatus controller", error);
    return res
      .status(500)
      .json({ message: "error in Update Vehicle Status controller" });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const {
      vehicleId,
      vehicleName,
      vehicleType,
      vehicleCapacity,
      vehicleNumber,
      vehicleImageUrl,
    } = req.body;
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.vehicleName = vehicleName;
    vehicle.vehicleType = vehicleType;
    vehicle.vehicleCapacity = vehicleCapacity;
    vehicle.vehicleNumber = vehicleNumber;
    vehicle.vehicleImageUrl = vehicleImageUrl;
    await vehicle.save();

    return res.status(200).json({ message: "Vehicle Data Updated" });
  } catch (error) {
    console.log("Error in updateVehicle controller", error);
    return res
      .status(500)
      .json({ message: "error in updateVehicle controller" });
  }
};
