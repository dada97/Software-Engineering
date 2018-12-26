import articleRepository  from '../repositories/articleRepository.js'
import friendRepository from '../repositories/friendRepository.js'
import groupRepository from '../repositories/groupRepository.js'

//用id從大到小排序
const sort = function(arr){
    arr = arr.sort(function(a,b){
        return a.id < b.id ? 1 : -1
    })
    return arr
}

export default class Article {
    constructor() {
        this.articleRepository  = new articleRepository()
    }

    //取得所有貼文
    async getAllArticle(){
        const articles = await this.articleRepository.getAllArticle()
        if(articles == undefined){
            throw 'not found'
        }
        return articles
    }

    //取得特定帳戶貼文
    async getArticleById(id){
        const article = await this.articleRepository.getArticleById(id)
        if(article==undefined){
            throw 'not found'
        }
        return article
    }

    //更新貼文
    async update(id,data){
        const article = await this.articleRepository.getArticleById(id)
        if(article==undefined){
            throw 'not found'
        }
        //判斷是否為該帳戶的貼文
        if(article.acID !== data.acID){
            throw 'update fail'
        }
        await this.articleRepository.update(data)
    }

    //刪除貼文
    async deleteArticleById(id){
        const article = await this.articleRepository.getArticleById(id)
        if(article == undefined){
            throw 'not found'
        }
        await this.articleRepository.deleteArticleById(id)
    }

    //取得好友貼文
    async getFriendArticleByAccountId(id){
        const friend = await friendRepository.getFriendByAccountId(id)
        if(friend == undefined){
            throw 'no frineds'
        }
        let article = []
        for(var i in friend){
            article.push(await articleRepository.getArticleByAccountId(friend[i]))
        }
        article = sort(article)
        return article

    }

    //取得家族貼文
    async getGroupArticleById(id){
        let article = await groupRepository.getGroupArticleById(id)
        if(article==undefined){
            throw 'not found'
        }
        article = sort(article)
        return article
    }

    
}