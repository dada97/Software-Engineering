import FriendRepository  from '../repositories/friendRepository.js'


export default class Friend {
    constructor() {
        this.FriendRepository  = new FriendRepository()
    }

    //取得帳戶好友資訊
    async getFriendByAccountId(id){
        const friends = await FriendRepository.getFriendByAccountId(id)
        if(friends == undefined){
            throw 'not found'
        }
        return friends
    }

    //新增好友
    async createFriend(id,data){ 
        let obj ={
            userId: id,
            friendId: data.id 
        }

        await this.FriendRepository.createFriend(obj)
    }

    async deleteFriend(id,data){
        let obj ={
            userId: id,
            friendId: data.id 
        }

        await this.FriendRepository.deleteFriend(obj)
    }
}