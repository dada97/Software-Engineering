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
    async getFriendByAccountToken(token){
      
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'create fail'
        }
        console.log(ID)
        const friends = await this.FriendRepository.getFriendByAccountId(ID)
        if(friends == undefined){
            throw 'not found'
        }
        let obj = []
        for(var i in friends){
            let t ={

            }
            t.ID = friends[i].friendID
            var account  = await this.AccountRepository.getAccountById(t.ID)
            t.username = account.username
            obj.push(t)
            
        }
        console.log(obj)
        return obj
    }

    //新增好友
    async createFriend(id,token){
       console.log("test")
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }

        const account = await this.AccountRepository.getAccountById(id)

        if(account == undefined){
            throw 'not found'
        }

        if(id == ID){
            throw 'create fail'
        }

        const friends = await this.FriendRepository.getFriendByAccountId(ID)


        for(var i in friends){
            if(friends[i].friendID == id){
                throw 'create fail'
            }
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