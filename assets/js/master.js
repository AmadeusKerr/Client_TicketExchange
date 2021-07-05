
var Master = class{
  constructor(data){
    this.member_master = data["member_master"];
    this.venue_master = data["venue_master"];
    this.type_master = data["type_master"];
    this.department_master = data["department_master"];
  }
  GetMasterInfosALL(){
    return this.data;
  }
  GetVenueMaster(){
    return this.venue_master;
  }
  GetMemberMaster(){
    return this.member_master;
  }
}

fetch('http://10.0.2.10:3000/api/master_data')
    .then(response => {
        if (!response.ok) {
            console.error("エラーレスポンス", response);
        } else {
            return response.json().then(infos => {
                master = new Master(infos);
                console.log(infos);
            });
        }
    }).catch(error => {
        // エラー処理
    });
