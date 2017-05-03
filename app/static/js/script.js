var accessToken = "47bae10e67094366891a6fc22f6fddca";
var subscriptionKey = "ed4211907a764f7d8d2e3051f198a5ab";
var baseUrl = "https://api.api.ai/v1/";

$(document).ready(function() {
  $("#input").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      send();
    }
  });
  $("#rec").click(function(event) {
    switchRecognition();
  });
});
var recognition;
function startRecognition() {
  recognition = new webkitSpeechRecognition();
  recognition.onstart = function(event) {
    updateRec();
  };
  recognition.onresult = function(event) {
    var text = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        text += event.results[i][0].transcript;
      }
      setInput(text);
    stopRecognition();
  };
  recognition.onend = function() {
    stopRecognition();
  };
  recognition.lang = "es-ES";
  recognition.start();
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  updateRec();
}
function switchRecognition() {
  if (recognition) {
    stopRecognition();
  } else {
    startRecognition();
  }
}
function setInput(text) {
  $("#input").val(text);
  send();
}
function updateRec() {
  $("#rec").text(recognition ? "Parar" : "Hablar");
}



function send() {
  var text = JSON.stringify($("#input").val());

//let apiaiRequest = apiAiService.textRequest(txt, {
//    sessionId: sender
//    });

  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },

      //JSON.stringify(text);
    //query: JSON.stringify([ text ]),
      //body: JSON.stringify({ "query": text, "lang": "es", "sessionID": "1234567"}),
    //data: JSON.parse({ "query": text, "lang": "es", "sessionID": "1234567"}),
    body: JSON.parse("{ "query": [" + text + "], "lang": "es", "sessionID": "1234567"}"),


      success: function(data) {
      setResponse(JSON.stringify(data, undefined, 2));
    },
    error: function() {
      setResponse("Lo siento, no pude procesar tu solicitud.");
    }
  });
  setResponse("Cargando respuesta...");
}
//*/

function setResponse(val) {
  $("#response").text(val);
}
