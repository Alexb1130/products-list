const path = require(`path`);
const publicPath = path.join(__dirname, `public`);

module.exports = {
    mode: `development`,
    entry: `./src/index.js`,
    output: {
        filename: `bundle.js`,
        path: publicPath
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: publicPath
    }
};