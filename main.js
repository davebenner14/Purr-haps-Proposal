$(document).ready(function () {
  $("#enterButton").click(function () {
    $("body").fadeOut(5000, function () {
      window.location.href = "page2.html";
    });
  });
});
