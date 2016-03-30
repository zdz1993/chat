 var connection
 window.addEventListener("load", function() {
     var nickname = prompt("Choose a nickname");
     var oText = document.getElementsByClassName("text")[0];
     var oMsg = document.getElementById("msg");
     var oForm = document.getElementById("form");
     var oWhoEnter = document.getElementsByClassName("who-enter")[0];
     var oWhoTitle = document.getElementsByClassName("who-title")[0];


     $("#msg").emoji({
         button: "#btn",
         showTab: false,
         animation: 'slide',
         icons: [{
             name: "QQ表情",
             path: "../img/qq/",
             maxNum: 91,
             excludeNums: [41, 45, 54],
             file: ".gif"
         }]
     });


     if (nickname) {
         oWhoTitle.innerHTML = nickname;
         connection = new WebSocket("ws://120.76.129.15:8080")
         connection.onopen = function() {
             connection.send(nickname)
             oForm.onsubmit = function(event) {
                 if (oMsg.innerHTML) {
                     connection.send(oMsg.innerHTML)
                 }

                 oMsg.innerHTML = ""
                 event.preventDefault()
             }
             oMsg.onkeydown = function(event) {

                 if (event.keyCode == 13) {

                     connection.send(oMsg.innerHTML);
                     oMsg.innerHTML = "";
                     event.preventDefault()
                 }
             }

         }
         // connection.onclose = function(nick) {
         //     var oDom = document.getElementsByClassName("enter-title-h");
         //     for (var i = 0; i < oDom.length; i++) {
         //         if (oDom[i].textContent == nick) {
         //             oWhoEnter.removeChild(oDom[i])
         //         }
         //     }

         // }
         connection.onerror = function() {
             console.error("Connection error");
         }
         connection.onmessage = function(event) {
             var div = document.createElement("div");
             var data = JSON.parse(event.data);

             if (data.type == "content") {
                 div.textContent = data.str;
                 div.className = "content-text";
                 div.innerHTML = "<div class='person'>" + data.str.split(']')[0].split('[')[1] + ":</div><div class='personsay'>" + data.str.split(']')[1] + "</div>";
                 oText.appendChild(div);
                 oText.scrollTop = oText.scrollHeight;

             } else {
                 var oDom = document.getElementsByClassName("enter-title-h");
                 var oChild = document.getElementsByClassName("who-enter")[0];
                 // for (var i = 0; i < oDom.length; i++) {
                 //     oChild.removeChild(oDom[i])
                 // }
                 oChild.innerHTML = "<div class='enter-title'>在线详情</div>";
                 console.log(data.str);
                 data.str && data.str.map(function(item, index) {
                     var odiv = document.createElement("div");
                     odiv.className = 'enter-title-h';
                     odiv.textContent = item + '在线';
                     oWhoEnter.appendChild(odiv);
                 })

             }

         }
     }
 })
