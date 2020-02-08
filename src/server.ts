
import app from "./config/app";
import("./config/mongoose");


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async () => {
  console.log(" App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  
  console.log("  Press CTRL-C to stop\n");
});

export default server;
