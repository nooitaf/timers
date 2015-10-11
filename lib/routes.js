Router.map(function(){
  this.route('home',{
    path:'/',
    template: 'home',
    layoutTemplate: 'mainLayout',
    onBeforeAction: function(pause){
			this.subscribe('userData').wait();      
      this.subscribe('timers').wait();
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    },
    yieldTemplates: {
      'top' 		: {to: 'top'},
      'bottom'  : {to: 'bottom'}
    }
  });

  this.route('profile', {
    path: '/profile',
    template: 'profile',
    layoutTemplate: 'mainLayout',
    onBeforeAction: function(pause){
      this.subscribe('userData').wait();
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    },
    yieldTemplates: {
      'top' 		: {to: 'top'},
      'bottom'  : {to: 'bottom'}
    }
  });

  this.route('logout', {
    path: '/logout',
    template: 'logout',
    layoutTemplate: 'mainLayout',
    onBeforeAction: function(){
      this.subscribe('userData').wait();
      if (this.ready()) {
        Meteor.logout();
        this.redirect('home');
      } else {
        this.render('loading');
      }
    },
    yieldTemplates: {
      'top' 		: {to: 'top'},
      'bottom'  : {to: 'footer'}
    }
  });
});