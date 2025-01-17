//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: './src/index.tsx',
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      port: 8080,
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
            options: {
              // Disables attributes processing
              sources: false,
            },
          },
         // {
         //    test: /\.(jpg|png|gif|woff|eot|ttf|svg)/,
         //    use: {
         //       loader: 'url-loader', // this need file-loader
         //       options: {
         //          limit: 50000
         //       }
         //    }
         // },
      ]
   },
   resolve:
   {
      extensions: ['.tsx', '.ts', '.js'],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.join(__dirname, '/src/index.html')
      })
   ]
}
