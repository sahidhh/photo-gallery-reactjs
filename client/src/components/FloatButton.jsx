import { useState } from "react";
import "./FloatButton.css";

const FloatButton = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", url: "", desc: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormOpen(false);
    setFormData({ name: "", url: "", desc: "" });
  };

  return (
    <div>
      <div
        className="backdrop"
        style={{ display: !formOpen ? "none" : "flex" }}
        onClick={() => setFormOpen(false)}
      >
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
          <h3>Add Photo</h3>
          <div className="form-row">
            <label htmlFor="photographerName">Photographer Name</label>
            <input
              type="text"
              id="photographerName"
              name="name"
              placeholder="Enter Text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="imageURL">Image Url</label>
            <input
              type="text"
              id="imageURL"
              name="url"
              placeholder="Enter Text"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="desc"
              placeholder="Enter Text"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <div className="form-btn">
            <button>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <button className="float-button" onClick={() => setFormOpen(true)}>
        +
      </button>
    </div>
  );
};

export default FloatButton;
