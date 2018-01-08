describe("Router", () => {
  //  getPage function
  //  умеет определять ТЕКУЩИЙ роут
  describe("getPage method", () => {
    it("Router has getPage method", () => assert.isOk(typeof (new Router()).getPage === "function"));
    it("Router getPage function returns current page", () => {
      var router = new Router();
      assert.isOk(router.getPage() === "");
      document.getElementById("routePageButton").click();
      assert.isOk(router.getPage() === "testPage");      
    });
  });

  describe("Router init", () => {
    it("is function", () => assert.isOk(typeof Router === "function"));
    it("Router takes 1 param", () => assert.isOk((Router).length === 1));
    // it("Router init currentPage as empty string", () => {
    //   assert.isOk(typeof (new Router()).currentPage === "string");
    //   assert.isOk((new Router()).currentPage === "");      
    // });
    it("Router initialize 'routes' from taked param", () => {
      var routes = [
        {
          name: "name", 
          onEnter: () => "return"
        }
      ];
      var router = new Router(routes);
      assert.isOk(router.routes);
      assert.isOk(router.routes.length === routes.length);
      assert.isOk(router.routes === routes);
    });
    it("Router puts current page to currentPage after init", () => {
      document.getElementById("routeClearPageButton").click();        
      var routerEmpty = new Router();
      assert.isOk(routerEmpty.getPage() === "");        
      assert.isOk(routerEmpty.currentPage === "");

      document.getElementById("routePageButton").click();
      var routerNotEmpty = new Router();
      assert.isOk(routerNotEmpty.getPage() === "testPage");  
      assert.isOk(routerNotEmpty.currentPage === "testPage");            
    });
    it("Router init add 'hashchange' listener", (done) => {
      document.getElementById("routeClearPageButton").click();  
      var initNumber = 1;
      var number = 5;
      var routeList = [
        {
          name: "index",
          match: "",
          onLeave: () => initNumber++
        },
        {
          name: "testPage",
          match: /testPage/,
          onBeforeEnter: () => number--
        }
      ];
      var router = new Router(routeList);
      document.getElementById("routePageButton").click(); 
      //FIXME
      done();
      // setTimeout(() => {
      //   assert.isOk(initNumber === 2);
      //   assert.isOk(number === 4);
      //   done();
      // }, 0);           
    });
    it("Call onBeforeEnter and onEnter function in first load", () => {
      document.getElementById("routeClearPageButton").click();   
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
      var router = new Router();
    });
    it("Do not call onLeave in first load", () => {

    });
  });
    

  //  can not test this!!!!!! - call handleURL function
  // it("Router init create hashchange listener", () => {
  //   assert.isOk(window.onhashchange === null);
  //   var router = new Router();
  //   assert.isOk(typeof window.onhashchange === "function");    
  // });

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
      assert.isOk(router.findRoute("testPage") === routes[0]);
    });
    it("findRoute method can find route by function", () => {
      var routes = [
        {
          name: "main",
          match: page => page === "testPage"
        }
      ];
      var router = new Router(routes);
      assert.isOk(router.findRoute("testPage") === routes[0]);
    });
    it("findRoute method can find route by regular expression", () => {
      var routes = [
        {
          name: "main",
          match: /testPage/
        }
      ];
      var router = new Router(routes);
      assert.isOk(router.findRoute("testPage") === routes[0]);
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
      assert.isOk(router.findRoute("page") === routeList[1]);
      assert.isNotOk(router.findRoute("page") === routeList[3]);
    });
    it("findRoute returns 'undefined' if can not find route", () => {
      var routes = [
        {
          name: "main",
          match: "testPage"
        }
      ];
      var router = new Router(routes);
      assert.isNotOk(router.findRoute("page") === routes[0]);
      assert.isOk(router.findRoute("page") === undefined);
    });
    it("findRoute returns 'undefined' if takes null or undefined values", () => {
      var routes = [
        {
          name: "main",
          match: "testPage"
        }
      ];
      var router = new Router(routes);
      assert.isOk(router.findRoute() === undefined);
      assert.isOk(router.findRoute(null) === undefined);
      assert.isOk(router.findRoute(undefined) === undefined);      
    });
    it("findRoute returns 'udefined' if routes is empty array", () => {
      var routes = [];
      var router = new Router(routes);
      assert.isOk(router.findRoute("testPage") === undefined);
    });
    it("findRoute returns 'udefined' if routes is null or undefined", () => {
      var router1 = new Router();
      assert.isOk(router1.findRoute("testPage") === undefined);
      var router2 = new Router(null);
      assert.isOk(router2.findRoute("testPage") === undefined);
      var router3 = new Router(undefined);
      assert.isOk(router3.findRoute("testPage") === undefined);
    });
  });

  describe("loadPage", () => {
    it("Router has loadPage method", () => assert.isOk(typeof (new Router()).loadPage === "function"));
    it("loadPage takes 1 param", () => assert.isOk((new Router()).loadPage.length === 1));
    it("nothig happend if loaded route does not exist", () => {
      var number = 2; 
      var routeList = [
        {
          name: "page",
          match: "page"
        }
      ];
      var router = new Router(routeList);
      // debugger;
      var result = router.loadPage("testPage");
      
      expect(result).to.be.a('promise');
      return result.then(() => assert.isOk(number === 2));
    });
    describe("onEnter", () => {
      it("loadPage call onEnter for current page", () => {
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onEnter: () => number++
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 3));
      });
      it("nothig happend if onEnter is not a function", () => {
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onEnter: 2
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
      it("nothig happend if route does not have onEnter", () => {
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage"
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
    });    
    describe("onBeforeEnter", () => {
      it("loadPage call onBeforeEnter for current page", () => {
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onBeforeEnter: () => number++
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 3));
      });
      it("nothig happend if onBeforeEnter is not a function", () => {
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onBeforeEnter: 2
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
      it("nothig happend if route does not have onBeforeEnter", () => {
        var number = 2; 
        var routeList = [
          {
            name: "testPage",
            match: "testPage"
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        expect(result).to.be.a('promise');
        return result.then(() => assert.isOk(number === 2));
      });
    });
    describe("onLeave", () => {
      it("pageLoad call onLeave for current page", () => {
        document.getElementById("routeClearPageButton").click();        
        var number = 3;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => number = number + 2
          },
          {
            name: "testPage",
            match: "testPage",
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => assert.isOk(number === 5));
      });
      it("nothig happend if previous route does not exist", () => {
        document.getElementById("routeClearPageButton").click();        
        var number = 3;
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        return result.then(() => assert.isOk(number === 3));
      });
      it("nothig happend if onLeave is not a function", () => {
        document.getElementById("routeClearPageButton").click();        
        var number = 3;
        var routeList = [
          {
            name: "page",
            match: "",
            onLeave: 2
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        return result.then(() => assert.isOk(number === 3));
      });
      it("nothig happend if route does not have onLeave", () => {
        document.getElementById("routeClearPageButton").click();        
        var number = 3;
        var routeList = [
          {
            name: "page",
            match: ""
          }
        ];
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        
        return result.then(() => assert.isOk(number === 3));
      });
    });
    describe("all", () => {
      it("loadPage call onLeave, onBeforeEnter, onEnter", () => {
        document.getElementById("routeClearPageButton").click();        
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
            onEnter: () => pageNumber++,
            onBeforeEnter: () => pageNumber = pageNumber - 6
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 2);        
        });
      });
      it("loadPage call onBeforeEnter, onEnter", () => {
        document.getElementById("routeClearPageButton").click();        
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
            onEnter: () => pageNumber++,
            onBeforeEnter: () => pageNumber = pageNumber - 6
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 4);
          assert.isOk(pageNumber === 2);        
        });
      });
      it("loadPage call onLeave, onEnter", () => {
        document.getElementById("routeClearPageButton").click();        
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
            onEnter: () => pageNumber++
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 8);        
        });
      });
      it("loadPage call onLeave, onBeforeEnter", () => {
        document.getElementById("routeClearPageButton").click();        
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
            onBeforeEnter: () => pageNumber = pageNumber - 6
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 1);        
        });
      });
      it("loadPage call onEnter", () => {
        document.getElementById("routeClearPageButton").click();        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: "",
          },
          {
            name: "testPage",
            match: "testPage",
            onEnter: () => pageNumber++
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 4);
          assert.isOk(pageNumber === 8);        
        });
      });
      it("loadPage call onLeave, onBeforeEnter(not function), onEnter", () => {
        document.getElementById("routeClearPageButton").click();        
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
            onEnter: () => pageNumber++,
            onBeforeEnter: 6
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 3);
          assert.isOk(pageNumber === 8);        
        });
      });
      it("loadPage call onLeave(not function), onBeforeEnter(not function), onEnter", () => {
        document.getElementById("routeClearPageButton").click();        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: 2
          },
          {
            name: "testPage",
            match: "testPage",
            onEnter: () => pageNumber++,
            onBeforeEnter: 6
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 4);
          assert.isOk(pageNumber === 8);        
        });
      });
      it("loadPage has only previous route", () => {
        document.getElementById("routeClearPageButton").click();        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "index",
            match: "",
            onLeave: () => indexNumber--
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 4);
          assert.isOk(pageNumber === 7);        
        });
      });
      it("loadPage has only next route", () => {
        document.getElementById("routeClearPageButton").click();        
        var indexNumber = 4;
        var pageNumber = 7;
        var routeList = [
          {
            name: "testPage",
            match: "testPage",
            onEnter: () => pageNumber++,
            onBeforeEnter: () => pageNumber = pageNumber - 6
          }
        ];   
        var router = new Router(routeList);
        var result = router.loadPage("testPage");
        return result.then(() => {
          assert.isOk(indexNumber === 4);
          assert.isOk(pageNumber === 2);        
        });
      });
    });
  });
  

  describe("handleURL method", () => {
    it("Router has handleURL method", () => assert.isOk(typeof (new Router()).handleURL === "function"));
    it("handleURL call load page for current page", (done) => {
      document.getElementById("routeClearPageButton").click();  
      var initNumber = 1;
      var number = 5;
      var routeList = [
        {
          name: "index",
          match: "",
          onLeave: () => initNumber++
        },
        {
          name: "testPage",
          match: /testPage/,
          onEnter: () => number--
        }
      ];
      var router = new Router(routeList);
      document.getElementById("routePageButton").click(); 
      setTimeout(() => {
        console.log("handleURL call load page for current page");
        console.log("initNumber", initNumber);
        assert.isOk(initNumber === 2);
        console.log("number", number);
        assert.isOk(number === 4);
        done();
      }, 0); 
    });
    it("nothing heppend if call route again", (done) => {
      document.getElementById("routePageButton").click();  
      var initNumber = 1;
      var number = 5;
      var routeList = [
        {
          name: "index",
          match: "",
          onLeave: () => initNumber++
        },
        {
          name: "testPage",
          match: /testPage/,
          onLeave: () => initNumber = initNumber + 4,          
          onBeforeEnter: () => number--,
          onEnter: () => number--
        }
      ];
      var router = new Router(routeList);
      // return Promise.resolve().then(() => document.getElementById("routePageButton").click())
      // .then(() => assert.isOk(initNumber === 1)).then(() => assert.isOk(number === 5));
      document.getElementById("routePageButton").click(); 
       
      // return Promise.resolve().then(() => assert.isOk(initNumber === 1)).then(() => assert.isOk(number === 5));
      
      setTimeout(() => {
        console.log("nothing heppend if call route again");
        console.log("initNumber", initNumber);
        assert.isOk(initNumber === 1);
        console.log("number", number);
        assert.isOk(number === 5);
        done();
      }, 10); 
    });

    // it("handleURL call load page for current page", () => {
    //   document.getElementById("routeClearPageButton").click();  
    //   var routeList = [
    //     {
    //       name: "index",
    //       match: ""
    //       onLeave: () => 
    //     },
    //     {
    //       name: "testPage",
    //       match: /testPage/
    //     }
    //   ];
    //   var router = new Router(routeList);
    //   document.getElementById("routePageButton").click();              
      
    // });

    // it("handleUrl gets current page", () => {
    //   document.getElementById("routeClearPageButton").click();  
    //   var router = new Router();
    //   document.getElementById("routePageButton").click();              
    //   assert.isOk(router.handleURL() === "testPage");      
    // });
    // it("")

    //first load
    // it("call onEnter after first load", () => {
      
    // });


  });
    

  //  умеет переходить на роут
  // it("Router has setPage method", () => assert.isOk(typeof (new Router).setPage === "function"));
  // it("Router setPage method takes 1 parameter", () => assert.isOk((new Router).setPage.length === 1));
  // it("Router setPage method set new page to URL", () => {
  //   var router = new Router();
  //   router.setPage("newPage");
  //   assert.isOk(router.getPage() === "newPage");
  // });

  //  роуты друг за другом
  //  второй отрабатывает раньше первого

  //  изменение на текущий роут: testPage -> testPage

  //  отслеживает изменение URL

  //  работает с функцией

  //  работает с регуляркой

  //  работает со строкой

  //  вызывает onLeave()

  //  вызывает onBeforeEnter()

  //  вызывает onEnter()

  //  умеет разбирать URL???

  //  умеет определять роут с которого УХОДИМ

  //  умеет определять роут на который СОБИРАЕМСЯ ПРИХОДИТЬ

    

  //  умеет добавлять роут

  //  умеет удалять роут

  //  умеет обновлять роут????


  // it("Router constructor takes 1 param", () => assert.isOk((Router).length === 1));
  // it("Router takes array as param", ())
  // 
});
