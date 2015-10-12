Template.pie.helpers({
  isOwner: function(){
    return this.userId === Meteor.userId()
  }
})

Template.pie.events({
  'click .timer-remove': function(e,t){
    Meteor.clearInterval(t.pieInterval)
    Timers.remove(this._id)
  }
})

Template.pie.onRendered(function() {
  var self = this
  var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,
    //String - The colour of each segment stroke
    segmentStrokeColor: "#888",
    //Number - The width of each segment stroke
    segmentStrokeWidth: 0.3,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 0, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps: 100,
    //String - Animation easing effect
    animationEasing: "easeInOutQuart",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: false,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: false,
  }
  var pData = getPieDataWithData(this.data)
  var ctx = this.find(".pie-canvas").getContext("2d")
  var pie = new Chart(ctx).Pie(pData, pieOptions)
  var p_data = self.data;
  self.$('.from-now').html(moment(p_data.date_end).fromNow())
  this.pieInterval = Meteor.setInterval(function(){
    var data = getPieDataWithData(p_data)
    pie.segments[0].value = data[0].value;
    pie.segments[1].value = data[1].value;
    pie.update()
    self.$('.from-now').html(moment(p_data.date_end).fromNow())
    if (!self.$('.from-now'))
      Meteor.clearInterval(self.pieInterval)
  },1000)

})