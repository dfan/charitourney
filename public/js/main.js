$(document).ready(function() {
  $(".choice_img").click(function(){
    var charityid = $(this).attr("charityid");
    $("#charity_id").val(charityid);
    $("#form").submit();
  });
});
