import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  user: "root",
  password: "password",
  database: "photo_gallery",
});

app.use(cors());
app.use(express.json());

app.get("/photos", (req, res) => {
  const q = "SELECT * FROM photos";
  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});
app.get("/photos/latest-first", (req, res) => {
  const q = "SELECT * FROM photos ORDER BY last_updated DESC";
  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});
app.get("/photos/latest-last", (req, res) => {
  const q = "SELECT * FROM photos ORDER BY last_updated ASC";
  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});
app.get("/photos/name", (req, res) => {
  const q = "SELECT * FROM photos ORDER BY artist_name ASC";
  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});

app.get("/photos/name/unique", (req, res) => {
  const q = "SELECT id, artist_name FROM photos GROUP BY artist_name";
  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});

app.post("/photos", (req, res) => {
  const q =
    "INSERT INTO photos (`artist_name`, `url`, `description`) VALUES (?)";
  const values = [req.body.name, req.body.url, req.body.desc];
  db.query(q, [values], (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});

app.put("/photos/update/:id", (req, res) => {
  const q = "UPDATE photos SET favorite = ? WHERE id = ?";
  db.query(q, [req.body.favorite, req.params.id], (err, data) => {
    if (err) console.log(err);
    console.log("updated id=" + req.params.id);
  });
});

app.delete("/photos/delete/:id", (req, res) => {
  const q = "DELETE FROM photos WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) console.log(err);
    console.log("deleted id=" + req.params.id);
  });
});

app.listen(8800, () => {
  console.log("Connected to server");
});
