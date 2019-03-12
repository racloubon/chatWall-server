const mocks = require('./mocks')

module.exports.channels = {
  create: function (channel) {
    return {
      id: 10,
      name: channel.name,
      creator: channel.creator,
      expireTime: (Date.now() + (1000 * 60 * 60 * 24 * 7)),
      updatedAt: "2019-03-09T09:07:27.635Z",
      createdAt: "2019-03-09T09:07:27.635Z",
      pin: 999
    }
  },
  delete: function (channel) {
    return true //Egill checking this
  }
}

module.exports.messages = {
  create: function (message) {
    if (message) {
      return {
        score: 0,
        expireTime: 'Sat Mar 09 2019 14:33:09 GMT+0100 (Central European Standard Time)',
        message: message.message,
        channel: message.channel,
        creator: message.creator,
        updatedAt: "2019-03-09T09:07:27.635Z",
        createdAt: "2019-03-09T09:07:27.635Z"
      }
    }
  },
  update: function (message) {
    return true
  },
  findAll: function (search) {
    return mocks.messages.filter(data => data.pin === search.where.pin)
  }
}

module.exports.users = {
  create: function (user) {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
      updatedAt: "2019-03-09T09:07:27.635Z",
      createdAt: "2019-03-09T09:07:27.635Z"
    }
  }
}
