import * as crypto from 'crypto'

import CommentRepository  from '../repositories/commentRepository.js'
import ArticleRepository  from '../repositories/articleRepository.js'
import RedisService from './redisService.js'
import AccountRepository  from '../repositories/accountRepository.js'



export default class Comment {
    constructor() {
        this.CommentRepository  = new CommentRepository()
        this.RedisService = new RedisService()
        this.ArticleRepository = new ArticleRepository()
        this.AccountRepository = new AccountRepository()
    }

    async createComment(id,token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID==undefined){
            throw 'create fail'
        }
        data.userid = ID
        if(id == ''){
            throw 'not found'
        }
        const article = await this.ArticleRepository.getArticleById(id)
        if(id == undefined){
            throw 'not found'
        }
        data.articleid = id
        return await this.CommentRepository.createComment(data)
    }

    async getCommentById(id){
        if(id == undefined){
            throw 'not found'
        }
        const comments = await this.CommentRepository.getCommentByArticleId(id)
        if(comments == undefined){
            throw 'not found'
        }
        for(var i in comments){
            const account = await this.AccountRepository.getAccountById(comments[i].userid)
            comments[i].username = account.username
        }
        return comments
    }

    async update(id,token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }
        if(id == undefined){
            throw 'not found'
        }
        const comment = await this.CommentRepository.getCommentById(id)
        if(comment == undefined){
            throw 'not found'
        }
        if(ID != comment.userid)
        {
            throw 'update fail'
        }
        data.articleid = comment.articleid
        data.userid = comment.userid
        return await this.CommentRepository.update(id,data)
    }

    async deleteComment(id,token){
        ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }
        if(id == undefined){
            throw 'not found'
        }
        const comment = await this.CommentRepository.getCommentById(id)
        if(comment == undefined){
            throw 'not found'
        }
        if(ID !== comment.userid)
        {
            throw 'delete fail'
        }
        return await this.CommentRepository.deleteCommentById(id)
    }
}