require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

// ROUTER FOR /api/employees
app.use("/api/employees", require("./routes/employees"));

// ROUTER FOR /api/equipments
app.use("/api/equipments", require("./routes/equipments"));

// SPECIAL ADDITIONAL ROUTES:

app.patch("/api/attendance/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);

  employee.present = !employee.present;

  employee.save();

  res.json({ msg: "Attendance changed" });
});

app.get("/api/missing", async (req, res) => {
  const employeeMissing = await EmployeeModel.find({ present: false });
  res.json(employeeMissing);
});

app.get("/api/robert", async (req, res) => {
  const queryRegExp = new RegExp(/^Robert/, `i`);
  const employeesCalledRobert = await EmployeeModel.find({ name: queryRegExp });
  return res.json(employeesCalledRobert);
});

// MAIN:

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
