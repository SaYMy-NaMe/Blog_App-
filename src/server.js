const app = require("./app");
const { port } = require("./config");
const pool = require("./pool");
const createTable = require("./utils/query");

async function main() {
  try {
    pool.connect((error) => {
      if (error) {
        console.log(`error occurred while connecting ${error}`);
      } else {
        console.log("connection created with postgres successfully");

        // for (const key in createTable) {
        //   createTable[key]();
        // }

        //createTable.userRole();
        //createTable.users();
        //createTable.categoryENUM();
        //createTable.posts();
        //createTable.comments();
      }
    });
    app.listen(port, () => {
      console.log(`app listening on port ${port} | http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
}

main();
