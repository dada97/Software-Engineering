import Model from '../models/MySQL'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
    }

    //用帳戶id取得所有articles
    async getArticleByAccountId(id){
		return await this.ArticleModel.where(this.ArticleModel.table,"userid",id);
    }

    //修改特定id的article資料
    async update(id,data){
		return await this.ArticleModel.update(this.ArticleModel.table,id,data);
    }

    //取得特定id的article
    async getArticleById(id){
      let articles = []
    articles  =  await this.ArticleModel.where(this.ArticleModel.table,"ID",id);
    return articles[0]
    }

    //刪除特定id的article
    async deleteArticleById(id){
		return await this.ArticleModel.delete_(this.ArticleModel.table,"ID",id);
    }

    //取得所有article
    async getAllArticle(){
      let articles = []
    articles =  await  this.ArticleModel.select(this.ArticleModel.table);
    //console.log(articles)
    return articles
    }

    //建立新article
    async createArticle(data){
		return await this.ArticleModel.insert(this.ArticleModel.table,data);
    }

    //取得家族貼文
    async getGroupArticleById(id){
		return await this.ArticleModel.where(this.ArticleModel.table,"groupid",id);
    }

    //取得看板貼文
    async getBoardArticleById(id){
		return await this.ArticleModel.where(this.ArticleModel.table,"boardid",id);
    }
}