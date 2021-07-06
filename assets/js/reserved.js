function OpenResultPopup(result){
  if(result){
    swal({
      title: '予約を取り消しました。',
      type: 'info'
    }).then(function(){
      window.location.reload();
    });
  }else{
    swal({
      title: '取り消せませんでした。',
      text: 'しばらくしてからお試しください',
      type: 'error'
    });
  }
}

function fetchAPIremoveReservation(json){
  fetch(`http://35.75.176.121:3000/api/remove`,{
    method:"POST",
    mode: "cors", // no-cors, cors, *same-origin
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:JSON.stringify({
      json
    })}).then(response => {
          console.log(response.status);
          // エラーレスポンスが返されたことを検知する
          if (!response.ok) {
              console.error("エラーレスポンス", response);
          } else {
              return response.json().then(Data => {
                  console.log(Data);
                  OpenResultPopup(Data["result"]);
              });
          }
      }).catch(error => {
          console.error(error);
      });
  }

function openPupUp(e) {
    /// 要素IDを取得する
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var elemId = elem.id;

    var tableId = elemId.replace("bt", "col");
    let table = document.getElementById(tableId);
    let cell = table.cells;
    var recordNo = cell[1].innerHTML;
    var venue = cell[2].outerHTML;
    var name = cell[3].outerHTML;
    var type = cell[4].outerHTML;
    var department = cell[5].outerHTML;
    var reserveId = elemId.replace("bt", "");
    var json = {
      "reserve_id" : reserveId,
      "record_id" : recordNo
    };
    swal({
          title: '予約を取り消しますか？',
          html: '会場:' + venue + '<br>メンバー:' + name + '<br>種類:' + type + ' ' + department,
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '取り消す'
        }).then(function(){
          fetchAPIremoveReservation(json);
        });
    }
function createTableElement(infos){
  var tbody = document.getElementById("parent");
  for (var i = 0; i < Object.keys(infos).length; i++) {
    var tr = document.createElement("tr");
    tr.id = "col" + infos[i]["record_id"];
    for (key in infos[i]){
      // td要素を生成
      if(key == "user_id"){continue;}
      if(key == "user_code"){continue;}
      var td = document.createElement('td');
      // td要素内にテキストを追加
      td.textContent = infos[i][key];
      // td要素をtr要素の子要素に追加
      if (key == "record_id"){
        td.ClassName = "hidden";
        td.style = "display:none;";
        td.id = "hidden" + [i]["record_id"];
      }
      tr.appendChild(td);
    }
    var btn = document.createElement("td");
    btn.width = 100;
    var input = document.createElement("input");
    input.type = "button";
    input.onclick = new Function("openPupUp();");
    input.id = "bt" + infos[i]["record_id"];
    input.value = "取り消す";
    btn.appendChild(input);
    tr.appendChild(btn);
    tbody.appendChild(tr);
  }
}

function startReservedListCreate(){
fetch(`http://35.75.176.121:3000/api/reserved`)
    .then(response => {
        console.log(response.status);
        // エラーレスポンスが返されたことを検知する
        if (!response.ok) {
            console.error("エラーレスポンス", response);
        } else {
            return response.json().then(Data => {
                console.log(Data);
                createTableElement(Data);
            });
        }
    }).catch(error => {
        console.error(error);
    });
}
