const { extractParams } = require("../utils/extractParam");
const { routeConfig } = require("./config");

async function route(req, res, path, param) {
  console.log(path[0]);
  console.log(req.method);
  const f = routeConfig[path[0]][req.method.toLowerCase()];
  if (!f) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Not Found",
      }),
    );
    return;
  }

  f(req, res, extractParams(param));
}
module.exports = { route };
