Session.setDefault('timer-add',false)


Template.timerAdd.helpers({
  timerAddOpen: function(){
    return Session.get('timer-add')
  }
})
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
      // var dateEnd = moment().add(moment.duration(5, 'minutes'))
    var dateEnd = moment().add(
      moment.duration({
        seconds:  t.find('.timer-range-s') && t.find('.timer-range-s').value || 0,
        minutes:  t.find('.timer-range-m') && t.find('.timer-range-m').value || 0,
        hours:    t.find('.timer-range-h') && t.find('.timer-range-h').value || 0,
        days:     t.find('.timer-range-d') && t.find('.timer-range-d').value || 0,
        weeks:    t.find('.timer-range-w') && t.find('.timer-range-w').value || 0,
        months:   t.find('.timer-range-M') && t.find('.timer-range-M').value || 0,
        years:    t.find('.timer-range-y') && t.find('.timer-range-y').value || 0
      })
    )
    var timer_type = 'normal'

    var timer = {
      title: title,
      offset: 0,
      timer_type: timer_type,
      date_start: dateStart.toDate(),
      date_end: dateEnd.toDate(),
      userId: Meteor.userId(),
      date_created: moment().toDate()
    }

    console.log(timer)

    Timers.insert(timer);
  },
  'click .toggle-timer-add': function(){
    Session.set('timer-add',!Session.get('timer-add'))
  },
  'click .timer-cancel': function(){
    Session.set('timer-add',!Session.get('timer-add'))
  }
})

Template.timersFromUser.helpers({
  timers: function() {
    return Timers.find({
      date_end: {
        $gte: moment().toDate()
      }
    }, {
      sort: {
        date_end: 1
      }
    });
  }
})

Template.recentlyAdded.helpers({
  timers: function() {
    return Timers.find({
    }, {
      sort: {
        date_end: 1
      },
      limit: 50
    });
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