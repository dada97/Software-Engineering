import Model from '../models/MySQL'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account_table')
    }

    //建立帳戶
    async createAccount(data){
		return await this.AccountModel.insert(this.AccountModel.table,data);
    }

    //用帳號搜尋帳戶資訊
    async getAccountByAccount(account){
		let accounts = []
    accounts  = await this.AccountModel.where(this.AccountModel.table,"account",account);
		return accounts[0]
    }


    //用id取得帳戶資訊
    async getAccountById(id){
    let accounts = []
    accounts = await  this.AccountModel.where(this.AccountModel.table,"ID",id);
     return accounts[0]
    }

    //取得全部帳戶資訊
    async getAllAccount(){
		return await this.AccountModel.select(this.AccountModel.table);
    }

    //刪除特定id帳戶
    async deleteAccountById(id){
		return await this.AccountModel.delete_(this.AccountModel.table,"ID",id);
    }

    //更新帳戶資訊
    async update(id,data){
		return await this.AccountModel.update(this.AccountModel.table,id,data);
    }

    //用userName取得帳戶資訊
    async getAccountByName(name){
    
		return await this.AccountModel.where(this.AccountModel.table,"username",name);
    }

    //搜尋
    async search(searchName){
		return await this.AccountModel.where(this.AccountModel.table,"username",searchName);
    }

}