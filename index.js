// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  verifyUserEmails: true,
  appName: 'Venus Dating App',
  publicServerURL: 'http://s.datesonvenus.com/api',
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  emailAdapter: {
    module: 'parse-server-mailgun-adapter-template',
    options: {
      fromAddress: 'Do Not Reply <donotreply@datesonvenus.com>',
      domain: 'mg.datesonvenus.com',
      apiKey: 'key-070a23689abf8a03bbacfecad67d8712',
      verificationSubject: 'Confirm your email for Venus',
      verificationBody: 'Hi,\n\nPlease confirm your email for Venus by clicking the following link:\n\n%link%\n\nBest of luck!\n\nThe Venus Team',
      verificationBodyHTML: '<html><head></head><body><table><tr><td><table align="center" bgcolor="#f8f1b7" style="padding-bottom:20px" width="100%"><tr><td align="center" style="Font-family: Arial, Helvetica, sans-serif"><img style="padding-top:20px; padding-bottom:20px" src="http://datesonvenus.com/logo.png" width="30%"><table align="center" bgcolor="#ffffff" width="80%" style="padding-left:10px; padding-right:10px; padding-top:10px; padding-bottom:10px"><tr><td align="left"> <font color="#646466">Hi,<br><br>Please confirm your email for Venus by clicking the following link:<br><br>%link%<br><br>Best of luck!<br><br>The Venus Team<br></font></td></tr></table></td></tr></table></td></tr></table></body></html>',
    }
  },
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
