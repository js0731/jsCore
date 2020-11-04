const path = require('path');

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']	// 調用 postcss
            }
        ]
    }
}