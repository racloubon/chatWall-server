const mocks = require('./mocks')

module.exports.channels = {
  create: function (channel) {
    return {
      id: 10,
      name: channel.name,
      creator: channel.creator,
      expireTime: channel.expireTime,
      updatedAt: "2019-03-09T09:07:27.635Z",
      createdAt: "2019-03-09T09:07:27.635Z",
      pin: 999
    }
  },
  delete: function (channel) {
    return true //Egill checking this
  },
  // findOne: function (searchString) {
  //   const res = mocks.channels.find(data => data.name === searchString.where.name)
  //   console.log(res)
  //   if (res) return true
  // }
}

module.exports.messages = {
  create: function (message) {
    return {
      score: 0,
      expireTime: 'Sat Mar 09 2019 14:33:09 GMT+0100 (Central European Standard Time)',
      message: message.message,
      channel: message.channel,
      creator: message.creator,
      updatedAt: "2019-03-09T09:07:27.635Z",
      createdAt: "2019-03-09T09:07:27.635Z"
    }
  },
  update: function (message) {
    return true
  }
  // findAll: function (searchString) {
  //   return [{
  //     channel: "Saturday1",
  //     createdAt: "2019-03-09T13:45:33.541Z",
  //     creator: "rachelbonny",
  //     expireTime: "Sat Mar 09 2019 14:45:20 GMT+0100 (Central European Standard Time)",
  //     id: 3,
  //     message: "another one",
  //     score: 0,
  //     updatedAt: "2019-03-09T13:45:33.541Z"
  //   }]
  // }
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
