function OpenResultPopup(isSuccess){
  if(isSuccess){
    swal({
            title: '登録が完了しました。',
            type: 'success'
    });
  }
  else{
    swal({
            title: '登録できませんでした。',
            type: 'error'
    });
  }
}

function ResisterExecuteAPI(json){
  fetch(`http://35.75.176.121:3000/api/resister`,{
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
function openPupUp() {
    let venue = document.getElementById('venue').value;
    let name = document.getElementById('member').value;
    let type = document.getElementById('type').value;
    let department = document.getElementById('department').value;
    let amount = document.getElementById('amount').value;
    let userId = localStorage["user_id"];
    var jsonData = {
        "user_id" : userId,
        "name" : name,
        "venue" : venue,
        "type" : type,
        "department" : department,
        "amount" : amount
    };
    if(amount == ""){
        amount = 0;
        swal({
            title:"枚数を入力してください。",
            type:"error"
        });
        return;
    }
    swal({
            title: '登録しますか？',
            html: '会場：' + venue + '<br>メンバー：'+ name + '<br>種類:' + type + '<br>' + department + ' ' + amount + '枚',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '登録する'
        }).then(function(){
          ResisterExecuteAPI(jsonData);
        });
}
