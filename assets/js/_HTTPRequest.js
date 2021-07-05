<script type="text/javascript">
function GetAPI(api, callback) {
  var url = "http://3000:api/test";
  var request = createXMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      //受信完了時の処理
      callback();
    }
  }
  request.send("");
}
</script>