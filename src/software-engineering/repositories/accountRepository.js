import Model from '../models/MySQL'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
    }

    //建立帳戶
    async createAccount(data){
		return this.AccountModel.addAccount(account,password,username,gender);
    }

    //用帳號搜尋帳戶資訊
    async getAccountByAccount(account){
		let accounts = []
		accounts  = await this.AccountModel.where("account",account);
		return accounts[0]
    }


    //用id取得帳戶資訊
    async getAccountById(id){
		return this.AccountModel.where("ID",id);
    }

    //取得全部帳戶資訊
    async getAllAccount(){
		console.log("test");
		return this.AccountModel.select();
    }

    //刪除特定id帳戶
    async deleteAccountById(id){
		return this.AccountModel.delete_("ID",id);
    }

    //更新帳戶資訊
    async update(id,data){
		return this.AccountModel.update(id,data);
    }

    //用userName取得帳戶資訊
    async getAccountByName(name){
		return this.AccountModel.where("username",name);
    }

    //搜尋
    async search(searchName){
		return this.AccountModel.where("username",searchName);
    }

}