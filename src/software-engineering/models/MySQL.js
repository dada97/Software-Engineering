var mysql = require('mysql');

export default class Model {
    constructor(table){
        this.table =table;
		this.connection= mysql.createPool({
		host: "localhost",
		user: "root",
		password: "1234",
		port:3306,
		database : 'mydb',
		 queueLimit : 0, 
		connectionLimit : 0 
		});
    }


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
	});
	
}

}