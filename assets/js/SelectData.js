function CreateVenueSelect(infos){
  var venue_parent = document.getElementById("venue");
  const VenueKeyName = "Venue_STR";

  for (var i = 0; i < Object.keys(infos).length; i++){
    for (key in infos[i]){
      if (key == VenueKeyName){
        var option = document.createElement('option');
        option.textContent = infos[i][key];
        venue_parent.appendChild(option);
      }
    }
  }
}

function CreateMemberSelect(infos){
  var member_parent = document.getElementById("member");
  const MemberKeyName = "name";
  for (var i = 0; i < Object.keys(infos).length; i++){
    for (key in infos[i]){
      if (key == MemberKeyName){
        var option = document.createElement('option');
        option.textContent = infos[i][key];
        member_parent.appendChild(option);
      }
    }
  }
}

function CreateTypeSelect(infos){
  var type_parent = document.getElementById("type");
  const TypeKeyName = "Type_STR";
  for (var i = 0; i < Object.keys(infos).length; i++){
    for (key in infos[i]){
      if (key == TypeKeyName){
        var option = document.createElement('option');
        option.textContent = infos[i][key];
        type_parent.appendChild(option);
      }
    }
  }
}

function CreateDepartmentSelect(infos){
  var department_parent = document.getElementById("department");
  const DepartmentKeyName = "Department_STR";
  for (var i = 0; i < Object.keys(infos).length; i++){
    for (key in infos[i]){
      if (key == DepartmentKeyName){
        var option = document.createElement('option');
        option.textContent = infos[i][key];
        department_parent.appendChild(option);
      }
    }
  }
}

function SetSelectData(){
  fetch('http://35.75.176.121:3000/api/master_data')
      .then(response => {
          if (!response.ok) {
              console.error("エラーレスポンス", response);
          } else {
              return response.json().then(infos => {
                  console.log(infos);
                  var member_master = infos["member_master"];
                  var venue_master = infos["venue_master"];
                  var type_master = infos["type_master"];
                  var department_master = infos["department_master"]
                  CreateVenueSelect(venue_master);
                  CreateMemberSelect(member_master);
                  CreateTypeSelect(type_master);
                  CreateDepartmentSelect(department_master);
              });
          }
      }).catch(error => {
          // エラー処理
      });
}
