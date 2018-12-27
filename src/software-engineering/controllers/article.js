import ArticleService from '../services/articleService.js'

export default class Article {
    constructor() {
        this.ArticleService = new ArticleService()

        this.getArticleById = this.getArticleById.bind(this)
        this.getArticleByAccountId = this.getArticleByAccountId.bind(this)
        this.getFriendArticleByAccountId = this.getFriendArticleByAccountId.bind(this)
        this.update = this.update.bind(this)
        this.deleteArticleById = this.deleteArticleById.bind(this)
        this.getAllArticle = this.getAllArticle.bind(this)
        this.createArticle = this.createArticle.bind(this)
    }
    //取得特定id的article
    async getArticleById(req,res){
        try{
            res.status(200).json({article:ArticleService.getArticleById(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //取得該帳戶id所有好友的article
    async getArticleByAccountId(req,res){
        try{
            res.status(200).json({articles:ArticleService.getArticleByAccountId(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //用帳戶Id取得所有好友貼文
    async getFriendArticleByAccountId(req,res){
        try{
            res.status(200).json({articles:ArticleService.getFriendArticleByAccountId(req.params.id)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //修改特定id的article資料
    async update(req,res){
        try{
            await ArticleService.update(req.params.id,req.body)
            res.status(200).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update error'})
        }
    }

    //刪除特定id的article
    async deleteArticleById(req,res){
        try{
            res.status(200).json({token:ArticleService.deleteArticleById(req.params.id,req.body)})
        }catch(e){
            res.status(400).json({error:'delete error'})
        }
    }

    //取得所有article
    async getAllArticle(req,res){
        try{
            res.status(200).json({articles:ArticleService.getAllArticle()})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //建立新article
    async createArticle(req,res){
        try{
            await ArticleService.createArticle(req.body)
            res.status(200).json({succeed:'create succeed'})
        }catch(e){
            res.status(400).json({error:'create fail'})
        }
    }
}