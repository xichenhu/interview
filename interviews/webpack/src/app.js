console.log(100)

var $ = require('jquery');
console.log($)

var $root = $('#root')
$root.html('<p>这是HTML的内容</p>')

var util = require('./util.js')
console.log(util.print())