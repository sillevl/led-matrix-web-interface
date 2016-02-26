var canvas = {
  backgroundColor: '#000000',
  text: "Hello",

  context: $("#canvas")[0].getContext("2d", {alpha: false}),

  draw: function(e){
    if(e){
      e.preventDefault(); // prevent page reload
    }

    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0,0,96,64);

    this.context.fillStyle = "#FFFFFF";
    this.context.font = "12px Arial";
    this.context.fillText(this.text, 20, 20);
  },

  setBackgroundColor: function(backgroundColor){
    this.backgroundColor = backgroundColor;
    this.draw();
  },

  setText: function(text){
    this.text = text;
    this.draw();
  },

  setImage: function(image){
    var fr = new FileReader();
    var that = this;
    fr.onload = function(e) {
       var img = new Image();
       img.onload = function() {
         that.context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 96, 64);
       };
       img.src = e.target.result;
    };
    fr.readAsDataURL( image );
  }
};




$(document).ready(function(){
  $("#draw").click(function(e){sendCanvas(e);});
  $("#canvasText").keyup(function(e){canvas.setText($("#canvasText").val());});
  $("#file")[0].addEventListener("change", uploadImage, false);
  canvas.draw();
});

var uploadImage = function(){
  if ( this.files && this.files[0] ) {
        canvas.setImage(this.files[0]);
    }
};

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
