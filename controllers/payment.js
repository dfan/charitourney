var braintree = require("braintree");
var secrets = require("../config/secrets");

var braintreeGateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   secrets.braintree.merchantId,
  publicKey:    secrets.braintree.publicKey,
  privateKey:   secrets.braintree.privateKey
});

// GET /payments_test
exports.getPaymentsTest = function(req, res) {
  braintreeGateway.clientToken.generate({}, function(err, btRes) {
    res.render('payments_test', {
      clientToken: btRes.clientToken
    });
  });
};

// GET /client_token
exports.getClientToken = function(req, res) {
  braintreeGateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
};

// POST /payment_methods
exports.postPaymentMethods = function(req, res) {
  var nonce = req.body.payment_method_nonce;

  braintreeGateway.transaction.sale({
    amount: req.body.payment_amount,
    paymentMethodNonce: nonce,
  }, function (err, btRes) {
    res.redirect('/');
    console.dir(btRes);
  });
};