var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port:3306,
  database : 'mydb'
});
function addAccount(account,password,username,gender){
	var myDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
	var sql = "INSERT INTO account (account,password,username,gender,createtime) VALUES ('"+account+"','"+password+"','"+username+"','"+gender+"','"+myDate+"')";
		con.query(sql, function (err, result) {
    if (err) throw err;
		console.log("1 record inserted");
  });
}
function select(){
	 con.query("SELECT * FROM account", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

function where(col_name,account){
	con.query("SELECT * FROM account WHERE " +col_name +" = '"+account+"'", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}
function delete_(col_name,account){
	con.query("DELETE FROM account WHERE " +col_name +" = '"+account+"'", function (err, result) {
		console.log("delete one record");
    if (err) throw err;
    console.log(result);
  });
}
function update(col_name,oldarg,newarg){
	
	var sql = "UPDATE account SET "+col_name+" = '"+newarg+"' WHERE "+col_name+" = '"+oldarg+"'";
	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
	
}
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
	addAccount("dada99","1234","tyd","M");
  select();
  //insert();
  //select();
  //where("account_name",'dada97');
  //delete_("account_name",'dada97');
 // update("account_name",'dada98','dada97');
  
  
  
	//var sql = "INSERT INTO user_friend (ID,user_Account,user_friendAccount) VALUES (null,'dada93','dada97')"
  // con.query(sql, function (err, result) {
   // if (err) throw err;
   // console.log("1 record inserted");
  con.end();
  });
     
//});