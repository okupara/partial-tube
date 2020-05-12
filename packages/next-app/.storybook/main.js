const path = require("path")
module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    return config
  },
  stories: ["../stories/**/*.stories.tsx", "../stories/**/*.stories.mdx"],
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
        },
        include: [
          path.resolve(__dirname, "../stories"),
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../__mocks__"),
        ],
      },
    },
    // {
    //   name: "@storybook/addon-docs",
    //   options: { configureJSX: true },
    // },
  ],
}
