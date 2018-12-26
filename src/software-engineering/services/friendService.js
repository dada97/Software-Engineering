import FriendRepository  from '../repositories/friendRepository.js'
import AccountRepository from '../repositories/accountRepository.js'

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
        //雙向連結
        await this.FriendRepository.createFriend(obj)
        obj.userId = data.id
        obj.friendId =  id
        await this.FriendRepository.createFriend(obj)
    }
}