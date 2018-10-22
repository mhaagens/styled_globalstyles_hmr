import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { join } from "path";
import constants from "./lib/constants";
import serverConfig from "./config/server";
import clientConfig from "./config/client";

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

const devServer = new WebpackDevServer(clientCompiler, {
  port: 9000,
  hot: true,
  overlay: {
    errors: true,
    warnings: false
  },
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

const startDevServer = () => {
  devServer.listen(9000, "127.0.0.1", () =>
    console.log("Webpack Dev Server listening on port 9000.")
  );
};

if (!constants.PRODUCTION) {
  serverCompiler.watch(
    {
      ignored: /node_modules/
    },
    (err, stats) => {
      if (err) console.log(err);
    }
  );

  let started = false;

  serverCompiler.hooks.done.tap("StartServer", stats => {
    if (!started) {
      started = true;
      startDevServer();
    }
  });
}
