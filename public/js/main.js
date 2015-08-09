$(document).ready(function() {
  $(".choice_img").click(function(){
    var charityid = $(this).attr("charityid");
    $("#charity_id").attr('value', charityid);
    $("#form").submit();
  });




  setTimeout(function addTheNumbers(){
  	$('#totalContributions').fadeOut(function() {
	  	var curr_amount = $('#totalContributions').text();
	  	var curr_amount_substringed = curr_amount.substring(1);
	  	console.log(curr_amount_substringed);
	  	var curr_amount_int = parseInt(curr_amount_substringed);
	  	var new_amount = curr_amount_int + Math.floor(Math.random() * 15);
	  	$('#totalContributions').fadeIn(function() {
	  		setTimeout(addTheNumbers, Math.floor(4000));
	  	});
	  	$('#totalContributions').text('$' + new_amount);
	  	
	  	
  	});

  }, 1000);

});