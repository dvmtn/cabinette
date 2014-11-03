describe("App", function() {
  it("is defined", function() {
    expect(window.cabinette.App).toBeDefined();
  });

  it("has a renderer", function(){
    var app = new cabinette.App();
    expect(app.renderer).toBeDefined();
  });

  it("has a reader", function(){
    var app = new cabinette.App();
    expect(app.reader).toBeDefined();
  });
});