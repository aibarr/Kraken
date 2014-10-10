var Twit = require('twit')

console.log('Liberando al Kraken');

var T = new Twit({
    consumer_key:         '8m3BFf8OwiYhnR5ClOdBWG8RT'
  , consumer_secret:      'qXMdnbrSiZFDDdgYjoDUBpdZjXl7M6u76WTtp9fxPIBsVX7msA'
  , access_token:         ' 120619713-zbZUWEqywZWti0y0jLTkO33lol9WVsKxWSzXFCQk'
  , access_token_secret:  'K67oPwdLq0qx4dXAWYbeSBK8NIuOOKSP4EBKMAMAqcnsz'
})

var speech = [
     'goo.gl/Xgxg05  Así de lejos está mi conexión de la planta Maipú; esa es la calidad de servicio @AyudaMovistarCL ?'
     , '@AyudaMovistarCL , Después de más de 18 años como cliente, cuando me van a cambiar a una planta mas cercana? http://goo.gl/Xgxg05 '
     , 'A mi y a @mariowise nos tienen con una internet del tercer mundo, cuando nos van a ayudar @AyudaMovistarCL ?'
     ];

var i = 0;

setInterval(function () {

		console.log('Tirando el mensaje ' + i);

		i = (i+1)%3;

		var msg = speech[i];
       
        T.post('statuses/update', { status: msg }, function(err, data, response) {
          console.log('alfred_barr: ' + msg)
        })
       
}, 60000 * 5)