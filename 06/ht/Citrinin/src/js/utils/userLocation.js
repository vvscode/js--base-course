import request from './request';

var userLocation = request('https://api.userinfo.io/userinfos').then(data => data.position)


export default userLocation;