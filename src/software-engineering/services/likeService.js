import * as crypto from 'crypto'

import LikeRepository  from '../repositories/LikeRepository.js'
import RedisService from './redisService.js'
import AccountRepository  from '../repositories/accountRepository.js'
import ArticleRepository  from '../repositories/articleRepository.js'


export default class Like {
    constructor() {
        this.LikeRepository  = new LikeRepository()
        this.RedisService = new RedisService()
        this.ArticleRepository = new ArticleRepository()
        this.AccountRepository = new AccountRepository()
    }

    async createLike(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID==undefined){
            throw 'create fail'
        }
        if(id == ''){
            throw 'not found'
        }
        const article = await this.ArticleRepository.getArticleById(id)
        if(article == undefined){
            throw 'not found'
        }
        if(id == undefined){
            throw 'not found'
        }

        // const likes = await this.LikeRepository.getLikeByArticleId(id)
        // console.log("test")
        // for(var i in likes){
        //     if(likes[i].userid == ID){
        //         throw 'like error'
        //     }
        // }
        let obj = {
        }
        obj.articleid = id
        obj.userid = ID
        return await this.LikeRepository.createLike(obj)
    }

    async getLikeByArticleId(id){
        if(id == undefined){
            throw 'not found'
        }
        const Likes = await this.LikeRepository.getLikeByArticleId(id)
        if(Likes == undefined){
            throw 'not found'
        }
        console.log(Likes)
        return Likes
    }
}