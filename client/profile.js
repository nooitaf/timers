Template.profile.events({
  'click .submit': function(e,t){
    e.preventDefault();
    var username = t.find('.username').value;
    var email = t.find('.email').value;
    Meteor.call('updateUser',{
      username:username,
      email:email
    });
  }
})