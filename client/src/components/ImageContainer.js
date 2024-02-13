import img from "./image.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const ImageContainer = ({ setIsUploading, setUploaded, setUrl }) => {
  const [fileSrc, setFileSrc] = useState();

  const buttonHandler = (img) => {
    setFileSrc(img);
  };
  const uploadImage = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("myfile", fileSrc);
      const response = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setUrl(response.data.image.filePath);
        fetchImage();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle the error and provide feedback to the user
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploaded(true);
      }, 1000);
    }
  };
  const fetchImage = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/images");

      if (response.status === 200) {
        setUrl(response.data.image.filePath);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      // Handle the error and provide feedback to the user
    }
  };

  useEffect(() => {
    if (!fileSrc) return;
    uploadImage();
  }, [fileSrc]);

  return (
    <div className="img-contant">
      <header>
        <h1>Upload your image</h1>
        <p>File should be Jpeg, Png,...</p>
      </header>
      <div
        className="img-uploader"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setFileSrc(e.dataTransfer.files[0]);
        }}
      >
        <img src={img} alt="data.svg..." />
        <p className="">Drag & Drop your image here</p>
      </div>

      <p className="or">or</p>

      <input
        type="file"
        accept="image/*"
        id="file"
        onChange={(e) => buttonHandler(e.target.files[0])}
      />
      <label htmlFor="file">browser files</label>
      {/* </span> */}
    </div>
  );
};

export default ImageContainer;
