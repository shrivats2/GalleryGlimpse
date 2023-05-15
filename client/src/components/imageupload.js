import React, { useState } from "react";
import styles from './imageupload.css'

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus(`Image uploaded successfully`);
      } else {
        setUploadStatus("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("An error occurred during the image upload.");
    }
  };

  return (
    <div className="formupload">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="title">
            Title 
          </label>
          <input
            type="text"
            name="title"
            id="title"
            class="form-controll"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div class="form-group">
          <label for="caption">
            Description
          </label>
          <input
            type="text"
            name="caption"
            id="caption"
            class="form-controll"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div class="form-group file-area">
          <label for="images">
            Image
          </label>
          <input
            type="file"
            name="images"
            id="images"
            required="required"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div class="file-dummy">
            <div class="success">Great, your image is selected. Keep on.</div>
            <div class="default">Please select some image.</div>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" className="btn-ln1">Upload image</button>
        </div>
      </form>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default ImageUploadForm;
