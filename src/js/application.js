$(document).ready(function(){
  $("#draw").click(function(e){sendCanvas(e);});
  $("#first").keyup(function(e){updateCanvas(e);});
  $("#second").keyup(function(e){updateCanvas(e);});
});

var sendCanvas = function(e){
  e.preventDefault(); // prevent page reload
  var canvas = $("#canvas")[0];
  var img    = canvas.toDataURL("image/png");
  console.log(img);

  $.ajax({
    type: "POST",
    url: "/api/image",
    data: img,
    dataType: 'text'
  });
};

var updateCanvas = function(e){
  e.preventDefault(); // prevent page reload

  var first = $("#first").val();
  var second = $("#second").val();

  var canvas = $("#canvas")[0];
  var context = canvas.getContext("2d");

  context.fillStyle = "#000000";
  context.fillRect(0,0,300,200);

  context.fillStyle = "#0000FF";
  context.font = "30px Arial";
  context.fillText(first, 10, 50);
  context.fillText(second, 10, 150);
};
