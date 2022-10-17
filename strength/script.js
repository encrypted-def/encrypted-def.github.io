$("#slider1").on("input change", function(){
  $(".info1").text("Week " + $("#slider1").val());
});

orders = [
  ["워밍업1","워밍업2","워밍업3","본세트1","본세트2","PR세트","조커1","조커2","조커3"],
  ["워밍업1","워밍업2","워밍업3","본세트1","본세트2","PR세트","조커1","조커2","조커3"],
  ["워밍업1","워밍업2","워밍업3","본세트1","본세트2","PR세트","조커1","조커2","조커3"],
  ["워밍업1","워밍업2","워밍업3","본세트1","본세트2","PR세트","조커1","조커2","조커3"],
  ["워밍업1","워밍업2","워밍업3","본세트1","본세트2","PR세트","조커1","조커2","조커3"],
  ["워밍업1","워밍업2","워밍업3","본세트1","본세트2","PR세트","조커1","조커2","조커3"],
  ["디로딩1","디로딩2","디로딩3","-","-","-","-","-","-"]  
];

reps = [
  ["5","5","3","5","5","5+","1","1","1"],
  ["5","5","3","3","3","3+","1","1","1"],
  ["5","5","3","5","3","1+","1","1","1"],
  ["5","5","3","5","5","5+","1","1","1"],
  ["5","5","3","3","3","3+","1","1","1"],
  ["5","5","3","5","3","1+","1","1","1"],
  ["5","5","5","-","-","-","-","-","-"]  
];

weights = [  
  [36,45,54,59,68,77,83,90,95],
  [36,45,54,63,72,81,88,95,101],
  [36,45,54,68,77,86,92,99,106],
  [36,45,54,59,68,77,83,90,95],
  [36,45,54,63,72,81,88,95,101],
  [36,45,54,68,77,86,92,99,106],
  [36,45,54,0,0,0,0,0,0]
];

week = 1;

var alert_select_value = function (select_obj){
  week = select_obj.selectedIndex + 1;
};


$('#start').click(function(){
  onerm = Number($("#onerm").val());
  $(".order1").text(orders[week-1][0]);
  $(".order2").text(orders[week-1][1]);
  $(".order3").text(orders[week-1][2]);
  $(".order4").text(orders[week-1][3]);
  $(".order5").text(orders[week-1][4]);
  $(".order6").text(orders[week-1][5]);
  $(".order7").text(orders[week-1][6]);
  $(".order8").text(orders[week-1][7]);
  $(".order9").text(orders[week-1][8]);
  
  $(".rep1").text(reps[week-1][0]);
  $(".rep2").text(reps[week-1][1]);
  $(".rep3").text(reps[week-1][2]);
  $(".rep4").text(reps[week-1][3]);
  $(".rep5").text(reps[week-1][4]);
  $(".rep6").text(reps[week-1][5]);
  $(".rep7").text(reps[week-1][6]);
  $(".rep8").text(reps[week-1][7]);
  $(".rep9").text(reps[week-1][8]);

  $(".weight1").text(Math.round(onerm * weights[week-1][0] / 100) + "(" + weights[week-1][0] + "%)");
  $(".weight2").text(Math.round(onerm * weights[week-1][1] / 100) + "(" + weights[week-1][1] + "%)");
  $(".weight3").text(Math.round(onerm * weights[week-1][2] / 100) + "(" + weights[week-1][2] + "%)");

  if(week <= 6){
    $(".weight4").text(Math.round(onerm * weights[week-1][3] / 100) + "(" + weights[week-1][3] + "%)");
    $(".weight5").text(Math.round(onerm * weights[week-1][4] / 100) + "(" + weights[week-1][4] + "%)");
    $(".weight6").text(Math.round(onerm * weights[week-1][5] / 100) + "(" + weights[week-1][5] + "%)");
    $(".weight7").text(Math.round(onerm * weights[week-1][6] / 100) + "(" + weights[week-1][6] + "%)");
    $(".weight8").text(Math.round(onerm * weights[week-1][7] / 100) + "(" + weights[week-1][7] + "%)");
    $(".weight9").text(Math.round(onerm * weights[week-1][8] / 100) + "(" + weights[week-1][8] + "%)");
  }
  else{
    $(".weight4").text("-");
    $(".weight5").text("-");
    $(".weight6").text("-");
    $(".weight7").text("-");
    $(".weight8").text("-");
    $(".weight9").text("-");    
  }
});
