import FriendService from '../services/friendService.js'

export default class Friend {
    constructor() {
        this.FriendService = new FriendService()

        this.getFriendByAccountToken = this.getFriendByAccountToken.bind(this)
        this.createFriend = this.createFriend.bind(this)
        this.deleteFriend = this.deleteFriend.bind(this)
    }
   
    //取得帳戶的好友資訊
    async getFriendByAccountToken(req,res){
        try{
            res.status(200).json({friends: await this.FriendService.getFriendByAccountToken(req.params.id,req.header.authorization)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //新增好友
    async createFriend(req,res){
        console.log("test")
        try{
            await this.FriendService.createFriend(req.params.id,req.header.authorization)
            res.status(200).json({succeed: "create succeed"})
        }catch(e){
            console.log(e)
            res.status(400).json({error:'create fail'})
        }
    }

    //刪除好友
    async deleteFriend(req,res){
        try{
            await this.FriendService.deleteFriend(req.params.id,req.header.authorization)
            res.status(200).json({succeed: 'delete succeed'})
        }catch(e){
            res.status(400).json({error:'delete fail'})
        }
    }
}