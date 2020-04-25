const path = require('path');
console.log("PATH: ", path.join(__dirname, 'src', 'helpers'))

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [

                    {
                        loader: 'css-loader', options: {
                            modules: false,
                        }
                    }
                ],
            },
            {
                test: /\.hbs$/, loader: "handlebars-loader", options: {
                    helperDirs: path.join(__dirname, 'src', 'helpers'),
                    precompileOptions: {
                        knownHelpersOnly: false,
                    },
                },
            }
        ],
    },
};