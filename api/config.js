module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/open_peru',
    SECRET_TOKEN: 'miclavedetokens'
  }