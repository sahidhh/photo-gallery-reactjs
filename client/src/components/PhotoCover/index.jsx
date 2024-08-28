import { useState } from "react";
import "./PhotoCover.css";
import axios from "axios";

const PhotoCover = ({ id, artist, url, description, date, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [modalOpen, setModalOpen] = useState(false);

  const dateTemp = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateTemp.toLocaleDateString("en-GB", options);

  const updateFavorite = async (value) => {
    await axios
      .put(`http://localhost:8800/photos/update/${id}`, {
        favorite: value,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePhoto = async () => {
    await axios
      .delete(`http://localhost:8800/photos/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(0);
      updateFavorite(0);
    } else {
      setIsFavorite(1);
      updateFavorite(1);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deletePhoto();
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <div
        className="backdrop"
        style={{ display: !modalOpen ? "none" : "flex" }}
        onClick={() => setModalOpen(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h3>Confirm</h3>
          <p>Sure you want to delete the selected photo?</p>
          <div className="form-btn">
            <button className="modal-btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn"
              style={{ backgroundColor: "#F65050" }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="photo-container">
        <div className="options">
          <img
            src={
              isFavorite === 1
                ? "../public/favorite1.svg"
                : "../public/favorite.svg"
            }
            alt=""
            onClick={handleFavorite}
          />
          <img
            src="..\public\Delete.svg"
            alt=""
            onClick={() => setModalOpen(true)}
          />
        </div>
        <img src={url} alt="" />
        <div className="info">
          <p className="photo-desc">{description}</p>
          <div className="photo-details">
            <p className="photo-date">{formattedDate}</p>
            <p className="photo-artist">-{artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCover;
