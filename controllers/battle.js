/**
 * GET /
 * Battle page.
 */
exports.get_battle = function(req, res) {
  res.render('battle', {
    title: 'Battle!'
  });
};


exports.post_battle = function(req, res) {

	// Save Battle Data




	// Redirect to next battle if user hasn't completed all battles
  res.render('battle', {
    title: 'Battle!'
  });


  // Redirect home if user is done with battles

    res.render('tournament', {
    title: 'Tournament'
  });
};