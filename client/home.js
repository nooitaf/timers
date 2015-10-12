
Template.home.helpers({
  pies: function() {
    return Timers.find({ date_end: { $gte : moment() } },{ sort : { date_end: 1 }});
  },
  timers_old: function(){
    return Timers.find({ date_end: { $lte : moment() } },{ sort : { date_end: 1 }});
  }

})

