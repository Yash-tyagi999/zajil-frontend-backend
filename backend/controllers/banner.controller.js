import Banner from "../models/banner.model.js";

export const createBanner = async (req, res) => {
  try {
    const { banner_title, banner_image_url } = req.body;

    const newBanner = new Banner({
      bannerTitle: banner_title,
      bannerImageUrl: banner_image_url,
    });
    await newBanner.save();

    return res
      .status(201)
      .json({ message: "Banner Created Sucessfully", newBanner });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Create Banner controller" });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    return res.status(200).json({ message: "All Banners Data", banners });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Get Riders Data controller" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { bannerId, status } = req.body;
    const banner = await Banner.findOne({ bannerId });
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.status = status;
    await banner.save();

    return res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Update Banner Status controller" });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { bannerId, bannerTitle, bannerImageUrl } = req.body;
    const banner = await Banner.findOne({ bannerId });
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.bannerTitle = bannerTitle;
    banner.bannerImageUrl = bannerImageUrl;
    await banner.save();

    return res.status(200).json({ message: "Banner Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in Update Banner controller" });
  }
};
