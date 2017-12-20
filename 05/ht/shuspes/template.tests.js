describe("template", function() {
  describe("Template class", () => {
      it("is function", () => assert.isOk(typeof Template === "function"));
      it("Template constructor takes 1 param", () => assert.isOk((Template).length === 1));
      it("Template constructor create templateString property", () => {
          var tpl = "";
          var template = new Template(tpl);
          assert.isOk(template.templateString === tpl);
      });
      describe("replaceByTag", () => {
          it("has replaceByTag method", () => assert.isOk(typeof (new Template("")).replaceByTag === "function"));
          it("replaceByTag takes 3 params", () => assert.isOk((new Template("")).replaceByTag.length === 3));
          it("replaceByTag return string", () => {
              var tpl = "test string";
              var template = new Template(tpl);
              var result = template.replaceByTag(tpl, "someTag", "value");
              assert.exists(result);
              assert.isOk(typeof result === "string");
          });
          it("ireplaceByTag returns empty string when takes not valid string", () => {
              var tpl = "My name is Alex";                
              var tagName = "name";
              var value = "Alex";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(null, tagName, value) === "");
              assert.isOk(template.replaceByTag(undefined, tagName, value) === "");
              assert.isOk(template.replaceByTag("", tagName, value) === "");                
          });
          it("ireplaceByTag returns string when takes not valid tagName", () => {
              var tpl = "My name is Alex";  
              var string = "{{null}} {{undefined}} alex";              
              var value = "Alex";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(string, null, value) === string);
              assert.isOk(template.replaceByTag(string, undefined, value) === string);
              assert.isOk(template.replaceByTag(string, "", value) === string);                
          });
          it("ireplaceByTag returns correct string when takes not valid value", () => {
              var tpl = "My name is Alex";  
              var string = "My {{name}} is Alex";  
              var result = "My  is Alex";            
              var tagName = "name";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(string, tagName, null) === result);
              assert.isOk(template.replaceByTag(string, tagName, undefined) === result);
              assert.isOk(template.replaceByTag(string, tagName, "") === result);                
          });
          it("ireplaceByTag replace tag with value in string", () => {
              var tpl = "My name is {{name}}";
              var tagName = "name";
              var value = "Alex";
              var tplResult = "My name is Alex";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(tpl, tagName, value) === tplResult);
          });
          it("ireplaceByTag replace all tags with value in string", () => {
              var tpl = "{{name}}: My name is {{name}}";
              var tagName = "name";
              var value = "Alex";
              var tplResult = "Alex: My name is Alex";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(tpl, tagName, value) === tplResult);
          });
          it("ireplaceByTag replace only current tags with value in string", () => {
              var tpl = "{{name}}: My name is {{name}} {{lastName}}";
              var tagName = "name";
              var value = "Alex";
              var tplResult = "Alex: My name is Alex {{lastName}}";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(tpl, tagName, value) === tplResult);
          });
          it("ireplaceByTag replace tag with no string value", () => {
              var tpl = "Alex is {{age}} years old";
              var tagName = "age";
              var value = 20;
              var tplResult = "Alex is 20 years old";
              var template = new Template(tpl);
              assert.isOk(template.replaceByTag(tpl, tagName, value) === tplResult);
          });
      });
      describe("createStringFromTemplate", () => {
          it("has createStringFromTemplate method", () => assert.isOk(typeof (new Template("")).createStringFromTemplate === "function"));
          it("createStringFromTemplate takes 1 param", () => assert.isOk((new Template("")).createStringFromTemplate.length === 1)); 
          it("createStringFromTemplate return string", () => {
              var tpl = "test string";
              var template = new Template(tpl);
              var result = template.createStringFromTemplate({});
              assert.exists(result);
              assert.isOk(typeof result === "string");
          });
          it("createStringFromTemplate is working with empty data", () => {
              var tpl = "{{name}}: My name is {{name}} {{lastName}}";
              var data = {};
              var template = new Template(tpl);                
              var result = template.createStringFromTemplate(data);
              assert.isOk(result === tpl);
          });
          it("createStringFromTemplate is working without data", () => {
              var tpl = "{{name}}: My name is {{name}} {{lastName}}";
              var template = new Template(tpl);                
              var result = template.createStringFromTemplate();
              assert.isOk(result === tpl);
          });
          it("createStringFromTemplate is working", () => {
              var tpl = "{{name}}: My name is {{name}} {{lastName}}";
              var data = {
                  name: "Alex",
                  lastName: "Happy"
              };
              var tplResult = "Alex: My name is Alex Happy";
              var template = new Template(tpl);                
              var result = template.createStringFromTemplate(data);
              assert.isOk(result === tplResult);
          });
          it("createStringFromTemplate leaves not data tags", () => {
              var tpl = "{{name}}: My name is {{name}} {{lastName}}";
              var data = {
                  name: "Alex"
              };
              var tplResult = "Alex: My name is Alex {{lastName}}";
              var template = new Template(tpl);                
              var result = template.createStringFromTemplate(data);
              assert.isOk(result === tplResult);
          });
          it("createStringFromTemplate does not replace extra tags", () => {
              var tpl = "{{name}}: My name is {{name}} {{lastName}}";
              var data = {
                  name: "Alex",
                  lastName: "Happy",
                  age: 20           
              };
              var tplResult = "Alex: My name is Alex Happy";
              var template = new Template(tpl);                
              var result = template.createStringFromTemplate(data);
              assert.isOk(result === tplResult);
          });
          it("createStringFromTemplate does not modified templateString", () => {
              var tpl = "My name is {{name}} {{lastName}}";
              var data = {
                  name: "Alex",
                  lastName: "Happy"      
              };
              var tplResult = "My name is Alex Happy";
              var template = new Template(tpl); 
              assert.isOk(template.templateString === tpl);               
              var result = template.createStringFromTemplate(data);
              assert.isOk(template.templateString === tpl);                               
              assert.isOk(result === tplResult);
          });
      });
  });
  describe("compileTemplate function", () => {
      it("is function", () => assert.isOk(typeof compileTemplate === "function"));
      it("compileTemplate takes 1 param", () => assert.isOk((compileTemplate).length === 1));
      it("compileTemplate returns function", () => assert.isOk(typeof compileTemplate("") === "function"));
      it("compileTemplate returned function takes 2 param", () => assert.isOk(compileTemplate("").length === 2));
      it("compileTemplate insert content to element", () => {
          var content = "My name is Alex";            
          var elem = document.createElement('div');
          var data = {};
          assert.isOk(elem.innerHTML === "");
          compileTemplate(content)(elem, data);
          assert.isOk(elem.innerHTML === content);            
      });
      it("compileTemplate insert new content to element", () => {
          var content = "My name is Alex";            
          var elem = document.createElement('div');
          assert.isOk(elem.innerHTML === "");            
          elem.innerHTML = "some content";
          var data = {};
          assert.isOk(elem.innerHTML === "some content");
          compileTemplate(content)(elem, data);
          assert.isOk(elem.innerHTML === content);            
      });
      it("compileTemplate insert compiled template to element", () => {
          var tpl = "My name is {{name}} {{lastName}}";  
          var result = "My name is Alex Happy";          
          var elem = document.createElement('div');
          var data = {
              name: "Alex",
              lastName: "Happy"
          };
          assert.isOk(elem.innerHTML === "");                        
          compileTemplate(tpl)(elem, data);
          assert.isOk(elem.innerHTML === result);                        
      });
      it("compileTemplate is working with invalid element", () => {
          var tpl = "My name is {{name}} {{lastName}}";
          var data = {
              name: "Alex",
              lastName: "Happy"
          };
          assert.doesNotThrow(compileTemplate(tpl).bind(this, null, data));           
      });
  });
});
