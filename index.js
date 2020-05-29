var Twit = require('twit')
const messages = require('./messages')

console.log('Liberando al Kraken a las ' + new Date().toString());

var T = new Twit({
  consumer_key: 'muTViYd0MjzBHCPUUGdMYXfwH'
  , consumer_secret: 'EGfSNSPRbBTSBvMCjHr61JdwTNtGNteruoCkXdZs31UTtTywy8'
  , access_token: '120619713-iAeTUfk4yMorpdIzpQXhddIEO8MPHoitFsaUYiiy'
  , access_token_secret: 'C9yvBnvXDiu4i5uHxB4raMH99aHpq3wK4lF6m4cUg8KFN',
  timeout_ms: 60 * 1000
})

let lastTick = new Date()

var i = 0;

setInterval(function () {

  console.log('Tirando el mensaje ' + i);

  i = (i + 1) % 3;

  var msg = messages[i];

  T.post('statuses/update', { status: msg }, function (err, data, response) {
    if(!err){

      console.log('alfred_barr: ' + msg)
    }else{
      console.log(err)
    }
  })

}, 60000 * 3)