(function(){
  window.cabinette.UI = function(){
    var find = function(event){
      var company_name = $(event.currentTarget).val();
      $(cabinette).trigger('sort', company_name);
    };

    var value_to_option = function(value){
      return '<option value="' + value + '">' + value + '</option>';
    };

    var populate_finder = function(event, options){
      options_string = _.map(options.data, value_to_option).join("\n");
      $('.finder').html(options_string);
      options.complete(options_string);
    };

    $('body').on({
      change: find
    }, '.finder');

    //TODO: Make the finder a Chosen
    //$(".finder").chosen();

    $(cabinette).on('populate_finder', populate_finder);
  };
}());
