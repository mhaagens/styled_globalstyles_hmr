import { join } from "path";
import webpack from "webpack";
import constants from "../lib/constants";

export default {
  mode: constants.PRODUCTION ? "production" : "development",
  target: "web",
  entry: [
    "webpack-dev-server/client?http://localhost:9000",
    "webpack/hot/only-dev-server",
    join(constants.SRC_DIR, "client/index")
  ],
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: "[name].js",
    path: constants.BUILD_DIR,
    publicPath: "http://localhost:9000/"
  }
};
