const http = require('http');

exports.handler = function(event, context, callback) {
  console.log("starting: " + new Date());

  console.log("event: " + JSON.stringify(event));
  console.log("context: " + JSON.stringify(context));

  var request = http.get('http://time.jsontest.com', function(resp) {
    var state = {
      body: ''
    };

    resp.on('data', function(data) {
      state.body += data;
    });

    resp.on('end', function() {
      state.json = JSON.parse(state.body);
      state.ending = (new Date());

      console.log("result: " + JSON.stringify(state));
      console.log("ending: " + state.ending);
      callback(null, state.json);
    });
  });

  request.on('error', function(e) {
    console.log("error: " + new Date());
    callback(e);
  });

  request.on('timeout', function(t) {
    console.log("timeout: " + new Date());
    request.abort();
    callback(t);
  });

  request.end();
};
