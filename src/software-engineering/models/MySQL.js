var mysql = require('mysql');

export default class Model {
    constructor(table){
        this.table =table;
		this.connection= mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		port:3306,
		database : 'mydb'
		});
    }


addAccount(account,password,username,gender){
	this.connection.connect(function(err) {
		console.log("db connected");
	var myDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
	var sql = "INSERT INTO account (account,password,username,gender,createtime) VALUES ('"+account+"','"+password+"','"+username+"','"+gender+"','"+myDate+"')";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
			this.connection.end();
			return result;
		});
		
		this.connection.end();
	});
}

select(){
	this.connection.connect(function(err) {
		console.log("db connected");
		con.query("SELECT * FROM account_table", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			this.connection.end();
			return result;
		});
		
		this.connection.end();
		
	});
}

where(col_name,target){
	this.connection.connect(function(err) {
		console.log("db connected");
		con.query("SELECT * FROM account_table WHERE " +col_name +" = '"+target+"'", function (err, result) {
			if (err) throw err;
			console.log(result);
			this.connection.end();
			return result;
		});
		
		this.connection.end();
	});
}
delete_(col_name,target){
	this.connection.connect(function(err) {
		console.log("db connected");
		con.query("DELETE FROM account_table WHERE " +col_name +" = '"+target+"'", function (err, result) {	
			if (err) throw err;
			console.log("delete one record");
			this.connection.end();
			return result;
		});
		
		this.connection.end();
	});
}

update(id,data){
	this.connection.connect(function(err) {
		console.log("db connected");
		//var sql = "UPDATE account_table SET password = '"+data.password+"', username = ‘"+data.username+"',gender = '"+data.gender+"' WHERE id = "+id;
		con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result.affectedRows + " record(s) updated");
		this.connection.end();
		return result;
		});
		this.connection.end();
	});
	
}

}