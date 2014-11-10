describe("UI", function() {
  it("is defined", function() {
    expect(window.cabinette.UI).toBeDefined();
  });

  it("generates option strings", function(){
    var input = ['foo', 'bar', 'baz'];
    var expected = '<option value="bar">bar</option>\n<option value="baz">baz</option>\n<option value="foo">foo</option>';
    $(cabinette).trigger('populate_finder', {
      values: input,
      complete: function(actual){
        expect(actual).toEq(expected);
      }
    });
  });
});
