function UserConfig(name, pwd){
  this.username = name; 
  this.password = pwd;

  var date = new Date();
  var initId = date.getFullYear()
          +'-'+(date.getMonth()+1)
          +'-'+date.getDate()
          +' '+date.getHours()
          +':'+date.getMinutes()
          +':'+date.getSeconds();

  this.bill = {
    "lastBill": {
      "id": initId,
      "type": "expend",
      "class": "101",
      "money": "",
      "comment": ""
    },
    "years": [
      {
        "year": "",
        "totalExpend": "0",
        "totalIncome": "0",
        "monthes": [
          {
            "month": "",
            "totalExpend": "0",
            "totalIncome": "0",
            "days": [
              {
                "day": "",
                "totalExpend": "",
                "totalIncome": "",
                "bill": [
                  {
                    "id": initId,
                    "type": "expend",
                    "class": "101",
                    "money": "",
                    "comment": "" 
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

module.exports =  UserConfig;