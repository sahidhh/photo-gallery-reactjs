import { useEffect, useState } from "react";
import axios from "axios";
import filter from "../public/filter.svg";
import sort from "../public/sort.svg";
import "./App.css";
import FloatButton from "./components/FloatButton";
import PhotoCover from "./components/PhotoCover";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [PhotoFilter, setPhotoFilter] = useState("");
  const [PhotoSort, setPhotoSort] = useState("latest-last");

  const fetchAllPhotos = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/photos/${PhotoSort}`);
      await setPhotos(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllPhotos();
    // console.log(PhotoSort);
  }, [PhotoSort]);

  return (
    <div id="container">
      <div id="navbar">
        <h3>Photo Gallery</h3>
        <div id="navbar-tools">
          <div className="dropdown">
            <button className="dropdown-btn">
              <img src={filter} alt="Filter Button" id="filter-btn" />
            </button>
            <div className="dropdown-menu">
              <label htmlFor="latest-first">
                <input
                  type="radio"
                  id="latest-first"
                  name="filter"
                  value="latest-first"
                  onClick={() => setPhotoSort("latest-first")}
                />
                {"  "}Time - Latest First
              </label>

              <label htmlFor="latest-last">
                <input
                  type="radio"
                  id="latest-last"
                  name="filter"
                  value="latest-last"
                  defaultChecked
                  onClick={() => setPhotoSort("latest-last")}
                />
                {"  "}Time - Latest Last
              </label>

              <label htmlFor="name">
                <input
                  type="radio"
                  id="name"
                  name="filter"
                  value="name"
                  onClick={() => setPhotoSort("name")}
                />
                {"  "}Name
              </label>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn">
              <img src={sort} alt="Sort Button" id="sort-btn" />
            </button>
            <div className="dropdown-menu">
              <label htmlFor="all-photos">
                <input
                  type="checkbox"
                  id="all-photos"
                  name="all-photos"
                  value="all-photos"
                />{" "}
                All Photos
              </label>

              <label htmlFor="santhos">
                <input
                  type="checkbox"
                  id="santhos"
                  name="santhos"
                  value="santhos"
                />{" "}
                santhos
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="content-main">
        {photos.map(
          ({ id, artist_name, url, description, last_updated, favorite }) => (
            <PhotoCover
              key={id}
              id={id}
              artist={artist_name}
              url={url}
              description={description}
              date={last_updated}
              favorite={favorite}
            />
          )
        )}
        <FloatButton />
      </div>
    </div>
  );
};

export default App;
