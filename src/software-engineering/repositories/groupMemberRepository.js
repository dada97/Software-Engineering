import Model from '../models/MySQL'

export default class Group {
    constructor() {
        this.GroupMemberModel = new Model('groupmember')
    }
	
	async getGroupMemberByGroupID(id){
        return await this.GroupMemberModel.where(this.GroupMemberModel.table,"groupID",id);
    }

    async getGrounpByAccountId(id){
        console.log(id)
        return await this.GroupMemberModel.where(this.GroupMemberModel.table,"memberID",id);
      }

    async join(data){
        console.log(data)
        return await this.GroupMemberModel.insert(this.GroupMemberModel.table,data);
    }

    async quit(id){
        return await this.GroupMemberModel.delete_(this.GroupMemberModel.table,"ID",id);
    }
    
}