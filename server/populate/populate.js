/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipments = require("./equipments.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const { populate } = require("../db/employee.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

/* 
// name splitting into first name, middle name, last name
const namesSplitUp = names.map( name => {
  const nameSplitUp = name.split(" ");

  if (nameSplitUp[2] === undefined) {
      return {
          firstName: nameSplitUp[0],
          middleName: "", 
          lastName: nameSplitUp[1]
      }
  } else if (/D(i|e)l?/.test(nameSplitUp[1]) 
          || /(Jr.|Sr.)/.test(nameSplitUp[2])) {
      return {
          firstName: nameSplitUp[0],
          middleName: "", 
          lastName: nameSplitUp[1] + " " + nameSplitUp[2]
      }
  } else {
      return {
          firstName: nameSplitUp[0],
          middleName: nameSplitUp[1], 
          lastName: nameSplitUp[2]
      }
  }
});
*/

// populate EmployeeModel:
const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name: name,
    level: pick(levels),
    position: pick(positions),
    present: false,
    equipments: [],
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

// populate EquipmentModel:
const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateEquipments();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
