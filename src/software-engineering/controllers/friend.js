import FriendService from '../services/friendService.js'

export default class Friend {
    constructor() {
        this.FriendService = new FriendService()

        this.getFriendByAccountId = this.getFriendByAccountId.bind(this)
        this.createFriend = this.createFriend.bind(this)
        this.deleteFriend = this.deleteFriend.bind(this)
    }
   
    //取得帳戶的好友資訊
    async getFriendByAccountId(req,res){
        try{
            res.status(200).json({friends: await FriendService.getFriendByAccountId(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //新增好友
    async createFriend(req,res){
        try{
            await FriendService.createFriend(req.params.id,req.body)
            res.status(200).json({succeed: 'create succeed'})
        }catch(e){
            res.status(400).json({error:'create fail'})
        }
    }

    //刪除好友
    async deleteFriend(req,res){
        try{
            await FriendService.deleteFriend(req.params.id)
            res.status(200).json({succeed: 'delete succeed'})
        }catch(e){
            res.status(400).json({error:'delete fail'})
        }
    }
}