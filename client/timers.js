Timers = new Meteor.Collection('timers')

Template.timerAdd.events({
  'click .timer-submit': function(e, t) {
    // .... range future
    // moment().add(moment.duration(2,'hours'))
    // .... range back
    // moment().subtract(moment.duration(2,'hours'))
    // ... fromnow
    // moment().fromNow()
    var title = t.find('.timer-title').value || ""
    var dateStart = moment()
    var dateEnd = moment().add(moment.duration(5, 'minutes'))
    var timer_type = 'normal'

    var timer = {
      title: title,
      offset: 0,
      timer_type: timer_type,
      date_start: dateStart.toDate(),
      date_end: dateEnd.toDate(),
      userId: Meteor.userId()
    }

    console.log(timer)

    Timers.insert(timer);
  }
})

Template.timersFromUser.helpers({
  timers: function() {
    return Timers.find()
  }
})

/*

moment.duration(100); // 100 milliseconds
moment.duration(2, 'seconds');
moment.duration(2, 'minutes');
moment.duration(2, 'hours');
moment.duration(2, 'days');
moment.duration(2, 'weeks');
moment.duration(2, 'months');
moment.duration(2, 'years');
moment.duration({
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
});

*/