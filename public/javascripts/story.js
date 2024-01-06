document.querySelector(".status,.status1")
     .addEventListener("click", function () {
          document.querySelector("#storyinp").click();
     })
document.querySelector("#storyinp")
     .addEventListener("change", function () {
          document.querySelector("#storyform").submit();
     })

