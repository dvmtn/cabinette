(function(){
  window.cabinette.UI = function(){
    var find = function(event){
      var company_name = $(event.currentTarget).val();
      $(cabinette).trigger('sort', company_name);
    };

    //TODO: Make this a util
    var string_to_id = function(string){
      string.toLowerCase()
        .trim()
        .replace(/ /g,'_')
        .replace(/&/g,'and');
    };

    var value_to_option = function(value){
      return '<option value="' + string_to_id(value) + '">' + value + '</option>';
    };

    var populate_finder = function(event, options){
      options_string = _.map(options.data, value_to_option).join("\n");
      $('.finder').html(options_string);
      options.complete(options_string);
    };

    $('body').on({
      change: find
    }, '.finder');

    $(cabinette).on('populate_finder', populate_finder);
  };
}());
