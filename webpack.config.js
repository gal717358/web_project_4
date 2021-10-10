const path = require("path"); // connect path to webpack config

module.exports = {
    entry: {
      main: "./src/index.js"
    },
    mode: 'development',
    devServer: {
      contentBase: path.resolve(__dirname, './dist'), // specifies a folder from where to serve the application and its contents
      compress: true, // this will speed up file loading in development mode
      port: 8080, // will open your site at localhost:8080 (you can use another port)
      open: true,
    output: {
      path: "./dist/", 
      filename: "main.js", 
      publicPath: ""
    }
    }
}