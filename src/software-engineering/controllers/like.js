import LikeService from '../services/LikeService.js'

export default class Like {
    constructor() {
        this.LikeService = new LikeService()


        this.createLike = this.createLike.bind(this)
        this.getLikeByArticleId = this.getLikeByArticleId.bind(this)
    }
   
    //取得帳戶的好友資訊
    async getLikeByArticleId(req,res){
        try{
            res.status(200).json({likes: await this.LikeService.getLikeByArticleId(req.params.id)})
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