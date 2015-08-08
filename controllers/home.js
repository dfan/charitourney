/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.tournament = function(req, res) {
  res.render('tournament', {
    title: 'Tournament'
  });
};
