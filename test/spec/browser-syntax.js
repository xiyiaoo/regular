var Regular = require_lib("index.js");

void function(){
  function destroy(component, container){
    component.destroy();
    expect(container.innerHTML).to.equal('');
  }

  describe("config", function(){
    var container = document.createElement("div");

    after(function() {
      Regular.config({
        END: '}',
        BEGIN: '{'
      })
    });

    it("END and BEGIN can accpet '[' and ']'", function(){


      Regular.config({
        END: ']',
        BEGIN: '['
      })

      var component = new Regular({
        template: "<p>[{a:1}['a']][a]</p>",
        data: {a:1}
      }).$inject( container );

      expect(nes.one("p",container).innerHTML).to.equal('11');
      destroy(component, container)
    })
    it("END and BEGIN can accpet '{' and '}'", function(){


      Regular.config({
        END: '}',
        BEGIN: '{'
      })
      var component = new Regular({
        template: '<div><ul><li><a href=\"#/knowledge/add\">åˆ›å»º</a></li></ul><table><tbody>{#list list as x}<tr><td><input type=\"checkbox\" value=\"{x.id}\"></td><td>{x.name}</td><td>{x.creator}</td><td>{x.create_time}</td></tr>{/list}</tbody></table></div>',
        data: {list: [{name: 1, creator: 2, create_time: 100, id:100 },{name: 2, creator: 2, create_time: 200, id:100},{name: 3, creator: 2, create_time: 300, id:100}]}
      }).$inject(container);


      expect(nes.all("tr",container).length,container).to.equal(3);
      destroy(component, container)
    })

    it("custom END and BEGIN should also affect string-interplation", function(){


      Regular.config({
        END: '}',
        BEGIN: '{'
      })
      var component = new Regular({
        template: '<div title="{title}1"  on-click={title="2"} on-click={content=2} on-click={ this.nest({param: {title: title}}) }>{content}</div>',
        data: {title: "1", content: "1"},
        nest: function(option){
          this.data.param = option.param;
        }
      }).$inject(container);


      var div = nes.one("div",container);
      expect(div.title).to.equal("11");
      expect(div.innerHTML).to.equal("1");
      dispatchMockEvent(div, 'click');

      expect(div.title).to.equal("21");
      expect(div.innerHTML).to.equal("2");

      expect(component.data.param).to.eql({title: "2"})

      destroy(component, container)
    })
    it("END and BEGIN can accpet '[[' and ']]'", function(){

      Regular.config({
        END: ']]',
        BEGIN: '[['
      })

      var component = new Regular({
        template: "<p>[[ {a:1}['a'] ]]</p>",
        data: {a:1}
      }).$inject( container );

      expect(nes.one("p",container).innerHTML).to.equal('1');
      destroy(component, container)
    })
    it("END and BEGIN can accpet '{{{' and '}}}'", function(){

      Regular.config({
        END: '}}}',
        BEGIN: '{{{'
      })

      var component = new Regular({
        template: "<p>{{{ {a:1}['a'] }}}</p>"
      }).$inject( container );

      expect(nes.one("p",container).innerHTML).to.equal('1');
      destroy(component, container)
    })
  })

  describe("Interplation", function(){
    var container = document.createElement("div");

    it("deep undefined shouldn't throw a xx of undefined error", function(){

      var component = new Regular({
        template: "{{}}"
      }).$inject(container);
    })
  })

}()