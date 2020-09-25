const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src") + "/index.ts",
  output: {
    //path: __dirname + "/dist",
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/index.html",
      filename: "./index.html",
      inject: false,
    }),
  ],
};
