import { join } from "path";
import webpack from "webpack";
import StartServerPlugin from "start-server-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import constants from "../lib/constants";

export default {
  mode: "none",
  target: "node",
  watch: !constants.PRODUCTION,
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?300"]
    })
  ],
  entry: ["webpack/hot/poll?300", join(constants.SRC_DIR, "server/index")],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: {
                    node: "current"
                  }
                }
              ],
              "@babel/react"
            ],
            plugins: [
              "@babel/syntax-dynamic-import",
              "babel-plugin-styled-components",
              "react-hot-loader/babel"
            ]
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin("server.js")
  ],
  output: {
    filename: "server.js",
    path: constants.BUILD_DIR
  }
};
