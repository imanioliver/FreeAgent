module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'pass the baton',
  // Database connection information


  // var dbURI = 'mongodb://locationToMyMongoDB';
  //
  //   if (process.env.NODE_ENV === 'production') {
  //       dbURI = process.env.MONGOLAB_URI;
  //   }
  //
  'database': process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/free-agent',
  // 'database': 'mongodb://localhost:27017/free-agent',
  // Setting port for server
  'port': process.env.PORT || 3001
}
