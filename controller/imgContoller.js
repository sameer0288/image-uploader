import UserImgSchema from "../model/userImage.js";
import { StatusCodes } from "http-status-codes";

const createImg = async (req, res, next) => {
  try {
    const newImage = await UserImgSchema.create({
      filePath: req.file.filename,
      fileName: req.file.originalname,
    });

    res.status(StatusCodes.CREATED).json({ image: newImage });
  } catch (error) {
    console.error("Error creating image:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create image", details: error.message });
  }
};

const getImg = async (req, res, next) => {
  try {
    const images = await UserImgSchema.find({});
    const image = images[0];

    if (!image) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No image found" });
    }

    res.status(StatusCodes.OK).json({ image });
  } catch (error) {
    console.error("Error retrieving image:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve image", details: error.message });
  }
};

export { createImg, getImg };
