require('./support/helper');

var expect = require("expect.js"),
    generateTemplate = require("./support/generate_template"),
    Backbone = require('../lib/end-dash').Backbone;

require("../lib/template");

describe("Setting a single variable", function() {

  it("should be set in the html", function () {
    var template = generateTemplate({ singleVariable: "this is value" }, '<div class = "singleVariable-"></div>');
    expect($(".singleVariable-").html()).to.be("this is value");
  });

  it("should be set in the html even when nested in other elements", function () {
    var template = generateTemplate({ singleVariable: "this is value" }, '<div><div class = "singleVariable-"></div></div>');
    expect($(".singleVariable-").html()).to.be("this is value");
  });

  it("should overwrite existing content", function () {
    var template = generateTemplate({ singleVariable: "this is value" }, '<div><div class = "singleVariable-">derp</div></div>');
    expect($(".singleVariable-").html()).to.not.be("derp");
  });

  describe("inputs", function() {
      beforeEach(function() {
          this.model = new Backbone.Model({ singleVariable: "this is value" });
          this.template = generateTemplate(this.model, '<div><input class = "singleVariable-" /></div>');
          this.el = $(".singleVariable-");
      });

      it("should set the value on inputs", function(done) {
        var that = this;
        setTimeout(function () {
          expect(that.el.val()).to.be("this is value");
          done();
        }, 0)
      });

      it("should trigger change events on the elements", function(done) {
        this.el.one('change', function () {
            done();
        });
        this.model.set('singleVariable', 'not the other value');
      });
  });


  it("should set the value on select menus when given a string", function(done) {
    generateTemplate({ singleVariable: "false" },
                     '<div>' +
                         '<select class="singleVariable-">' +
                           '<option value="true">Yes</option>' +
                           '<option value="false">No</option>' +
                         '</select>' +
                       '</div>'
                     );

    setTimeout(function () {
      expect($(".singleVariable-").val()).to.be("false");
      done();
    }, 0)
  });

  it("should set the value on select menus when given a boolean", function(done) {
    generateTemplate({ singleVariable: false },
                     '<div>' +
                         '<select class="singleVariable-">' +
                           '<option value="true">Yes</option>' +
                           '<option value="false">No</option>' +
                         '</select>' +
                       '</div>'
                     );
    setTimeout(function () {
      expect($(".singleVariable-").val()).to.be("false");
      done();
    }, 0)
  });
});
