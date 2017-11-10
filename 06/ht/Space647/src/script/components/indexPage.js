import FeatchLoadData from "../utils/fetchLoadData";
import XHRLoadData from "../utils/xhrLoadData";
import DB from '../utils/db';
class IndexPage{
    constructor(){
        this.fetchLoad = new FeatchLoadData();
        this.xhrLoad = new XHRLoadData();
        this.dataBase = new DB();
    }
    initPage(){
        Promise.resolve()
        .then(()=>this.renderPage())
        .then(()=>this.addEventListener());
    }
    renderPage(){
        document.querySelector("header").innerHTML=`
        <label><input class="fetch" type="radio" name="query" value="fetch" >fetch</label>
        <label><input class="XHR" type="radio" name="query" value="xhr" checked>XHR</label>
        <span class='links'> <a href="#">Main</a> <a href="#about">About</a> </span>
        <input class="searchLine" placeholder="Search" type="text" autofocus>
        <button class='enter'>Search</button>`;
        document.querySelector(".workPlace").innerHTML=`
        <span>Hello this hello page</span>
        `
        document.querySelector('footer').innerHTML=`

        `
    }
    chageUrlOnSearchCity(){
        if(document.querySelector('.XHR').checked){
            this.dataBase.methodRequestSave('xhr')
        }else{
            this.dataBase.methodRequestSave('fetch')
        }
        location.href="#"+document.querySelector('.searchLine').value;
    }
    addEventListener(){
        document.querySelector('.enter').addEventListener('click',()=>this.chageUrlOnSearchCity())
    }

}
export {IndexPage}