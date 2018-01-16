var Router=function(options)
{   this.routes=options.routes||[];
    this.currParam;
    this.prevParam;
    this.currRoute;
    this.prevRoute;
    window.addEventListener("hashchange", this.hashChangeActions);
    this.hashChangeActions(window.location.hash);
}

Router.prototype={
    hashChangeActions:(url)=>{
        
        

        
        
    },
    triggerHandlers:()=>
    {

    }

}