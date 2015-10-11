Meteor.startup(function() {
  var adminEmail = "nooitaf@gmail.com";
  var adminUser = Meteor.users.findOne({
    'emails.0.address': adminEmail
  });
  if (adminUser) {
    if (!adminUser.admin) {
      Meteor.users.update(adminUser._id, {
        $set: {
          admin: true
        }
      });
    }
  } else {
    Accounts.createUser({
      username: "admin",
      email: adminEmail,
      password: "123456"
    })
    var admin = Meteor.users.findOne({
      'emails.0.address': adminEmail
    });
    Meteor.users.update(adminUser._id, {
      $set: {
        admin: true
      }
    });
  }
});


// Accounts

Meteor.methods({
  updateUser: function(options) {
    var self = this;
    console.log(this.userId, options);
    var user = Meteor.users.findOne(this.userId);
    if (options && options.username)
      Accounts.setUsername(this.userId,options.username);
    if (options && options.email)
      if (user.emails[0] && user.emails[0].address) 
        Accounts.removeEmail(this.userId, user.emails[0].address);
      Accounts.addEmail(this.userId, options.email)
  },
  nameOfUserWithId: function(userId) {
    return Meteor.users.findOne({
      _id: userId
    });;
  }
})

Meteor.publish("userData", function() {
  if (Meteor.users.findOne(this.userId) && Meteor.users.findOne(this.userId).admin) {
    return Meteor.users.find({}, {
      fields: {
        username: 1,
        email: 1,
        admin: 1
      }
    });
  } else if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        admin: 1
      }
    });
  } else {
    this.ready();
  }
});


// Timers

Timers = new Meteor.Collection('timers')
Timers.allow({
  insert: function(userId, doc) {
    return doc.userId === userId || Meteor.users.findOne(userId).admin;
  },
  update: function(userId, doc) {
    return doc.userId === userId || Meteor.users.findOne(userId).admin;
  },
  remove: function(userId, doc) {
    return doc.userId === userId || Meteor.users.findOne(userId).admin;
  }
})
Meteor.publish('timers',function(){
  if (Meteor.users.findOne(this.userId) && Meteor.users.findOne(this.userId).admin) {
    return Timers.find({});
  } else {
    if (Meteor.users.findOne(this.userId)) {
      return Timers.find({
        userId: this.userId
      });
    }
    this.ready();
  }
})
Meteor.startup(function() {
  if (!Timers.findOne()) {
  }
});

