describe("eventBus", function() {
  it("is func", () => assert.isOk(typeof EventBus === "function"));
  describe("trigger", function() {
      it("has trigger method", () => assert.isOk(typeof (new EventBus).trigger === "function"));
  });
  describe("on", function() {
      it("has on method", () => assert.isOk(typeof (new EventBus).on === "function"));
      it("on takes 2 params", () => assert.isOk((new EventBus).on.length === 2));
  });
  describe("on vs trigger", function() {
      it("trigger calls handlers from on", () => {
          var a = 1;
          var eventBus = new EventBus();
          eventBus.on("some:event", () => a++);
          assert.isOk(a === 1, "a === 1");
          eventBus.trigger("some:event");
          assert.isOk(a === 2, "triggers call handler from on");
      });
      it("trigger pass params from on", () => {
          var a = 1;
          var eventBus = new EventBus();
          eventBus.on("some:event", (x) => a = a + x);
          assert.isOk(a === 1, "a === 1");
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 5, "triggers call handler from on");
      });
      it("trigger calls all hanler", () => {
          var a = 1;
          var b = 2;
          var eventBus = new EventBus();
          eventBus.on("some:event", (x) => a = a + x);
          eventBus.on("some:event", (x) => b = b + x);
          
          assert.isOk(a === 1, "a === 1");
          assert.isOk(b === 2, "a === 2");            
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 5, "triggers call handler from on");
          assert.isOk(b === 6, "triggers call handler from on");            
      });
      it("trigger work fine with no hanler", () => {
          var eventBus = new EventBus();           
          eventBus.trigger("some:event", 4);
          assert.isOk(1 === 1);           
      });

      it("trigger work fine with no function handler", () => {
          var eventBus = new EventBus(); 
          eventBus.on("some:event", "someString");
          eventBus.trigger("some:event", 4);
          assert.isOk(1 === 1);           
      });

      it("trigger work fine with manu params", () => {
          var a = 1;
          var eventBus = new EventBus(); 
          eventBus.on("some:event", (x, y) => a = a + x + y);
          eventBus.trigger("some:event", 4, 5);
          assert.isOk(a === 10, "a === 10");           
      });
  });
  describe("off", function() {
      it("has off method", () => assert.isOk(typeof (new EventBus).off === "function"));
      it("off takes 2 params", () => assert.isOk((new EventBus).off.length === 2));
      it("off removes event", () => {
          var eventBus = new EventBus();
          var a = 1;
          var aFunc = x => a = a + x;
          eventBus.on("some:event", aFunc);
          assert.isOk(a === 1, "a === 1"); 
          eventBus.off("some:event", aFunc);
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 1, "a === 1");   
      });
      it("off removes current event handler", () => {
          var eventBus = new EventBus();
          var a = 1;
          var b = 2;
          var c = 3;            

          var aFunc = x => a = a + x;
          var bFunc = x => b = b + x;
          var cFunc = x => c = c + x;            
          eventBus.on("some:event", aFunc);
          eventBus.on("some:event", bFunc);
          eventBus.on("some:event", cFunc);                        

          assert.isOk(a === 1, "a === 1"); 
          assert.isOk(b === 2, "b === 2");  
          assert.isOk(c === 3, "c === 3");                          

          eventBus.off("some:event", aFunc);
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 1, "a === 1");   
          assert.isOk(b === 6, "b === 6"); 
          assert.isOk(c === 7, "c === 7");               
          
      });

      it("off delete all event if do not pass handler", () => {
          var eventBus = new EventBus();
          var a = 1;
          var b = 2;

          var aFunc = x => a = a + x;
          var bFunc = x => b = b + x;
          eventBus.on("some:eventForOff", aFunc);
          eventBus.on("some:eventForOff", bFunc);

          assert.isOk(a === 1, "a === 1"); 
          assert.isOk(b === 2, "b === 2");  

          eventBus.off("some:eventForOff");
          eventBus.trigger("some:eventForOff", 4);
          assert.isOk(a === 1, "a === 1");   
          assert.isOk(b === 2, "b === 2");               
      });
  });
  describe("once", function() {
      it("has once method", () => assert.isOk(typeof (new EventBus).once === "function"));
      it("once takes 2 params", () => assert.isOk((new EventBus).once.length === 2)); 
      it("once add event to listeners", () => {
          var eventBus = new EventBus();
          var a = 1;

          var aFunc = x => a = a + x;
          eventBus.once("some:event", aFunc);
          assert.isOk(a === 1, "a === 1"); 
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 5, "a === 5");               
      });
      it("once method calls handler once", () => {
          var eventBus = new EventBus();
          var a = 1;

          var aFunc = x => a = a + x;
          eventBus.once("some:event", aFunc);
          assert.isOk(a === 1, "a === 1"); 
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 5, "a === 5"); 
          eventBus.trigger("some:event", 32);
          assert.isOk(a === 5, "a === 5");             
      });
      it("once method offs correct handler (once after on)", () => {
          var eventBus = new EventBus();
          var a = 1;
          var b = 2;

          var aFunc = x => a = a + x;
          var bFunc = x => b = b + x;
          
          eventBus.on("some:event", aFunc);
          eventBus.once("some:event", bFunc);
          
          assert.isOk(a === 1, "a === 1"); 
          assert.isOk(b === 2, "b === 2"); 
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 5, "a === 5"); 
          assert.isOk(b === 6, "b === 6"); 
          eventBus.trigger("some:event", 2);
          assert.isOk(a === 7, "a === 7");  
          assert.isOk(b === 6, "b === 6");              
      });
      it("once method offs correct handler (once befor on)", () => {
          var eventBus = new EventBus();
          var a = 1;
          var b = 2;

          var aFunc = x => a = a + x;
          var bFunc = x => b = b + x;
          
          eventBus.once("some:event", bFunc);            
          eventBus.on("some:event", aFunc);
          
          assert.isOk(a === 1, "a === 1"); 
          assert.isOk(b === 2, "b === 2"); 
          
          eventBus.trigger("some:event", 4);
          assert.isOk(a === 5, "a === 5"); 
          assert.isOk(b === 6, "b === 6"); 
          eventBus.trigger("some:event", 2);
          assert.isOk(a === 7, "a === 7");  
          assert.isOk(b === 6, "b === 6");             
      });
  });        
});
