import FriendRepository  from '../repositories/friendRepository.js'
import RedisService from './redisService.js'
import AccountRepository  from '../repositories/accountRepository.js'

const specID = '1'

export default class Friend {
    constructor() {
        this.FriendRepository  = new FriendRepository()
        this.RedisService = new RedisService()
        this.AccountRepository = new AccountRepository()
    }

    //取得帳戶好友資訊
    async getFriendByAccountToken(id,token){
        const ID = this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'create fail'
        }
        const friends = await this.FriendRepository.getFriendByAccountId(id)
        if(friends == undefined){
            throw 'not found'
        }
        return friends
    }

    //新增好友
    async createFriend(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }

        const account = await this.AccountRepository.getAccountById(id)

        if(account == undefined){
            throw 'not found'
        }

        let obj ={
            userID: ID,
            friendID: id 
        }

        await this.FriendRepository.createFriend(obj)
    }

    async deleteFriend(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'delete error'
        }

        const account = await this.AccountRepository.getAccountById(id)
        if(account == undefined){
            throw 'not found'
        }

        const friends = await this.FriendRepository.getFriendByAccountId(ID)

        for(var i in friends){
            if(friends[i].friendID == id){
                await this.FriendRepository.deleteFriend(friends[i].ID)
                break
            }
        }

        
    }
}