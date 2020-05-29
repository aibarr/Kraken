var Twit = require('twit')
const fns = require('date-fns')

var T = new Twit({
    consumer_key: 'muTViYd0MjzBHCPUUGdMYXfwH'
    , consumer_secret: 'EGfSNSPRbBTSBvMCjHr61JdwTNtGNteruoCkXdZs31UTtTywy8'
    , access_token: '120619713-iAeTUfk4yMorpdIzpQXhddIEO8MPHoitFsaUYiiy'
    , access_token_secret: 'C9yvBnvXDiu4i5uHxB4raMH99aHpq3wK4lF6m4cUg8KFN',
    timeout_ms: 60 * 1000
})

T.get('search/tweets', { q: '@AyudaMovistarCL', since: fns.formatISO(fns.addHours(new Date(), -4)).toString(), count: 10 }, function (err, data, response) {
    if (!err) {
        const statuses = data.statuses

        Array.isArray(statuses) && statuses.forEach(tw => {
            console.log(tw.user)
        })
    }
})