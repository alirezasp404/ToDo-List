const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todoapp",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO user (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/signin", (req, res) => {
  const sql = "Select * FROM user WHERE `email`= ? AND `password` = ?";
  const values = [req.body.email, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json("success");
    else return res.status(401).json("failed");
  });
});
app.listen(8081, () => console.log("listening"));
