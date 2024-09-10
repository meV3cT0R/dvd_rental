const {
  getCustomers,
  postCustomer,
} = require("../controllers/customers.controller");
const { getStaff, postStaff } = require("../controllers/staff.controller");

const routeConfig = {
  customers: {
    get: getCustomers,
    post: postCustomer,
  },
  staff: {
    get: getStaff,
    post: postStaff,
  },
};

module.exports = { routeConfig };
