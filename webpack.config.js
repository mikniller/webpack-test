const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = {
    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello',
        }),
    ],
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
    const config = {
        devServer: {
            historyApiFallback: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: 2500,
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        module: {
            rules: [{
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            }],
        },
    };

    return Object.assign({},
        commonConfig,
        config
    );
};

module.exports = (env) => {
    console.log(env);
    if (env === 'production') {
        return productionConfig();
    }
    return developmentConfig();
};