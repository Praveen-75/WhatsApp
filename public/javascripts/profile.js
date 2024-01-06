const search = () => {
     let filter = document.getElementById("myInput").value.toUpperCase();
     let product = document.querySelector(".chat");
     let tr = product.querySelectorAll(".mainchat");
     for (var i = 0; i < tr.length; i++) {
          let tag = tr[i].getElementsByTagName("h3")[0];
          if (tag) {
               let textvalue = tag.textContent || tag.innerHTML;
               if (textvalue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
               } else {
                    tr[i].style.display = "none"
               }
          }
     }
}

var socket = io();
var timeout = "";



document.querySelector("#send")
     .addEventListener("click", function () {
          if (document.querySelector("textarea").value.trim().length > 0) {
               socket.emit("msg", document.querySelector("textarea").value)
               document.querySelector("textarea").value = "";
          }

     })

socket.on("msg", function (data) {
     document.querySelector("#msgbox")
          // .innerHTML += `<div class="bg"><h3>${data.username}</h3><h5>${data.data}</h5></div>`
          .innerHTML += `<div class="bg"><h5>${data.data}</h5></div>`
     document.querySelector("textarea").value = ""
     var objDiv = document.querySelector("#msgbox")
     objDiv.scrollTop = objDiv.scrollHeight;
})


document.querySelector("textarea")
     .addEventListener("input", function () {
          socket.emit("typing")
     })
socket.on("typing", function (data) {
     document.querySelector("#msgspace h6").innerHTML = `<i> is typing...</i> `
     clearTimeout(timeout)
     timeout = setTimeout(function () {
          document.querySelector("#msgspace h6").textContent = ""
     }, 1000)
})



document.querySelector(".photos")
     .addEventListener("click", function () {
          document.querySelector(".photo1").style.transform = "translate(.5%)";
     })
document.querySelector(".ri-arrow-left-line")
     .addEventListener("click", function () {
          document.querySelector(".photo1").style.transform = "translate(-105%)";
     })


document.querySelector(".rphoto")
     .addEventListener("click", function () {
          document.querySelector(".rprofile").style.transform = "translate(-100%)";
          document.querySelector(".rchat , .rnav").style.width = "50%";
          document.querySelector(".rbuttom").style.width = "50%";
          document.querySelector("textarea").style.width = "20vw";
     })
document.querySelector("#rarow")
     .addEventListener("click", function () {
          document.querySelector(".rprofile").style.transform = "translate(100%)";
          document.querySelector(".rchat , .rnav").style.width = "100%";
          document.querySelector(".rbuttom").style.width = "100%";
          document.querySelector("textarea").style.width = "50vw";
     })


document.querySelector(".photo")
     .addEventListener("click", function () {
          document.querySelector("#fileinp").click();
     })
document.querySelector("#fileinp")
     .addEventListener("change", function () {
          document.querySelector("#photoform").submit();
     })


document.querySelector("#file")
     .addEventListener("click", function () {
          document.querySelector("#filesend").click();
     })
document.querySelector("#filesend")
     .addEventListener("change", function () {
          document.querySelector("#sendform").submit();
     })



