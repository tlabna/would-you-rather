import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// HtmlWebpackPlugin takes html file and injects into index_bundle.js
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
})

// Paths to directories
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
}

// This will give us the command launched
// i.e. npm run start -> launched command is 'start'
const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'

// Tell babel the env we're running in (dev or prod)
// if dev then we want HMRE
process.env.BABEL_ENV = LAUNCH_COMMAND

// Base webpack configuration (dev & prod)
const base = {
  // We don't put PATHS.app/index.js because in our package.json
  // we have main: index.js, so webpack will assume we want
  // PATHS.app/index.js as our entry
  entry: [PATHS.src],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
    // With Webpack 4 loaders is now replaced with rules
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        // 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]' let's us use CSS modules
        loader:
          'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  // Allows us to use /src as module to search in
  // Will make imports shorter and not worry where file is located in directory
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
  },
}

const developmentConfig = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  // HMRE allows state in react to not change on page reload
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
}

const productionConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig],
}

// Object.assign() allows merging objects
// we can do this because we changed filename to
// webpack.config.babel.js
export default Object.assign(
  {},
  base,
  isProduction === true ? productionConfig : developmentConfig
)
