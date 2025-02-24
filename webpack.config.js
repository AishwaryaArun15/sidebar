const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { port: 3002 },
  output: { publicPath: "http://localhost:3002/" },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ModuleFederationPlugin({
      name: "sidebar",
      filename: "remoteEntry.js",
      exposes: { "./SideBar": "./src/components/SideBar" },
      shared: {
        react: {
          eager: true,
        },
        "react-dom": {
          eager: true,
        },
      },
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
};
