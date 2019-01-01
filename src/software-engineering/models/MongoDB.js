
export default class Model {
    constructor(table){
        this.table =table;
		this.client= require('mongodb').MongoClient;
		this.url="mongodb://localhost:27017/mydb"
    }



async insert(table,data){
	return new Promise((resolve, reject) => {
		this.client.connect(this.url,function(err,db) {
			console.log("db connected");
			var dbo = db.db("mydb")
			dbo.collection(table).insertOne(data, function(err, result) {
			if (result == undefined) {
				reject()
				return				
			}		
			console.log("1 record inserted");
			
			resolve(result);
			});
			db.close();
		})
		
	})
}

async select(table){
	return new Promise((resolve, reject) => {
		this.client.connect(this.url,function(err,db) {
			console.log("db connected");
			var dbo = db.db("mydb")
			dbo.collection(table). find({}).toArray(function(err, result) {
			if (result == undefined) {
				reject()
				return				
			}		
			console.log("return all data");
			resolve(result);
			});
			db.close();
		});
	});
}

async where(table,col_name,target){
	if(col_name=="ID")
		col_name="_id"
	var wherestr={};
		wherestr[col_name]=target
	return new Promise((resolve, reject) => {
		this.client.connect(this.url,function(err,db) {
			var wherestr={};
			wherestr[col_name]=target;
			console.log("db connected");
			var dbo = db.db("mydb");
			dbo.collection(table).find(wherestr).toArray(function(err, result) {
			if (result == undefined) {
					reject()
					return				
			}		
			console.log("found");
			resolve(result);
			});
			db.close();
		});
	});
}


async delete_(table,col_name,target){
	return new Promise((resolve, reject) => {
		this.client.connect(this.url,function(err,db) {
			var wherestr={};
			wherestr[col_name]=target;
			console.log("db connected");
			var dbo = db.db("mydb");
			dbo.collection(table).deleteOne(wherestr, function(err, result) {
			if (result == undefined) {
					reject()
					return				
			}			
			console.log("delete one record");
			resolve(result);
			});
			db.close();
		});
	});
}

async update(id,data){
	return new Promise((resolve, reject) => {
		this.client.connect(this.url,function(err,db) {
			console.log("db connected");
			var dbo = db.db("mydb");
			
			var wherestr={_id:id};
			var updateStr = {$set:data};
			dbo.collection(table).updateOne(wherestr, updateStr, function(err, res) {
			if (result == undefined) {
					reject()
					return				
			}
			console.log("record(s) updated");	
			resolve(result);
			});
			db.close();
		});

	});
	
}

}
