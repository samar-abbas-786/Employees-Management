const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { create } = require("domain");
const PORT = process.env.PORT || 3000;

const employees = [
  {
    name: "Samar Abbas",
    salary: 200000,
    post: "Web Developer",
  },
];

//DATABASE Connection
try {
  mongoose
    .connect("mongodb://localhost:27017/ejs-practice")
    .then(() => {
      console.log("Database Connected Successfully!");
    })
    .catch((error) => {
      console.error("Database Connection Error:", error);
    });
} catch (error) {
  console.error("Try-Catch Error:", error);
}

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//view engine

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Post Request

app.post("/", async (req, res) => {
  const name = req.body.name;
  const salary = req.body.salary;
  const post = req.body.post;

  employees.push({
    name: name,
    salary: salary,
    post: post,
  });
});

app.get("/", (req, res) => {
  res.render("home", {
    data: employees,
  });
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
