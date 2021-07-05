// 入力制御
jQuery(document).on('keydown', '.input_number_only', function(e){
  let str = String.fromCharCode(k);
  if(!(str.match(/[0-9]/))){
    return false;
  }
});
jQuery(document).on('keyup', '.input_number_only', function(e){
  this.value = this.value.replace(/[^0-9]+/i,'');
});
jQuery(document).on('blur', '.input_number_only', function(){
  this.value = this.value.replace(/[^0-9]+/i,'');
});
