import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { companyName, companyAddress, companyImageUrl } = req.body;
    const company = await Company.findOne({ companyAddress });
    if (company) {
      return res
        .status(409)
        .json({ message: "Company already exists with the provided address." });
    }
    const newCompany = new Company({
      companyName,
      companyAddress,
      companyImageUrl,
    });
    await newCompany.save();

    return res
      .status(201)
      .json({ message: "Company Created Successfully", company: newCompany });
  } catch (error) {
    console.log("Error in createCompany controller", error);
    return res
      .status(500)
      .json({ message: "Error in createCompany controller" });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    return res.status(200).json({ message: "All Companies Data", companies });
  } catch (error) {
    console.log("Error in getCompanies controller", error);
    return res
      .status(500)
      .json({ message: "error in Get Companies Data controller" });
  }
};

export const updateCompanyStatus = async (req, res) => {
  try {
    const { companyId, status } = req.body;
    const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.status = status;
    await company.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log("Error in updateCompanyStatus controller", error);
    return res
      .status(500)
      .json({ message: "error in Update Company Status controller" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyId, companyName, companyAddress, companyImageUrl } =
      req.body;
    const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.companyName = companyName;
    company.companyAddress = companyAddress;
    company.companyImageUrl = companyImageUrl;
    await company.save();

    return res.status(200).json({ message: "Company Data Updated" });
  } catch (error) {
    console.log("Error in updateCompany controller", error);
    return res
      .status(500)
      .json({ message: "error in updateCompany controller" });
  }
};
