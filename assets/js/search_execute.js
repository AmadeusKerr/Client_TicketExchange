function OpenConfirmPopup(isExist){
  if (isExist){
    swal({
        title: '現在取引可能です。',
        text: "すぐに取引しますか？",
        type: 'warning'
    })
    .then(function(){
        var name = document.getElementById("member").value;
        var venue = document.getElementById("venue").value;
        var type = document.getElementById("type").value;
        var department = document.getElementById("department").value;

        var encodeName = encodeURIComponent(name);
        var encodeVenue = encodeURIComponent(venue);
        var encodeType = encodeURIComponent(type);
        var encodeDepartment = encodeURIComponent(department);
        window.location.href = `trade.html?name=${encodeName}&venue=${encodeVenue}&type=${encodeType}&department=${department}`;
    })
  }else{
    swal({
        title: '現在在庫がありません。',
        text: "入荷までしばらくお待ちください",
        type: 'error'
    })
  }
}

function SearchResultAPI(){
    var name = document.getElementById("member").value;
    var venue = document.getElementById("venue").value;
    var type = document.getElementById("type").value;
    var department = document.getElementById("department").value;

    var json = {
        "name" : name,
        "venue" : venue,
        "type" : type,
        "department" : department
    };

    fetch(`http://35.75.176.121:3000/api/search`,{
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
      OpenConfirmPopup(res["result"]);
    }).catch((error) => console.log(error));
  }
