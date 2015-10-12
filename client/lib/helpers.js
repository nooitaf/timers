getPieDataWithData = function(data) {
  if (  data 
    &&  data.timer_type 
    &&  data.timer_type === 'normal') {
    // if its before now
    var a = moment(data.date_start)
    var b = moment(data.date_end)
    var seconds = a.diff(b,'seconds')
    
    var now = moment()
    var nowDiffSeconds = a.diff(now,'seconds')

    if (a.isBefore(b)){
      if (now.isAfter(a) && now.isBefore(b)){
        var v1 = nowDiffSeconds
        var v2 = seconds - nowDiffSeconds
        return [{value:v1,color:"#000"},{value:v2,color:"#FFF"}]
      } else if (now.isAfter(a) && now.isAfter(b)) {
        return [{value:100,color:"#000"},{value:0,color:"#FFF"}]
      }
    } 
  }
  return [{value:100,color:"#000"},{value:0,color:"#FFF"}];
}

UI.registerHelper('usernameWithId',function(userId){
  Meteor.call('usernameWithId',userId, function(e,r){
    if (!e) return r;
  })
})