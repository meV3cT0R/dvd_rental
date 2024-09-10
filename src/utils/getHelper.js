const { client } = require("../db/dbConfig");
const { filterHelper } = require("./filterHelper");

async function getHelper(
  req,
  res,
  params,
  hel,
  onError = () => {},
  onSuccess = () => {},
) {
  const query = filterHelper(hel.startStr, hel.endStr, params);
  console.log("retrieving Data");
  client.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.statusCode = 400;
      onError();
      res.end(
        JSON.stringify({
          error: "Something went wrong",
        }),
      );
      return;
    }
    onSuccess();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ...result.rows,
      }),
    );
  });
}

module.exports = { getHelper };
