import LikeService from '../services/LikeService.js'

export default class Like {
    constructor() {
        this.LikeService = new LikeService()

        this.getLikeByAccountToken = this.getLikeByAccountToken.bind(this)
        this.createLike = this.createLike.bind(this)
        this.deleteLike = this.deleteLike.bind(this)
    }
   
    //取得帳戶的好友資訊
    async getArticleLike(req,res){
        try{
            res.status(200).json({likes: await this.LikeService.getLikeByAccountToken(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }


    //文章按讚
    async createLike(req,res){
       
        try{
            await this.LikeService.createLike(req.params.id,req.header.authorization)
            res.status(200).json({succeed: "create succeed"})
        }catch(e){
            console.log(e)
            res.status(400).json({error:'create fail'})
        }
    }
}