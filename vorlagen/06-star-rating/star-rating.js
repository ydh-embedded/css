
$(document).ready(function(){
  var stars = 0;
  $("#feedback .oc").click(function(){
    if($("#feedback .oc").hasClass("open")){
      $("#feedback").animate({left:'-209px'},1000, function(){
        $("#feedback .oc.open").removeClass("open");
      });
    } else {
      $("#feedback").animate({left:'-1px'},1000, function(){
        $("#feedback .oc").addClass("open");
      });
    }
  });
  $(".star").click(function(){
    stars = $("#feedback .star").index(this)+1;
    $(".star:lt("+stars+")").removeClass("empty");
    $(".star:eq("+stars+")").addClass("empty");
    $(".star:gt("+stars+")").addClass("empty");
  });
  $("#feedback .submit").click(function(){
    alert("Es wurden "+stars+" Sterne vergeben. Positives Feedback: "+$("#feedback .pro").val()+" || Negatives Feedback: "+$("#feedback .contra").val());
  });
});
