import ArticleService from '../services/articleService.js'

export default class Article {
    constructor() {
        this.ArticleService = new ArticleService()

        this.getArticleById = this.getArticleById.bind(this)
        this.getArticleByAccountId = this.getArticleByAccountId.bind(this)
        this.getFriendArticleByAccountToken = this.getFriendArticleByAccountToken.bind(this)
        this.getGroupArticleById = this.getGroupArticleById.bind(this)
        this.getBoardArticleById = this.getBoardArticleById.bind(this)
        this.update = this.update.bind(this)
        this.deleteArticleById = this.deleteArticleById.bind(this)
        this.getAllArticle = this.getAllArticle.bind(this)
        this.createArticle = this.createArticle.bind(this)
    }
    //取得特定id的article
    async getArticleById(req,res){
        try{
            res.status(200).json({article: await this.ArticleService.getArticleById(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //取得該帳戶id所有好友的article
    async getArticleByAccountId(req,res){
        try{
            res.status(200).json({articles: await this.ArticleService.getArticleByAccountId(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //用帳戶Id取得所有好友貼文
    async getFriendArticleByAccountToken(req,res){
        try{
            res.status(200).json({articles:await this.ArticleService.getFriendArticleByAccountId(req.header.authorization)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //修改特定id的article資料
    async update(req,res){
        try{
            await this.ArticleService.update(req.params.id,req.body,req.header.authorization)
            res.status(200).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update error'})
        }
    }

    //刪除特定id的article
    async deleteArticleById(req,res){
        console.log("test")
        try{
            await this.ArticleService.deleteArticleById(req.params.id,req.header.authorization)
            res.status(200).json({succeed:'delete succeed'})
        }catch(e){
            res.status(400).json({error:'delete error'})
        }
    }

    //取得所有article
    async getAllArticle(req,res){
        try{
            res.status(200).json({articles: await this.ArticleService.getAllArticle(req.header.authorization)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //建立新article
    async createArticle(req,res){
        try{
            await this.ArticleService.createArticle(req.body,req.header.authorization)
            res.status(200).json({succeed:'create succeed'})
        }catch(e){
            res.status(400).json({error:'create fail'})
        }
    }

    async getGroupArticleById(req,res){
        try{
            res.status(200).json({articles: await this.ArticleService.getGroupArticleById(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    async getBoardArticleById(req,res){
        try{
            res.status(200).json({articles: await this.ArticleService.getBoardArticleById(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }
}