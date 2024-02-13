import express from "express";
import multer from "multer";
import { createImg, getImg } from "../controller/imgContoller.js";

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for handling image upload
router.post("/upload", upload.single("myfile"), createImg);

// Route for retrieving images
router.get("/images", getImg);

export default router;
