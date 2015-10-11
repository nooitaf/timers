var testData = [{
  value: 70,
  color: "#FF0000"
}, {
  value: 30,
  color: "#FFFFFF"
}]


Template.page.helpers({
  pieData: function() {
    return testData
  }
})

Template.pie.onRendered(function() {
  var ctx = this.find(".pie-canvas").getContext("2d")
  var myPieChart = new Chart(ctx).Pie(this.data.pieData)
})