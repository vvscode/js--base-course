class DB {
  saveInDb(arr,dbName) {
    if(arr){
      Promise.resolve(localStorage.setItem(`${dbName}`, JSON.stringify(arr)) );
    }
  }
  loadInDb(dbName) {
    return Promise.resolve(JSON.parse(localStorage.getItem(`${dbName}`)) || []);
  }
  methodRequestLoad(){
      Promise.resolve(JSON.parse(localStorage.getItem('request')) || 'fetch');
  }
  methodRequestSave(method){
      localStorage.setItem('request', JSON.stringify(method));
  }
}
export default DB;
