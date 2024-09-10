const { Client } = require("pg");

const client = new Client({
  user: "vector",
  password: "",
  host: "localhost",
  port: "5432",
  database: "dvdrental",
});

module.exports = { client };
