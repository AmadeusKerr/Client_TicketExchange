var Jsons = class{
  constructor(infos){
    this.infos = infos;
  }
  getInfos(){
    return this.infos;
  }
}
var jsons;
fetch('http://35.75.176.121:3000/api/stock')
    .then(response => {
        if (!response.ok) {
            console.error("エラーレスポンス", response);
        } else {
            return response.json().then(infos => {
                jsons = new Jsons(infos);
                console.log(infos);
            });
        }
    }).catch(error => {
        // エラー処理
    });

  function CreateTable(infos, number){
    var tbody = document.createElement("tbody");
    tbody.className = "venue" + number;
    for (var i = 0; i < Object.keys(infos).length; i++) {
      var tr = document.createElement("tr");
      tr.id = "col" + (i + 1);

      for (key in infos[i]){
        // td要素を生成
        if(key == "venue"){continue;}
        var td = document.createElement('td');
        // td要素内にテキストを追加
        td.textContent = infos[i][key];
        // td要素をtr要素の子要素に追加
        tr.appendChild(td);
      }
      var btn = document.createElement("td");
      btn.width = 100;
      var input = document.createElement("input");
      input.type = "button";
      input.onclick = new Function("openPupUp();");
      input.id = "btn" + (i + 1);
      input.value = "取引する";
      btn.appendChild(input);
      tr.appendChild(btn);
      tbody.appendChild(tr);
    }

    return tbody;
  }

function CreateElements(data, parent){
  for (var i = 0; i < Object.keys(data).length; i++) {
    var header = document.createElement('div');
    header.className = "col-md-12";
    var card = document.createElement("div");
    card.className = "card";
    header.appendChild(card);
    var head = document.createElement("div")
    head.className = "header";
    var title = document.createElement("h4");
    title.className= "title";
    title.textContent = "シングル発売記念イベント"
    var p = document.createElement("p");
    p.id = "venue";
    p.className ="category";
    p.textContent = data["venue" + (i + 1)][0]["venue"]; // 取れてない？
    head.appendChild(title);
    head.appendChild(p);
    card.appendChild(head);
    var divContent = document.createElement("div")
    divContent.className = "content table-responsive table-full-width";
    card.appendChild(divContent);

    var table = document.createElement("table");
    table.className = "table table-hover table-striped";
    table.id = "table";

    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.textContent = "ID";
    var thName = document.createElement("th");
    thName.textContent = "Name";
    var thType = document.createElement("th");
    thType.textContent = "Type";
    var thDepartment = document.createElement("th");
    thDepartment.textContent = "部"
    var thAmount = document.createElement("th");
    thAmount.textContent = "枚数"
    thead.appendChild(thId);
    thead.appendChild(thName);
    thead.appendChild(thType);
    thead.appendChild(thDepartment);
    thead.appendChild(thAmount);

    divContent.appendChild(table);
    table.appendChild(thead)
    var tbody = CreateTable(data["venue" + (i + 1)],(i +1));
    table.appendChild(tbody);
    parent.appendChild(header)
    console.log(header);
  }
}

function DataShape(infos){
  var jsonData = JSON.stringify(infos);
  var datainfo = []
  var datainfos = [[]]
  var currentVenue ="";
  var count = 1;
  for (var i = 0; i < Object.keys(infos).length; i++) {
    if (i == 0){
      currentVenue = infos[i]["venue"];
    }
    if(currentVenue == infos[i]["venue"]){
      datainfo.push(infos[i]);
    }else{
      datainfos["venue" + count] = datainfo;
      datainfo = []
      currentVenue = infos[i]["venue"];
      count ++;
    }
    if(Object.keys(infos).length - 1 == i){
      datainfos["venue" + count] = datainfo;
    }
  }
  delete datainfos[0];
  console.log(datainfos)
  return datainfos;
}

function CreateElement(){
  infos = jsons.getInfos();
  var data = DataShape(infos);
  var parent = document.getElementById("parent");
  CreateElements(data, parent);
}

function openPupUp(e) {
    /// 要素IDを取得する
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var elemId = elem.id;

    var tableId = elemId.replace("btn", "col");
    let table = document.getElementById(tableId);
    let cell = table.cells;
    var name = cell[1].innerText;
    var venue = document.getElementById("venue").innerText;
    var type = cell[2].innerText;
    var department = cell[3].innerText;
    // SetValue(name, venue, type, department);
    swal({
            title: '取引画面に異動しますか？',
            html: `会場:${venue}<br>メンバー:${name} 種類:${type}`,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '移動する'
        }).then(function(){
            swal({
                title: '移動します',
                type: 'info'
            }).then(function(){
                var encodeName = encodeURIComponent(name);
                var encodeVenue = encodeURIComponent(venue);
                var encodeType = encodeURIComponent(type);
                var encodeDepartment = encodeURIComponent(department);
                window.location.href = `trade.html?name=${encodeName}&venue=${encodeVenue}&type=${encodeType}&department=${department}`;
            });
        });
}
