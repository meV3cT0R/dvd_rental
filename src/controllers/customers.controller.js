const { client } = require("../db/dbConfig");
const { filterHelper } = require("../utils/filterHelper");
const { getHelper } = require("../utils/getHelper");
const { postHelper } = require("../utils/requestHelpers/postHelper");

async function getCustomers(req, res, params) {
  console.log("Inside getCustomers()");
  getHelper(req, res, params, {
    startStr: "select * from customer",
    endStr: ";",
  });
}

async function postCustomer(req, res, params) {
  console.log("Inside postCustomer()");
  postHelper(
    req,
    res,
    params,
    ["first_name", "last_name", "store_id", "address_id", "email"],
    "customer",
  );
}

module.exports = { getCustomers, postCustomer };
