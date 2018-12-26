import Model from '../models/MySQL'

export default class Friend {
    constructor() {
        this.FriendModel = new Model('friend')
    }

    //取得帳戶的好友資訊
    async getFriendByAccountId(id){

    }

    //建立好友關係
    async createFriend(data){

    }

    async deleteFriend(id){
        
    }

}