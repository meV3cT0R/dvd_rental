const { client } = require("../../db/dbConfig");

function queryGenerator(params, allowed, table_name) {
  let queryP1 = `insert into ${table_name}`;
  let queryP2 = "(";
  queryP2 += allowed.join(",");
  queryP2 += ")";

  let queryP3 = " values(";
  for (let i = 0; i < allowed.length; i++) {
    if (typeof params[allowed[i]] == "string")
      queryP3 += `'${params[allowed[i]]}'`;
    else queryP3 += params[allowed[i]];
    if (i != allowed.length - 1) queryP3 += ",";
  }
  queryP3 += ")";
  return queryP1 + queryP2 + queryP3;
}

function postHelper(req, res, _, allowed, table_name) {
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
      console.log("Parsing Request Body");
    })
    .on("end", () => {
      body = JSON.parse(Buffer.concat(body).toString());
      console.log("Request Body Parsed");
      const id = 1;

      //let query = `insert into customer(store_id,first_name,last_name,email,address_id) values('${id}','${body.first_name}','${body.last_name}','${body.email}','${body.address_id}')`;

      let query = queryGenerator(body, allowed, table_name);
      console.log(`query generated : ${query}`);
      res.setHeader("Content-Type", "application/json");
      console.log("Inserting data into db");
      client.query(query, (err, _) => {
        if (err) {
          console.log("Error occured");
          console.log(err);
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              message: "Something went wrong",
            }),
          );
          return;
        }
        console.log("Data Successfully Inserted");
        res.statusCode = 201;
        res.end(
          JSON.stringify({
            message: "Resource Successfully Created",
          }),
        );
      });
    });
}

module.exports = { postHelper };
