const webpack = require("webpack");
const { resolve, join } = require("path");
const dev = process.env.NODE_ENV == "dev";
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let config = {
  mode: "development",
  watch: dev,
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    main: "./src/index.jsx",
  },
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: [join(__dirname)],
    index: "index.html",
    compress: true,
    hot: true,
    port: 5500,
    open: true,
    writeToDisk: true,
  },
};

if (!dev) {
  (config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  }),
    (config.mode = "production"),
    (config.output = {
      path: resolve(__dirname, "./dist"),
      filename: "[name].js",
    }),
    (config.loader = {
      rules: [
        {
          test: /\.m?jsx?$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    });
}

module.exports = config;
