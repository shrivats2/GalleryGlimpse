import React, {useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch} from "react-redux";
import ImageUploadForm from "../components/imageupload";
import { faEye } from  '@fortawesome/free-solid-svg-icons';

const ImageView = ({ images }) => {
    const dispatch = useDispatch();
    const [showDesMap, setShowDesMap] = useState({});

    const imageClicked = async (image) => {
        try {
          const response = await fetch(
            `https://galleryglimpse.onrender.com/images/${image._id}/view`,
            {
              method: "PUT",
            }
          );
    
          if (response.ok) {
            const updatedImage = await response.json();
            dispatch({ type: "UPDATE_IMAGE", payload: updatedImage });
          }
        } catch (error) {
          console.error(error);
        }
      };

      const toggleDescription = (imageId) => {
        setShowDesMap((prevShowDesMap) => ({
          ...prevShowDesMap,
          [imageId]: !prevShowDesMap[imageId],
        }));
      };


  return (
    <>
    <ImageUploadForm/>
    <h1>Image Gallery</h1>
    <div className="show-list-container">
    <ul className="wrapper">
      {images.map((image) => (
        <div
          className="container"
          key={image._id}
          onClick={() => imageClicked(image)}
        >
          <div className="cta">
            <img src={image.imageUrl} alt={image.title} />
            <div className="text">
              <h2>{image.title}</h2>
              <h2 className="space1">    </h2>
              {showDesMap[image._id] === true ? (
                <h2 className="views">
                  <FontAwesomeIcon icon={faEye} />
                  {image.views + 1}</h2>
              ) : (
                <h2 className="views">
                  <FontAwesomeIcon icon={faEye} />
                  {image.views}</h2>
              )}
              <div className="space"></div>
              <p>
                {!showDesMap[image._id] && (
                  <button
                    onClick={() => {
                      toggleDescription(image._id);
                      imageClicked(image);
                    }}
                  >
                    Show Description
                  </button>
                )}
                {showDesMap[image._id] && image.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </ul>
  </div>
  </>
  );
};

export default ImageView;
