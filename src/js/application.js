$(document).ready(function(){
  $("#draw").click(function(e){
    e.preventDefault(); // prevent page reload
    
    var first = $("#first").val();
    var second = $("#second").val();

    var canvas = $("#canvas")[0];
    console.log(canvas);
    var context = canvas.getContext("2d");
    context.font = "30px Arial";
    context.fillText(first, 10, 50);
    context.fillText(second, 10, 150);
  });
});
