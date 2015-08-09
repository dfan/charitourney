$(document).ready(function() {
  $(".choice_img").click(function(){
    var charityid = $(this).attr("charityid");
    $("#charity_id").attr('value', charityid);
    $("#form").submit();
  });
});
