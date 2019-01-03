import Model from '../models/MySQL'

export default class Group {
    constructor() {
        this.GroupModel = new Model('group')
    }
  
    async getGroupById(id){
      return await this.GroupModel.where(this.GroupModel.table,"ID",id);
    }

    //建立group
    async createGroup(data){
		  return await this.GroupModel.insert(this.GroupModel.table,data);
    }

    //刪除group
    async deleteGroup(id){
		  return await this.GroupModel.delete_(this.GroupModel.table,"ID",id);
    }

    async getGroupByName(name){
      return await this.GroupModel.where(this.GroupModel.table,"groupname",name);
    }

    async update(id,data){
      return await this.GroupModel.update(this.GroupModel.table,id,data);
    }

    async search(name){
      return await this.GroupModel.where(this.GroupModel.table,"groupname",name);
    }

    async getAllGroup(){
      return await this.GroupModel.select(this.GroupModel.table);
    }

    
}