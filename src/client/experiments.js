const R = require('ramda')

let sample = { has_more: true,
  next_offset: 10,
  results: 
   [ { deviationid: 'DABD455F-E58F-164B-7306-D640C44CEFEC',
       printid: null,
       url: 'http://hapuriainen.deviantart.com/art/Disney-Girls-dress-up-354859996',
       title: 'Disney Girls dress up',
       category: 'Interactive',
       category_path: 'flash/interactive',
       is_favourited: false,
       is_deleted: false,
       author: [Object],
       stats: [Object],
       published_time: 1361128962,
       allows_comments: true,
       content: [Object],
       thumbs: [Object],
       flash: [Object],
       is_mature: false,
       is_downloadable: true,
       download_filesize: 1210465 },
     { deviationid: '65C9D1C7-EEA4-129E-3A06-66B5E761BAC9',
       printid: null,
       url: 'http://chippyfish.deviantart.com/art/Tuna-And-Yo-Pixels-354154704',
       title: 'Tuna And Yo Pixels',
       category: 'Non-Isometric',
       category_path: 'digitalart/pixelart/characters/noniso',
       is_favourited: false,
       is_deleted: false,
       author: [Object],
       stats: [Object],
       published_time: 1360807728,
       allows_comments: true,
       content: [Object],
       thumbs: [Object],
       is_mature: false,
       is_downloadable: true,
       download_filesize: 126561 }]
}

var summateResult = x => {
  return {
    'id': x.deviationid,
    'url': x.url
  }
}

const summerisedResults = R.map(summateResult, sample.results)
console.log(JSON.stringify(summerisedResults))

