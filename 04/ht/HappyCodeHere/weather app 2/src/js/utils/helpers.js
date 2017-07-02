
export const getUrlHashParams = () => {
  let url = window.location.hash;

  let queryParams = {};

  let param = url.split('?')[1].split('&');

  param.map(item => {
    let items = item.split('=');
    queryParams[items[0]] = items[1];
  })

  return queryParams;
}
