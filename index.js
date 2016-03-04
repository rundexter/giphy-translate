var assert = require('assert');

module.exports = {
  run: function (step, dexter) {
    //access token
    var accessToken = dexter.environment('access_token');
    var giphy = require('giphy-api')(accessToken);

    //inputs
    var s = step.input('s').first();
    var rating = step.input('rating').first();
    var fmt = step.input('fmt').first();

    //validation
    assert(s, 'Term to translate is required.');

    //post options
    var postOptions = {
      s: s,
      rating: rating,
      fmt: fmt
    };

    //execution
    giphy.translate(postOptions, function (err, res) {
      var finalResponse = {
        data: {}
      };

      if (fmt === 'html') {
        finalResponse.data.html = res;
      } else {
        finalResponse = res;
      }

      if (err) return this.fail(err);
      this.complete(finalResponse);
    }.bind(this));
  }
};
