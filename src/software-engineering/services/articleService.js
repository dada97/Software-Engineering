import articleRepository  from '../repositories/articleRepository.js'
import friendRepository from '../repositories/friendRepository.js'
import groupRepository from '../repositories/groupRepository.js'
import RedisService from './redisService.js'
import AccountRepository  from '../repositories/accountRepository.js'

const specID = '1'

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
        this.RedisService = new RedisService()
        this.AccountRepository = new AccountRepository()
    }

    //取得所有貼文
    async getAllArticle(token){
        const ID = await this.RedisService.Verify(token)
        if(ID != specID){
            throw 'not found'
        }
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
        const articles = await this.articleRepository.getArticleById(id)
        if(articles==undefined){
            throw 'not found'
        }
        return articles
    }

    //更新貼文
    async update(id,data,token){
        let list = ['title','content']
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }
        if(id == undefined){
            throw 'update fail'
        }
        const article = await this.articleRepository.getArticleById(id)
        if(article == undefined){
            throw 'update fail'
        }
        //判斷是否為該帳戶的貼文

        if(article.userid != ID){
            throw 'update fail'
        }

        let obj = article

        for(var i of list){
            if(data[i]!==undefined){
                obj[i] = data[i]
            }
        }
        await this.articleRepository.update(id,obj)
    }

    //刪除貼文
    async deleteArticleById(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'delete fail'
        }
        if(id == undefined) {
            throw 'delete fail'
        }
        const article = await this.articleRepository.getArticleById(id)
        if(article == undefined){
            throw 'not found'
        }
        if(ID != article.userid){
            throw 'delete fail'
        }
        await this.articleRepository.deleteArticleById(id)
    }

    //取得好友貼文
    async getFriendArticleByAccountToken(token){
        const ID = this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }
        const friends = await this.friendRepository.getFriendByAccountId(ID)
        if(friend == undefined){
            throw 'no friends'
        }
        let articles = []
        for(var i in friends){
            articles.push(await this.articleRepository.getArticleByAccountId(friends[i]))
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
    async createArticle(data,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'create fail'
        }
        data.userid = ID
        console.log(data)
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