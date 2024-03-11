const path = require('path') ;
const BundleAnalyserPlugin = require ('webpack-bundle-analyser').BundleAnalyserPlugin ;

    module.exports = {

        target: 'node',
        mode: 'development',
        entry: './src/index.js',

        output: {
            filename:   'awesome.js' ,
            path:       path.resolve(__dirname, 'dist') ,
        }   ,

        externals: [
            nodeExternals({ modulesDir: path.join(__dirname, '../../node_modules') })
        ]   ,

        module: {
    rules: [
      {
        test: /\.scss$/,
        use : [ 'style-loader',
                'css-loader',
                'sass-loader']
      } ,
      { test: /\.ts$/,
        use : [ 'ts-loader'  ]
      } ,
    ]
        }   ,

        plugins: [
    new BundleAnalyserPlugin()
        ]   ,
    };