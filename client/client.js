var testData = [{
  value: 70,
  color: "#FF0000"
}, {
  value: 30,
  color: "#FFFFFF"
}]

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

var getRandomTestData = function(){
  var r = [];
  _(10).times(function(){
    var p1 = {
      value: Math.round(Math.random() * 100),
      color: "#000"
    }
    var p2 = {
      value: 100 - p1.value,
      color: "#EEE"
    }
    r.push([p1,p2])
  })
  return r
}

Meteor.subscribe('timers')
Meteor.subscribe('userData')


Template.home.helpers({
  pies: function() {
    return getRandomTestData();
  }
})

Template.pie.onRendered(function() {
  var ctx = this.find(".pie-canvas").getContext("2d")
  var myPieChart = new Chart(ctx).Pie(this.data.pieData, pieOptions)
})