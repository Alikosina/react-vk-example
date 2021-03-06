const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};
