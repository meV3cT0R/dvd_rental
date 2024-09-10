const http = require("http");
const { route } = require("./src/router/route");
const { client } = require("./src/db/dbConfig");

async function server() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    console.log(e);
    process.exit(0);
  }

  const hostname = "localhost";
  const port = 8080;

  const server = http.createServer((req, res) => {
    if (!req.url.startsWith("/api/v1")) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Hello World",
        }),
      );
      return;
    }

    const pathAndQuery = req.url.split("?");
    const path = pathAndQuery[0].split("/").slice(3);
    const query = pathAndQuery[1];

    route(req, res, path, query);
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

server().catch((err) => {
  console.log(err);
});
