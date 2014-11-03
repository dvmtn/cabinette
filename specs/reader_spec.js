describe("Reader", function() {
  it("is defined", function() {
    expect(window.cabinette.Reader).toBeDefined();
  });

  it("calls $.getJSON", function(){
    var sample_json = { foo:'bar' };
    spyOn($,'getJSON').and.returnValue(sample_json);
    var callback = function(returned_json){
      expect(returned_json).toEq(sample_json);
    };
    $(cabinette).trigger('fetch_json', callback);
  });
});