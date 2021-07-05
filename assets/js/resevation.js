function OpenResultPopup(result){
  console.log(result);
  switch (result) {
    case "done":
      swal({
        title: '予約が完了しました。',
        type: 'success'
      });
      break;
    case "already":
      swal({
        title: 'すでに予約済みです。',
        type: 'error'
      });
      break;
    default:
      swal({
        title: '予約が出来ませんでした。',
        text: '時間をおいて再度お試しください',
        type: 'error'
      });
  }
}

  function reservationCallAPI(json){
    fetch(`http://10.0.2.10:3000/api/reserve`,{
      method:"POST",
      mode: "cors", // no-cors, cors, *same-origin
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        json
      })
    }).then((response) => {
      return response.json();
    }).then((res) => {
      console.log(res);
      OpenResultPopup(res["result"]);
    }).catch((error) => console.log(error));
  }

function openPupUp() {
    let venue = document.getElementById('venue').value;
    let name = document.getElementById('member').value;
    let type = document.getElementById('type').value;
    let department = document.getElementById('department').value;
    let trade = document.getElementById("trade").value;
    var json = {
      "name" : name,
      "venue" : venue,
      "type" : type,
      "department" : department
    };
    swal({
            title: '予約しますか？',
            html: '会場：' + venue + '<br>メンバー：' + name + '<br>種類:' + type + ' ' + department + '<br>取引方法:' + trade,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '予約する'
        }).then(function(){
            reservationCallAPI(json);
        });
}
