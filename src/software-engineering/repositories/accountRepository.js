import Model from '../models/MySQL'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
    }

    //建立帳戶
    async createAccount(data){

    }

    //用帳號搜尋帳戶資訊
    async getAccountByAccount(account){
        
    }

    //用id取得帳戶資訊
    async getAccountById(id){

    }

    //取得全部帳戶資訊
    async getAllAccounts(){

    }

    //刪除特定id帳戶
    async deleteAccountById(id){

    }

    //更新帳戶資訊
    async update(id,data){

    }

}