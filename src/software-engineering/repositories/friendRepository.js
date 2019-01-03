import Model from '../models/MySQL'

export default class Friend {
    constructor() {
        this.FriendModel = new Model('friend')
    }

    //取得帳戶的好友資訊
    async getFriendByAccountId(id){
		  return await this.FriendModel.where(this.FriendModel.table,"userID",id);
    }

    //建立好友關係
    async createFriend(data){
		  return await this.FriendModel.insert(this.FriendModel.table,data);
    }

    //刪除好友關係
    async deleteFriend(id){
		  return await this.FriendModel.delete_(this.FriendModel.table,"ID",id);
    }

}