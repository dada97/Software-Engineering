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
        this.friendRepository = new friendRepository()
        this.groupRepository = new groupRepository()
    }

    //取得所有貼文
    async getAllArticle(){
        const articles = await this.articleRepository.getAllArticle()
        if(articles == undefined){
            throw 'not found'
        }
        return articles
    }

    async getArticleByAccountId(id){
        let articles = await this.articleRepository.getArticleByAccountId(id)
        if(articles == undefined){
            throw 'not found'
        }
        articles = sort(articles)
        return articles
    }

    //取得特定帳戶貼文
    async getArticleById(id){
        const article = await this.articleRepository.getArticleById(id)
        if(articles==undefined){
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
        await this.articleRepository.update(id,data)
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
        const friend = await this.friendRepository.getFriendByAccountId(id)
        if(friend == undefined){
            throw 'no frineds'
        }
        let articles = []
        for(var i in friend){
            articles.push(await this.articleRepository.getArticleByAccountId(friend[i]))
        }
        articles = sort(articles)
        return articles

    }

    //用家族id取得家族貼文
    async getGroupArticleById(id){
        let articles = await this.groupRepository.getGroupArticleById(id)
        if(articles==undefined){
            throw 'not found'
        }
        articles = sort(articles)
        return articles
    }


    //新增貼文
    async createArticle(data){
        if(data.accountID ==undefined){
            throw 'create fail'
        }
        await this.articleRepository.createArticle(data)
    }


    //用看板id取得看板文章
    async getBoradArticleById(id){
        if(id == undefined){
            throw 'not found'
        }
        let articles = await this.articleRepository.getBoradArticleById(id)
        articles = sort(articles)
        return articles
    }

}