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



async insert(table,data){
	return new Promise((resolve, reject) => {
		this.connection.getConnection(function(err,con) {
			
			console.log("db connected");
		var sql="INSERT INTO "+table+" ("
			var keys = Object.keys(data);
			for(var i=0;i<keys.length;i++){
				sql+=keys[i];
				if(i<keys.length-1)
					sql+=","
			}
			sql+=") VALUES ("
			for(var i=0;i<keys.length;i++){
				sql+="'"+data[keys[i]]+"'"
				if(i<keys.length-1)
					sql+=","
			}
			sql+=")"
		
			con.query(sql, function (err, result) {
				
			if (result == undefined) {
				reject()
				return				
			}		
			console.log("1 record inserted");
			
			resolve(result);
			});
		con.release();
		})
		
	})
}

async select(table){
	return new Promise((resolve, reject) => {
		this.connection.getConnection(function(err,con) {
			console.log("db connected");
			con.query("SELECT * FROM "+table, function (err, result) {
			
			if (result == undefined) {
				reject()
				return				
			}
			console.log("return all data");
			
			resolve(result);
			});
		con.release();
		});
	});
}

async where(table,col_name,target){

	return new Promise((resolve, reject) => {

		this.connection.getConnection(function(err,con) {
			console.log("db connected");
			console.log(table+" "+col_name);
			con.query("SELECT * FROM "+table+" WHERE " +col_name +" = '"+target+"'", function (err, result) {
			if (result == undefined) {
				reject()
				return				
			}
			console.log("found");
			resolve(result);
			});	
		con.release();
		});
	});
}

async delete_(table,col_name,target){
	return new Promise((resolve, reject) => {
	this.connection.getConnection(function(err,con) {
			console.log("db connected");
			con.query("DELETE FROM "+table+" WHERE " +col_name +" = '"+target+"'", function (err, result) {	
			if (result == undefined) {
				reject()
				return				
			}
			console.log("delete one record");
			resolve(result);
			});
		con.release();
		});
	});
}

async update(table,id,data){
	return new Promise((resolve, reject) => {
	this.connection.getConnection(function(err,con) {
			console.log("db connected");
			var sql="UPDATE "+table+" SET "
			var keys = Object.keys(data);
			for(var i=0;i<keys.length;i++){
				if(data[keys[i]]==null)
					sql+=keys[i]+" = '"+data[keys[i]]+"'";
				else
					sql+=keys[i]+" = "+data[keys[i]];
				if(i<keys.length-1)
					sql+=", "
			}
			sql+=" WHERE ID = '"+id+"'";
			console.log(sql);
			con.query(sql, function (err, result) {
			if (result == undefined) {
				console.log("reject")
				reject()
				return				
			}	
			console.log("record(s) updated");
			resolve(result);
			});		
		con.release();
		});

	});
	
}

}