$(function(){
  var iosocket = io.connect();
  iosocket.on('connect', function () {
    $('#entradaChat').append($('<li>Conectado com sucesso</li>'));
    $('#saidaChat').attr('placeholder','Digite sua mensagem...');
    $('#saidaChat').removeAttr('readonly');
    $('#saidaChat').focus();
    iosocket.on('message', function(message) {
      WriteMessage(message);
      window.focus();
      PlaySound();
    });
    iosocket.on('disconnect', function() {
      $('#entradaChat').append('<li>Desconectado</li>');
    });
  });

  $('#saidaChat').keyup(function(event) {
    var max = 250;
    var l = $('#saidaChat').val().length;
    $('.cont').text(250 - l);
    if(event.which == 13) {
      event.preventDefault();
      var message = $('#saidaChat').val();
      if(message.length > 0){
        iosocket.send(message);
        WriteMessage(message);
        $('#saidaChat').val('');
        $('.cont').text(250);
      }
    }
  });
});

var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

var WriteMessage = function (message){
  if(message.indexOf('.jpg') > -1 || message.indexOf('.png') > -1 || message.indexOf('.jpeg') > -1 || message.indexOf('.gif') > -1){
    var srcimg = GetImage(message);
    var img = '<img src="'+GetImage(message)+'"/>';
    if(message.replace(srcimg, '').length > 0){
      $('#entradaChat').append($('<li></li>').text(message.replace(srcimg, '')));  
    }
    $('#entradaChat').append($('<li></li>').html(img));
  } else if(message.indexOf('www.youtube.com/watch?v=') > -1 || message.indexOf('youtu.be/') > -1){
    var srcvideo = GetVideo(message);
    var video = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+srcvideo+'" frameborder="0" allowfullscreen></iframe>';
    $('#entradaChat').append($('<li></li>').text(message));  
    $('#entradaChat').append($('<li></li>').html(video));
  } else {
    $('#entradaChat').append($('<li></li>').text(message));
  }
  if($('#autoscroll').get(0).checked){
    window.scrollTo(0,document.body.scrollHeight);
  }
}

var GetImage = function (message){
  var recurs = function (p, e){
    var img = "";
    var imgNew = "";
    for (var i = p; i >= 0; i--) {
      if(message[i] == ' '){
        i = -1;
      } else {
        img += message[i];
      }
    };
    for (var i = img.length - 1; i >= 0; i--) {
      imgNew += img[i];
    };
    imgNew += e;
    return imgNew;
  }
  if (message.indexOf('.jpg') > -1) {
    return recurs(message.indexOf('.jpg'), 'jpg');
  } else if(message.indexOf('.jpeg') > -1){
    return recurs(message.indexOf('.jpeg', 'jpeg'));
  } else if(message.indexOf('.png') > -1){
    return recurs(message.indexOf('.png'), 'png');
  } else if(message.indexOf('.gif') > -1){
    return recurs(message.indexOf('.gif'), 'gif');
  }
}

var GetVideo = function (message){
  var recurs = function (p, e){
    var video = "";
    var msgNew = message.replace('www.youtube.com/watch?v=', '').replace('youtu.be/', '');
    for (var i = p; i < msgNew.length; i++) {
      if(msgNew[i] == ' '){
        i = msgNew.length;
      } else {
        video += msgNew[i];
      }
    };
    console.log(video)
    return video.trim();
  }
  if (message.indexOf('www.youtube.com/watch?v=') > -1) {
    return recurs(message.indexOf('www.youtube.com/watch?v='));
  } else if(message.indexOf('youtu.be/') > -1){
    return recurs(message.indexOf('youtu.be/'));
  }
}

var PlaySound = function() {
  $('#embed').remove();
    var embed = document.getElementById("embed");
    if (!embed) {
        var embed = document.createElement("embed");
            embed.id= "embed";
            embed.setAttribute("src", "/sounds/bip.mp3");
            embed.setAttribute("hidden", "true");
        document.getElementById('body-etalk2me').appendChild(embed);
    } else {
        embed.parentNode.removeChild(embed);
    }
}
