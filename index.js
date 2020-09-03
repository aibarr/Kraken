var Twit = require('twit')
const messages = require('./messages')
const formatISO = require('date-fns/formatISO')
const addHours = require('date-fns/addHours')

console.log('Liberando al Kraken a las ' + new Date().toString());

var T = new Twit({
  consumer_key: 'muTViYd0MjzBHCPUUGdMYXfwH'
  , consumer_secret: 'EGfSNSPRbBTSBvMCjHr61JdwTNtGNteruoCkXdZs31UTtTywy8'
  , access_token: '120619713-iAeTUfk4yMorpdIzpQXhddIEO8MPHoitFsaUYiiy'
  , access_token_secret: 'C9yvBnvXDiu4i5uHxB4raMH99aHpq3wK4lF6m4cUg8KFN',
  timeout_ms: 60 * 1000
})

let lastTick = new Date()

const users = []
const retwitted = []

var i = 0;

const theInteval = setInterval(function () {

  console.log('Tirando el mensaje ' + i);

  i = (i + 1) % messages.length;

  var msg = messages[i];

  T.post('statuses/update', { status: msg }, function (err, data, response) {
    if (!err) {
      console.log('alfred_barr: ' + msg)
    } else {
      console.log(err)
    }
  })
}, 60000 * 5)

const rtInterval = setInterval(function () {
  T.get('search/tweets', { q: '@FalabellaAyuda', since: formatISO(lastTick).toString(), count: 10 }, function (err, data, response) {
    if (!err) {
      console.log("Retwiteando")
      const statuses = data.statuses

      Array.isArray(statuses) && statuses.forEach(tw => {
        const theUser = tw.user.screen_name
        if (!users.includes(theUser) && !retwitted.includes(tw.id_str) && theUser !== 'FalabellaAyuda' && theUser !== 'alfred_barr' && theUser !== 'FalabellaAyuda') {
          console.log("Retwiteando A " + theUser)
          console.log(tw.id_str)
          retwitted.push(tw.id_str)
          T.post('statuses/update', { in_reply_to_status_id: tw.id_str, status: 'Hola @' + theUser + ' \nSi también tienes problemas con @FalabellaAyuda @Falabella_Chile ayudémonos con un RT y los hash  #FalabellaNoResponde #CeroEstrellas' }, function (err, data, response) {
            if (!err) {
              T.post('statuses/retweet/' + tw.id_str, {})
              console.log("Ayuda pedida a " + theUser)
              let tweetId = data.id_str;
              console.log("tweet nuevo " + tweetId)
              users.push(theUser)
            } else {
              console.error(err)
            }
          })
        }
      })
    } else {
      console.error(err)
    }
  })

  lastTick = new Date()

}, 60000 * 2)

