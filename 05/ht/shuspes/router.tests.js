describe("Router", () => {
   describe("getHash method", () => {
    it("Router has getHash method", () => assert.isOk(typeof (new Router()).getHash === "function"));
    it("returns empty string if hash does not exist", () => {
      var router = new Router();      
      assert.isOk(router.getHash() === "");
    });
    it("returns current route", () => {
      window.location.hash = "#testPage";
      var router = new Router();
      assert.isOk(router.getHash() === "testPage");     
    });
    it("returns current route if hash has params", () => {
      window.location.hash = "#page?city=minsk";
      var router = new Router();
      assert.isOk(router.getHash() === "page?city=minsk");
    });
  });

  describe("getHashParameters method", () => {
    it("Router has getHashParameters method", () => assert.isOk(typeof (new Router()).getHashParameters === "function"));
    it("'#route' -> empty object", () => {
      window.location.hash = "#route";
      var router = new Router();
      var data = router.getHashParameters();
      assert.isObject(data);
      assert.isEmpty(data);
    });
    it("'#route?' -> empty obj", () => {
      window.location.hash = "#route?";
      var router = new Router();
      var data = router.getHashParameters();
      assert.isObject(data);
      assert.isEmpty(data);
    });
    it("'#route?city=Minsk' -> {city: Minsk}", () => {
      window.location.hash = "#route?city=Minsk";
      var router = new Router();
      var data = router.getHashParameters();
      assert.isObject(data);  
      assert.deepEqual(data, {city: "Minsk"});
    });
    it("'#route?city=brest&count=123' -> {city: brest, count: 123}", () => {
      window.location.hash = "#route?city=brest&count=123";
      var router = new Router();
      var data = router.getHashParameters();
      assert.isObject(data);      
      assert.deepEqual(data, {city: "brest", count: "123"});
    });
    it("'#route=test' -> empty obj", () => {
      window.location.hash = "#route=test";
      var router = new Router();
      var data = router.getHashParameters();
      assert.isObject(data);          
      assert.isEmpty(data);
    });
    it("'#?route=test' -> {route: test}", () => {
      window.location.hash = "#?route=test";
      var router = new Router();
      var data = router.getHashParameters();
      assert.isObject(data);          
      assert.deepEqual(data, {route: "test"});
    });
    it("'#page$test=page' -> empty obj", () => {
      window.location.hash = "#page$test=page";
      var router = new Router();
      var data = router.getHashParameters();      
      assert.isObject(data); 
      assert.isEmpty(data);         
    });
  });
  
  //NOTE: creating
  describe("Router init", () => {
    it("is function", () => assert.isOk(typeof Router === "function"));
    it("Router takes 1 param", () => assert.isOk((Router).length === 1));
    it("Router initialize 'routes' from taked param", () => {
      var routes = [
        {
          name: "name", 
          onEnter: () => "return"
        }
      ];
      var router = new Router(routes);
      assert.deepEqual(router.routes, routes);
    });
    it("Router creats 'currentPage' and 'currentPageParams' after init", () => {  
      window.location.hash = "";      
      var router = new Router();      
      assert.isNull(router.currentPage);
      assert.isNull(router.currentPageParams);          
    });
    it("Do not call onLeave in first load (create new Router)", done => {
      window.location.hash = "";      
      setTimeout(() => {
        var initNumber = 1;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => {
              initNumber++;
            }
          }
        ];
        var router = new Router(routeList);
        setTimeout(() => {
          assert.isOk(initNumber === 1);
          done();
        }, 0);   
      }, 0);    
    });
    it("Call onBeforeEnter and onEnter function in first load", done => {
      window.location.hash = "";      
      setTimeout(() => {
        var testString = "";     
        var routerList = [
          {
            name: "init",
            match: "",
            onLeave: () => testString += "leave",
            onBeforeEnter: () => testString += "before",
            onEnter: () => testString += "enter"
          },
          {
            name: "testPage",
            match: "testPage",
            onLeave: () => testString += "test leave",
            onBeforeEnter: () => testString += "test before",
            onEnter: () => testString += "test enter"
          }
        ];
        var router = new Router(routerList);
        setTimeout(() => {          
          assert.isOk(testString === "beforeenter");
          done();
        }, 0);
      }, 0);
    });
    it("Router init add 'hashchange' listener", done => {      
      window.location.hash = "";      
      setTimeout(() => {
        var initNumber = 1;
        var number = 5;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => {
              initNumber++;
            }
          },
          {
            name: "testPage",
            match: /testPage/,
            onBeforeEnter: () => {
              number--;            
            }
          }
        ];
        var router = new Router(routeList);
        window.location.hash = "#testPage";
        setTimeout(() => {
          assert.isOk(initNumber === 2);
          assert.isOk(number === 4);
          done();
        }, 0);   
      }, 0);        
    });
  });

  describe("findRoute method", () => {
    it("Router has findRoute method", () => assert.isOk(typeof (new Router()).findRoute === "function"));
    it("findRoute takes 1 param", () => assert.isOk((new Router()).findRoute.length === 1));
    it("findRoute method can find route by string", () => {
      var routes = [
        {
          name: "main",
          match: "testPage"
        }
      ];
      var router = new Router(routes);
      assert.deepEqual(router.findRoute("testPage"), routes[0]);
    });
    it("findRoute method can find route by function", () => {
      var routes = [
        {
          name: "main",
          match: page => page === "testPage"
        }
      ];
      var router = new Router(routes);
      assert.deepEqual(router.findRoute("testPage"), routes[0]);
    });
    it("findRoute method can find route by regular expression", () => {
      var routes = [
        {
          name: "main",
          match: /testPage/
        }
      ];
      var router = new Router(routes);
      assert.deepEqual(router.findRoute("testPage"), routes[0]);
    });
    it("findRoute returns first route by match", () => {
      var routeList = [
        {
          name: "index",
          match: ""
        },
        {
          name: "testPage",  
          match: /page/
        },
        {
          name: "page",
          match: url => url === "somePage"
        },
        {
          name: "secondPage",
          match: "page"
        }
      ];
      var router = new Router(routeList);
      assert.deepEqual(router.findRoute("page"), routeList[1]);
      assert.notDeepEqual(router.findRoute("page"), routeList[3]);
    });
    it("findRoute returns 'undefined' if can not find route", () => {
      var routes = [
        {
          name: "main",
          match: "testPage"
        }
      ];
      var router = new Router(routes);
      assert.notDeepEqual(router.findRoute("page"), routes[0]);
      assert.isUndefined(router.findRoute("page"));
    });
    it("findRoute returns 'undefined' if takes null or undefined values", () => {
      var routes = [
        {
          name: "main",
          match: "testPage"
        }
      ];
      var router = new Router(routes);
      assert.isUndefined(router.findRoute());
      assert.isUndefined(router.findRoute(null));
      assert.isUndefined(router.findRoute(undefined));      
    });
    it("findRoute returns 'udefined' if routes is empty array", () => {
      var routes = [];
      var router = new Router(routes);
      assert.isUndefined(router.findRoute("testPage"));
    });
    it("findRoute returns 'udefined' if routes is null or undefined", () => {
      var router1 = new Router();
      assert.isUndefined(router1.findRoute("testPage"));
      var router2 = new Router(null);
      assert.isUndefined(router2.findRoute("testPage"));
      var router3 = new Router(undefined);
      assert.isUndefined(router3.findRoute("testPage"));
    });
  });

  describe("loadPage", () => {
    it("Router has loadPage method", () => assert.isOk(typeof (new Router()).loadPage === "function"));
    it("nothig happend if loaded route does not exist", () => {
      window.location.hash = "#testHash";
      var number = 2; 
      var routeList = [
        {
          name: "testPage",
          match: "testPage",
          onEnter: () => number++
        }
      ];
      var router = new Router(routeList);
      var result = router.loadPage();
      expect(result).to.be.a('promise');
      return result.then(() => assert.isOk(number === 2));
    });
    it("loadPage set new currentPage and currentPageParam values", () => {
      window.location.hash = "second?testKey=testVal&someKey=someVal";
      var routeList = [
        {
          name: "test",
          match: ""
        },
        {
          name: "second",
          match: /second?(.+)/
        }
      ];
      var router = new Router(routeList);
      router.currentPage = "";
      var result = router.loadPage();
      expect(result).to.be.a('promise');
      return result.then(() => {
        assert.deepEqual(router.currentPageParams, {testKey: "testVal", someKey: "someVal"});
        assert.isOk(router.currentPage === "second?testKey=testVal&someKey=someVal");
      });
    });

    describe("onEnter", () => {
      it("loadPage call onEnter for current page", () => {
        window.location.hash = "#testPage";
        var number = 2; 
        var second = 4;
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onEnter: () => number++
          },
          {
            name: "test",
            match: "test",
            onEnter: () => second += 4
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage();  
        window.location.hash = "#test";   
        var resultTest = router.loadPage();                   
        expect(result).to.be.a('promise');
        expect(resultTest).to.be.a('promise');                               
        return result.then(() => assert.isOk(number === 4)).then(() => assert.isOk(second === 8));
      });
      it("nothig happend if onEnter is not a function", () => {
        window.location.hash = "#testPage";
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onEnter: 123
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage();  
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
      it("nothig happend if route does not have onEnter", () => {
        window.location.hash = "#testPage";
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage"
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage();  
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
    });

    describe("onBeforeEnter", () => {
      it("loadPage call onBeforeEnter for current page", () => {
        window.location.hash = "#hash";        
        var number = 2; 
        var routeList = [
          {
            name: "hash",
            match: "hash",
            onBeforeEnter: () => number++
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage();
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 4));
      });
      it("nothig happend if onBeforeEnter is not a function", () => {
        window.location.hash = "#hash";                
        var number = 2; 
        var routeList = [
          {
            name: "hash",
            match: "hash",
            onBeforeEnter: 2
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage();
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
      it("nothig happend if route does not have onBeforeEnter", () => {
        window.location.hash = "#hash";                        
        var number = 2; 
        var routeList = [
          {
            name: "hash",
            match: "hash"
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage();
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
    });

    describe("onLeave", () => {
      it("pageLoad call onLeave for current page", () => {
        window.location.hash = "";                        
        var number = 3;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => number = number + 2
          }
        ];
        var router = new Router(routeList);
        router.currentPage = "";
        var result = router.loadPage();
        return result.then(() => assert.isOk(number === 5));
      });
      it("nothig happend if previous route does not exist", () => {
        window.location.hash = "";                        
        var number = 3;
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
          }
        ];
        var router = new Router(routeList);
        router.currentPage = "";        
        var result = router.loadPage();
        return result.then(() => assert.isOk(number === 3));
      });
      it("nothig happend if onLeave is not a function", () => {
        window.location.hash = "";                        
        var number = 3;
        var routeList = [
          {
            name: "page",
            match: "",
            onLeave: 2
          }
        ];
        var router = new Router(routeList);
        router.currentPage = "";                
        var result = router.loadPage();
        return result.then(() => assert.isOk(number === 3));
      });
      it("nothig happend if route does not have onLeave", () => {
        window.location.hash = "";                        
        var number = 3;
        var routeList = [
          {
            name: "page",
            match: ""
          }
        ];
        var router = new Router(routeList);
        router.currentPage = "";                        
        var result = router.loadPage();
        return result.then(() => assert.isOk(number === 3));
      });
    });

    describe("all", () => {
      it("loadPage call onLeave, onBeforeEnter, onEnter", () => {
        window.location.hash = "testPage";                        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => indexNumber--
          },
          {
            name: "testPage",
            match: "testPage",
            onLeave: () => pageNumber--,
            onEnter: () => pageNumber++,
            onBeforeEnter: () => pageNumber = pageNumber - 2
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = "";
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 5);        
        });
      });
      it("loadPage call onBeforeEnter, onEnter", () => {
        window.location.hash = "testPage";                        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: ""
          },
          {
            name: "testPage",
            match: "testPage",
            onLeave: () => pageNumber--,            
            onEnter: () => pageNumber++,
            onBeforeEnter: () => pageNumber = pageNumber - 4
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = "";        
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(indexNumber === 4);
          assert.isOk(pageNumber === 1);        
        });
      });
      it("loadPage call onLeave, onEnter", () => {
        window.location.hash = "testPage";                        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => indexNumber--
          },
          {
            name: "testPage",
            match: "testPage",
            onLeave: () => pageNumber--,            
            onEnter: () => pageNumber++
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = "";                
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 9);        
        });
      });
      it("loadPage call onLeave, onBeforeEnter", () => {
        window.location.hash = "testPage";                        
        var indexNumber = 17;
        var pageNumber = 34;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => indexNumber--
          },
          {
            name: "testPage",
            match: "testPage",
            onLeave: () => pageNumber--,            
            onBeforeEnter: () => pageNumber = pageNumber + 2
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = "";                        
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(indexNumber === 16);
          assert.isOk(pageNumber === 38);        
        });
      });
      it("loadPage has only previous route", () => {
        window.location.hash = "testPage";
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => indexNumber--
          }, 
          {
            name: "index",
            match: "testPage"
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = "";                        
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 7);        
        });
      });
      it("loadPage has only next route", () => {
        window.location.hash = "#testPage";
        var indexNumber = 24;
        var pageNumber = 65;
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onEnter: () => pageNumber++,
            onBeforeEnter: () => pageNumber = pageNumber - 6
          },
          {
            name: "index",
            match: ""
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = "";        
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(indexNumber === 24);          
          assert.isOk(pageNumber === 55);        
        });
      });
      it("onLeave takes previous params", () => {
        window.location.hash = "#testPage";
        var number = 18;
        var routeList = [
          {
            name: "testPage",
            match: "testPage"
          },
          {
            name: "index",
            match: "",
            onLeave: obj => number += obj.nextNumber
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = ""; 
        router.currentPageParams = {nextNumber: 2};       
        var result = router.loadPage();
        return result.then(() => {
          assert.isOk(number === 20);          
        });
      });
      it("onEnter and onBeforeEnter takes params from URL", () => {
        window.location.hash = "#testPage?test=value&second=some";
        var initString = "";
        var leaveString = "leave";
        var routeList = [
          {
            name: "testPage",
            match: /testPage?(.+)/,
            onBeforeEnter: obj => initString = `test=${obj.test}, second=`,
            onEnter: obj => initString = `test=${obj.test}, second=${obj.second}`
          },
          {
            name: "index",
            match: "",
            onLeave: obj => {if(obj) leaveString += obj.test}
          }
        ];   
        var router = new Router(routeList);
        router.currentPage = ""; 
        var result = router.loadPage();
        return result.then(() => {          
          assert.isOk(initString === "test=value, second=some");
          assert.isOk(leaveString === "leave");          
        });
      });
    });
  });

  describe("complex", () => {
    it("two routes. nothing happens if set the same hash", done => {
      window.location.hash = "index?pageName=index";
      var resultString = "";
      
      setTimeout(() => {
        var routeList = [
          {
            name: "index",
            match: /index?(.+)/,
            onBeforeEnter: obj => resultString += `${obj.pageName} before,`,
            onEnter: obj => resultString += `${obj.pageName} enter,`,
            onLeave: obj => resultString += `${obj.pageName} leave,`
          },
          {
            name: "test",
            match: /test?(.+)/,
            onBeforeEnter: obj => resultString += `${obj.pageName} before,`,
            onEnter: obj => resultString += `${obj.pageName} enter,`,
            onLeave: obj => resultString += `${obj.pageName} leave,`
          }
        ];
        var router = new Router(routeList);
        window.location.hash = "test?pageName=test";

        setTimeout(() => {
          window.location.hash = "test?pageName=test";
          
          setTimeout(() => {            
            assert.isOk(resultString === "index before,index enter,index leave,test before,test enter,");
            done();
          }, 0)
        }, 0);
      }, 0);
    });
  });    
});