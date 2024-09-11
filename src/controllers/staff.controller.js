const { getHelper } = require("../utils/getHelper");
const { postHelper } = require("../utils/requestHelpers/postHelper");

async function getStaff(req, res, params) {
  console.log("Inside getStaff()");
  getHelper(req, res, params, {
    startStr: "select * from staff",
    endStr: ";",
  });
}

async function postStaff(req, res, params) {
  console.log("Inside postStaff()");
  postHelper(
    req,
    res,
    params,
    [
      "first_name",
      "last_name",
      "store_id",
      "address_id",
      "email",
      "username",
      "password",
    ],
    "staff",
  );
}
module.exports = { getStaff, postStaff };
