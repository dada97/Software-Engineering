import Model from '../models/MySQL'

export default class Group {
    constructor() {
        this.GroupModel = new Model('group')
    }
	
	//取得帳戶的好友資訊
    async getGroupByAccountId(id){
		return this.GroupModel.where(this.GroupModel.table,"ID",id);
    }

    //建立好友關係
    async createGroup(data){
		return this.GroupModel.insert(this.GroupModel.table,data);
    }

    //刪除好友關係
    async deleteGroup(data){
		return this.GroupModel.delete_(this.GroupModel.table,"ID",id);//有問題
    }
    
}