import Role from "../models/role.model.js";

export const createRole = async (req, res) => {
  try {
    const { roleName, moduleName } = req.body;

    const role = await Role.findOne({ roleName });
    if (role) {
      return res.status(409).json({
        message: "Role already exists with the provided Name.",
      });
    }
    const newRole = new Role({
      roleName,
      moduleName,
    });
    await newRole.save();
    return res
      .status(201)
      .json({ message: "Role Created Sucessfully", newRole });
  } catch (error) {
    console.log("error in createRole controller", error);
    return res.status(500).json({ message: "error in createRole controller" });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    return res.status(200).json({ message: "All orders Data", roles });
  } catch (error) {
    console.log("Error in getRoles controller", error);
    return res.status(500).json({ message: "Error in getRoles controller" });
  }
};

export const updateRoleStatus = async (req, res) => {
  try {
    const { roleId, status } = req.body;
    const role = await Role.findOne({ roleId });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.status = status;
    await role.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log("error in Update Role Status controller", error);
    return res
      .status(500)
      .json({ message: "error in Update Role Status controller" });
  }
};

export const getRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findOne({ roleId });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({ message: "Role Data", role });
  } catch (error) {
    console.log("Error in Get User Data controller", error);
    return res.status(500).json({ message: "Error in GetUserData controller" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { moduleName, roleName, roleId } = req.body;
    const role = await Role.findOne({ roleId });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const checkRole = await Role.findOne({ roleName });

    if (checkRole) {
      if (checkRole.roleId !== role.roleId) {
        return res.status(409).json({
          message: "Role already exists with the provided Name.",
        });
      }
    }

    role.roleName = roleName;
    role.moduleName = moduleName;
    await role.save();

    return res.status(200).json({ message: "Role Updated" });
  } catch (error) {
    console.log("error in Update Role controller", error);
    return res.status(500).json({ message: "error in Update Role controller" });
  }
};
