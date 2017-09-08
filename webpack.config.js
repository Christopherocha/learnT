module.exports = {
    entry: "./app/js/app.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    }, 
    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    }
}