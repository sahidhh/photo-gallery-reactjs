import filter from "../public/filter.svg";
import sort from "../public/sort.svg";
import "./App.css";
import FloatButton from "./components/FloatButton";

const App = () => {
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
              <a href="#">fjkalfj</a>
              <a href="#">wytew</a>
              <a href="#">xnbb</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn">
              <img src={sort} alt="Sort Button" id="sort-btn" />
            </button>
            <div className="dropdown-menu">
              <a href="#">fjkalfj</a>
              <a href="#">wytew</a>
              <a href="#">xnbb</a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FloatButton/>
      </div>
    </div>
  );
};

export default App;
