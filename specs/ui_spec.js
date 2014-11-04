describe("UI", function() {
  it("is defined", function() {
    expect(window.cabinette.UI).toBeDefined();
  });

  it("generates option strings", function(){
    var input = ['foo', 'bar', 'baz'];
    var expected = '<option value="foo">foo</option>\n<option value="bar">bar</option>\n<option value="bar">bar</option>';
    $(cabinette).trigger('populate_finder', {
      values: input,
      complete: function(actual){
        expect(actual).toEq(expected);
      }
    });
  });
});