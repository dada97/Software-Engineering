import CommentService from '../services/commentService.js'

export default class Comment {
    constructor() {
        this.CommentService = new CommentService()

        this.getCommentById = this.getCommentById.bind(this)
        this.createComment = this.createComment.bind(this)
        this.update = this.update.bind(this)
        this.deleteComment = this.deleteComment.bind(this)

    }

    async getCommentById(req,res){
        try{
            res.status(200).json({comments: await this.CommentService.getCommentById(req.params.id)})
        }
        catch(e){
            res.status(400).json({error:'not found'})
        }
    }
    async createComment(req,res){
        try{
            await this.CommentService.createComment(req.params.id,req.header.authorization,req.body)
            res.status(200).json({succeed:"succeed"})
        }
        catch(e){
            res.status(400).json({error:'create fail'})
        }
    }

    async update(req,res){
        try{
            await this.CommentService.update(req.params.id,req.header.authorization,req.body)
            res.status(200).json({succeed:"succeed"})
        }
        catch(e){
            res.status(400).json({error:'update fail'})
        }
    }
    async deleteComment(req,res){
        console.log("test")
        try{
            await this.CommentService.deleteComment(req.params.id,req.header.authorization)
            res.status(200).json({succeed:"succeed"})
        }
        catch(e){
            res.status(400).json({error:'delete fail'})
        }
    }

}