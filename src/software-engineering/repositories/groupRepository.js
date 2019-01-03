import Model from '../models/MySQL'

export default class Group {
    constructor() {
        this.GroupModel = new Model('group')
    }
	
	//取得帳戶的group資訊
    async getGroupByAccountId(id){
		return this.GroupModel.where(this.GroupModel.table,"ID",id);
    }

    //建立group
    async createGroup(data){
		return this.GroupModel.insert(this.GroupModel.table,data);
    }

    //刪除group
    async deleteGroup(data){
		return this.GroupModel.delete_(this.GroupModel.table,"ID",id);//有問題
    }
    
}