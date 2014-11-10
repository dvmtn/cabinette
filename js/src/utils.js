(function(){
  window.cabinette.utils = {
    string_to_id: function(string){
      return string
        .toLowerCase()
        .trim()
        .replace(/ /g,'_')
        .replace(/&/g,'and');
    }
  };
}());
