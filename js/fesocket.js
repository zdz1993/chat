 var connection
 window.addEventListener("load", function() {
     var nickname = prompt("Choose a nickname");
     var oText = document.getElementsByClassName("text")[0];
     var oMsg = document.getElementById("msg");
     var oForm = document.getElementById("form");
     var oWhoEnter = document.getElementsByClassName("who-enter")[0];
     var oWhoTitle = document.getElementsByClassName("who-title")[0];
     $('#form').css("background-image", "url('../img/hyt1.jpeg')")
     if (nickname) {

         //更改北京图片
         var imgArrayNum = 0;
         setInterval(function() {
             if (imgArrayNum > 15) {
                 imgArrayNum = 0;
             } else {
                 imgArrayNum = imgArrayNum + 1;
                 $('#form').css("background-image", "url('../img/hyt" + imgArrayNum + ".jpeg')");
             }

         }, 10000);
         //添加表情
         $('.expression').on('click', '.express-extent', function(e) {

             var target = e.target;
             var src = target.src;
             var html = '<img width="30px" height="30px" style="vertical-align: middle" src=' + src + '>'
             $('#msg').append(html);

         })

         oWhoTitle.innerHTML = nickname;
         connection = new WebSocket("ws://120.76.129.15:8080")
         connection.onopen = function() {
             connection.send(nickname)
             oForm.onsubmit = function(event) {
                 if (oMsg.innerHTML)
                     connection.send(oMsg.innerHTML)
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
         connection.onclose = function(nick) {
             var oDom = document.getElementsByClassName("enter-title-h");
             for (var i = 0; i < oDom.length; i++) {
                 if (oDom[i].textContent == nick) {
                     oWhoEnter.removeChild(oDom[i])
                 }
             }

         }
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
                 for (var i = 0; i < oDom.length; i++) {
                     oChild.removeChild(oDom[i])
                 }

                 data.str.map(function(item, index) {
                     var odiv = document.createElement("div");
                     odiv.className = 'enter-title-h';
                     odiv.textContent = item + '在线';
                     oWhoEnter.appendChild(odiv);
                 })

             }

         }
     }
 })
