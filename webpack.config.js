module.exports = {
  entry: './src/electron.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: './src/App.js'
  }
}