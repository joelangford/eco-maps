const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  performance: {
    hints: false
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/static", to: "." },
      ],
    }),
  ],
};