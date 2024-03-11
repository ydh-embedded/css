const path = require('path') ;

module.exports = {
        entry:  './src/index.js'    ,
    }
    
    
    const path = require('path');
    
    module.exports = {
        target: 'node',
        mode: 'development',
        entry: './src/index.js',
        output: {
            filename:   'awesome.js' ,
            path:       path.resolve(__dirname, 'dist') ,
        }   ,
        externals: [
            nodeExternals({
      modulesDir: path.join(__dirname, '../../node_modules')
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};