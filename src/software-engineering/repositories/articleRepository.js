import Model from '../models/MySQL'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
    }

    //用帳戶id取得所有articles
    async getArticleByAccountId(id){

    }

    //修改特定id的article資料
    async update(id){

    }

    //取得特定id的article
    async getArticleById(){

    }

    //刪除特定id的article
    async deleteArticleById(id){

    }

    //取得所有article
    async getAllArticle(){

    }

    //建立新article
    async createArticle(data){

    }
}