module.exports = {
    entry: './block.js',
    output: {
        path: __dirname,
        filename: 'block.build.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
        ],
    },
};
