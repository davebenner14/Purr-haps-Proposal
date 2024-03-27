$(document).ready(function () {
  $("#enterButton").click(function () {
    $("body").fadeOut(5000, function () {
      window.location.href = "page2.html";
    });
  });
});
$(document).ready(function () {
  $(".welcome-message").fadeIn(5000, function () {
    setTimeout(() => {
      $(this).fadeOut(5000);
    }, 2000);
  });
});
