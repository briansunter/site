
var options = {
  container:'jsmind_container',
  theme:'orange',
  editable:true
};
var jm = new jsMind(options);

function open_freemind(url) {
  fetch(url).then(r => r.text()).then((freemind_data) => {
    if(freemind_data){
      var mind_name = 'test';
      if(/.*\.mm$/.test(mind_name)){
        mind_name = freemind_name.substring(0,freemind_name.length-3);
      }
      var mind = {
        "meta":{
          "name":mind_name,
          "author":"briansunter",
          "version":"1.0.1"
        },
        "format":"freemind",
        "data":freemind_data
      };
      jm.show(mind);
    }else{
      prompt_info('can not open this file as mindmap');
    }
  }).catch(console.log);
}
