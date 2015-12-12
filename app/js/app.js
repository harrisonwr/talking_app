(function() {
  'use strict';

  var app = angular.module('TalkingApp', []);

  app.controller("SpeechCtrl", [ '$scope', '$http', function($scope, $http) {
    var ref = new Firebase("https://talkingapptest.firebaseio.com");

    var speech = this;
    speech.root = [];
    speech.collection = [];

    $scope.showBack = false;

    $http.get('app/speech.json').success(function(data){
      speech.root = data;
      speech.collection = data;
      console.log(speech.collection);
    });

    $http.get('app/nav.json').success(function(data){
      speech.nav = data;
      console.log(speech.nav);
    });

    $scope.pronounce = function(data, back) {
      console.log(data.text);
      if (back === true){
        var level = data[0].level;
        var label = data[0].label;

        if (level === 1){
          speech.collection = speech.root;

        } else if (level > 1) {
          speech.collection = speech.root;

          // set temperary variable for searching purpose
          var temp = speech.root[label - 1];
          var tempLevel = temp.level;

          // search through speech data and find out where previous page with the same label and level - 1
          while (tempLevel !== level - 1){
            tempLevel = temp.contents[0].level;
            temp = temp.contents;
            speech.collection = temp;
          }
        }

        if (level === 2) {
          $scope.showBack = false;
        } else {
          $scope.showBack = true;
        }
        responsiveVoice.speak("上一頁", "Chinese Female");

      } else {
        if (data.nextExist == true) {
          speech.collection = data.contents;
        }
        $scope.showBack = true;
        var text = data.text + "";
        responsiveVoice.speak(text, "Chinese Female");
      }

    };

  }]);

})();
