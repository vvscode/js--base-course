
export const getUrlParams = () => {
  var urlParams;

  var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query  = window.location.search.substring(1);
      urlParams = {};
      while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);

     return urlParams;
}

//
// export const getUrlHashParams = () => {
//   var hash = window.location.hash.substr(1);
//
//   console.log(hash.split('?')[1].split('&'));
//
//   var result;
//   debugger;
//
//   if (hash.split('?')[1].split('&')) {
//     result = hash.split('?')[1].split('&').reduce(function (result, item) {
//
//
//         var parts = item.split('=');
//         result[parts[0]] = parts[1];
//         return result;
//     }, {});
//
//   }
//
//   result = hash.split('?').reduce(function (result, item) {
//
//
//       var parts = item.split('=');
//       result[parts[0]] = parts[1];
//       return result;
//   }, {});
// }
