var mysql = require('mysql');

export default class Model {
    constructor(table){
        this.table =table;
<<<<<<< HEAD
		this.connection= mysql.createConnection({
=======
		this.connection= mysql.createPool({
>>>>>>> d310ce85845d81c570078b574da9e98ca07399f7
		host: "localhost",
		user: "root",
		password: "1234",
		port:3306,
<<<<<<< HEAD
		database : 'mydb'
=======
		database : 'mydb',
		 queueLimit : 0, 
		connectionLimit : 0 
>>>>>>> d310ce85845d81c570078b574da9e98ca07399f7
		});
    }


<<<<<<< HEAD
 addAccount(account,password,username,gender){
	this.connection.connect(function(err) {
	var myDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
	var sql = "INSERT INTO account (account,password,username,gender,createtime) VALUES ('"+account+"','"+password+"','"+username+"','"+gender+"','"+myDate+"')";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		this.connection.end();
	});
}


select(){
	this.connection.connect(function(err) {
		con.query("SELECT * FROM account_table", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
		});
		this.connection.end();
	});
}

where(col_name,target){
	this.connection.connect(function(err) {
		con.query("SELECT * FROM account_table WHERE " +col_name +" = '"+target+"'", function (err, result) {
			if (err) throw err;
			console.log(result);
		});
		this.connection.end();
	});
}
delete_(col_name,target){
	this.connection.connect(function(err) {
		con.query("DELETE FROM account_table WHERE " +col_name +" = '"+target+"'", function (err, result) {	
			if (err) throw err;
			console.log("delete one record");
		});
		this.connection.end();
	});
}

update(col_name,oldarg,newarg){
	this.connection.connect(function(err) {
		var sql = "UPDATE account_table SET "+col_name+" = '"+newarg+"' WHERE "+col_name+" = '"+oldarg+"'";
		con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result.affectedRows + " record(s) updated");
		});
		this.connection.end();
=======
async addAccount(account,password,username,gender){
	return new Promise((resolve, reject) => {
		this.connection.getConnection(function(err,con) {
			console.log("db connected");
			var myDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
			var sql = "INSERT INTO account (accountname,password,username,gender,createtime) VALUES ('"+account+"','"+password+"','"+username+"','"+gender+"','"+myDate+"')";
			con.query(sql, function (err, result) {
				
			if (result == undefined) {
				reject()
				return				
			}		
			console.log("1 record inserted");
			
			resolve(result[0]);
			});
		con.release();
		})
		
	})
}

async select(){
	return new Promise((resolve, reject) => {
		this.connection.getConnection(function(err,con) {
			console.log("db connected");
			con.query("SELECT * FROM account_table", function (err, result) {
			
			if (result == undefined) {
				reject()
				return				
			}
			console.log("return all data");
			resolve(result[0]);
			});
		con.release();
		});
	});
}

async where(col_name,target){
	return new Promise((resolve, reject) => {
		this.connection.getConnection(function(err,con) {
			console.log("db connected");
			con.query("SELECT * FROM account WHERE " +col_name +" = '"+target+"'", function (err, result) {
			if (result == undefined) {
				reject()
				return				
			}
			console.log("found");	
			resolve(result[0]);
			});	
		con.release();
		});
	});
}

async delete_(col_name,target){
	return new Promise((resolve, reject) => {
	this.connection.getConnection(function(err,con) {
			console.log("db connected");
			con.query("DELETE FROM account_table WHERE " +col_name +" = '"+target+"'", function (err, result) {	
			if (result == undefined) {
				reject()
				return				
			}
			console.log("delete one record");
			resolve(result[0]);
			});
		con.release();
		});
	});
}

async update(id,data){
	return new Promise((resolve, reject) => {
	this.connection.getConnection(function(err,con) {
			console.log("db connected");
			var sql = "UPDATE account_table SET password = '"+data.password+"', username = ‘"+data.username+"',gender = '"+data.gender+"' WHERE id = "+id;
			con.query(sql, function (err, result) {
			if (result == undefined) {
				reject()
				return				
			}	
			console.log("record(s) updated");
			resolve(result[0]);
			});		
		con.release();
		});
>>>>>>> d310ce85845d81c570078b574da9e98ca07399f7
	});
	
}

}