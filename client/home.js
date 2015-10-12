
Template.home.helpers({
  pies: function() {
    return Timers.find();
  }
})

Template.pie.helpers({
  humanizeRange: function(d1,d2){
    return moment(d2).fromNow()
  },
  isOwner: function(){
    return this.userId === Meteor.userId()
  }
})
Template.pie.onRendered(function() {
  var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,
    //String - The colour of each segment stroke
    segmentStrokeColor: "#000",
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
  var pData = getPieDataWithData(this.data.pieData)
  var ctx = this.find(".pie-canvas").getContext("2d")
  var pie = new Chart(ctx).Pie(pData, pieOptions)
  var self = this
  this.pieInterval = Meteor.setInterval(function(){
    var data = getPieDataWithData(self.data.pieData)
    pie.segments[0].value = data[0].value;
    pie.segments[1].value = data[1].value;
    pie.update()
    // console.log(data, pie)
  },1000)

})