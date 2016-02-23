var canvas = {
  backgroundColor: '#000000',
  text: "Hello",
  draw: function(e){
    if(e){
      e.preventDefault(); // prevent page reload
    }

    var first = $("#first").val();
    var second = $("#second").val();

    var canvas = $("#canvas")[0];
    var context = canvas.getContext("2d", {alpha: false});

    context.fillStyle = this.backgroundColor;
    context.fillRect(0,0,96,64);

    context.fillStyle = "#FFFFFF";
    context.font = "12px Arial";
    context.fillText(this.text, 20, 20);
  },
  setBackgroundColor: function(backgroundColor){
    this.backgroundColor = backgroundColor;
    this.draw();
  },
  setText: function(text){
    this.text = text;
    this.draw();
  }
};




$(document).ready(function(){
  $("#draw").click(function(e){sendCanvas(e);});
  $("#canvasText").keyup(function(e){canvas.setText($("#canvasText").val());});
  canvas.draw();
});

var sendCanvas = function(e){
  e.preventDefault(); // prevent page reload
  var canvas = $("#canvas")[0];
  var img    = canvas.toDataURL("image/png");
  console.log(img);

  $.ajax({
    type: "POST",
    url: "/api/image",
    data: {image: img, title: "hello world"},
    //processData: false,
    //contentType: 'application/x-www-form-urlencoded'
  });
};
