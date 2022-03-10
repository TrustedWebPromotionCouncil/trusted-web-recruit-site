var path = require("path");
const {
  override,
  overrideDevServer,
  disableChunk,
  addBabelPlugins,
  addWebpackAlias,
  addWebpackModuleRule,
  addWebpackPlugin,
} = require("customize-cra");
const CopyPlugin = require("copy-webpack-plugin");

const devServerConfig = () => (config) => {
  return {
    ...config,
    // webpackDevService doesn't write the files to desk
    // so we need to tell it to do so so we can load the
    // extension with chrome
    writeToDisk: true,
  };
};

const copyPlugin = new CopyPlugin({
  patterns: [
    // copy assets
    {
      from: "public",
      globOptions: {
        ignore: ["**/*.html"],
      },
    },
  ],
});

const babelPlugins = () => {
  let plugins = [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ];
  return plugins;
};

module.exports = {
  webpack: override(
    ...addBabelPlugins(...babelPlugins()),
    addWebpackPlugin(copyPlugin),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
    addWebpackModuleRule({
      test: /\.js$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-nullish-coalescing-operator",
            ],
          },
        },
      ],
      exclude: {
        include: /node_modules/,
        exclude: /node_modules\/(@decentralized-identity|did-jwt)\//,
      },
    }),
  ),
  devServer: overrideDevServer(devServerConfig()),
};