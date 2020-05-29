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

var i = 0;

setInterval(function () {

  console.log('Tirando el mensaje ' + i);

  i = (i + 1) % 3;

  var msg = messages[i];

  T.post('statuses/update', { status: msg }, function (err, data, response) {
    if (!err) {
      console.log('alfred_barr: ' + msg)
    } else {
      console.log(err)
    }
  })

  T.get('search/tweets', { q: '@AyudaMovistarCL', since: formatISO(addHours(lastTick, -4)).toString(), count: 10 }, function (err, data, response) {
    if (!err) {
      const statuses = data.statuses

      Array.isArray(statuses) && statuses.forEach(tw => {
        const theUser = tw.user.screen_name
        if (!users.includes(theUser)) {
          T.post('statuses/retweet/:id', { id: tw.id, status: 'Hola @' + theUser + ' \nSi también tienes problemas con @MovistarChile ayudémonos con un RT y los hash  #PesimoServicio #CeroEstrellas #QuantaxNoAyuda' }, function (err, data, response) {
            if (!err) {
              console.log("Ayuda pedida a " + theUser)
            }
          })
        }
      })
    }
  })



}, 60000 * 5)

