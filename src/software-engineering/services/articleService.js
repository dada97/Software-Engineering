import ArticleRepository  from '../repositories/articleRepository.js'
import FriendRepository from '../repositories/friendRepository.js'
import GroupRepository from '../repositories/groupRepository.js'
import RedisService from './redisService.js'

import AccountRepository from '../repositories/accountRepository.js'
import LikeRepository  from '../repositories/likeRepository.js'

const specID = '1'

//用id從大到小排序
const sort = function(arr){
    arr = arr.sort(function(a,b){
        return a.ID < b.ID ? 1 : -1
    })
    return arr
}

export default class Article {
    constructor() {
        this.ArticleRepository  = new ArticleRepository()
        this.FriendRepository = new FriendRepository()
        this.GroupRepository = new GroupRepository()
        this.RedisService = new RedisService()
        this.AccountRepository = new AccountRepository()
        this.LikeRepository = new LikeRepository()
    }

    //取得所有貼文
    async getAllArticle(token){
        const ID = await this.RedisService.Verify(token)
        if(ID != specID){
            throw 'not found'
        }
        const articles = await this.ArticleRepository.getAllArticle()
        if(articles == undefined){
            throw 'not found'
        }
        return articles
    }

    async getArticleByAccountId(id){
        let articles = await this.ArticleRepository.getArticleByAccountId(id)
        if(articles == undefined){
            throw 'not found'
        }
        articles = sort(articles)
        return articles
    }

    //取得特定帳戶貼文
    async getArticleById(id){
        const articles = await this.ArticleRepository.getArticleById(id)
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
        const article = await this.ArticleRepository.getArticleById(id)
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
        await this.ArticleRepository.update(id,obj)
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
        const article = await this.ArticleRepository.getArticleById(id)
        if(article == undefined){
            throw 'not found'
        }
        if(ID != article.userid){
            throw 'delete fail'
        }
        await this.ArticleRepository.deleteArticleById(id)
    }

    //取得好友貼文
    async getFriendArticleByAccountToken(token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }
        const friends = await this.FriendRepository.getFriendByAccountId(ID)
        if(friends == undefined){
            throw 'no friends'
        }
        let obj = []
        for(var i in friends){
            let articles = await this.ArticleRepository.getArticleByAccountId(friends[i].friendID)
            for(var j in articles){
                if(articles[j].boardid == undefined && articles[j].groupid == undefined){
                    obj.push(articles[j])
                }
            }
        }
        let articles = await this.ArticleRepository.getArticleByAccountId(ID)
            for(var i in articles){
                if(articles[i].boardid == undefined && articles[i].groupid == undefined){
                    obj.push(articles[i])
                }
            }
        obj = sort(obj)
        for(var i in obj){
            let account = await this.AccountRepository.getAccountById(obj[i].userid)
            obj[i].gender = account.gender
            obj[i].username = account.username
        }
        for(var i in obj){
            let like = await this.LikeRepository.getLikeByArticleId(obj[i].ID)
            obj[i].likes = like.length
            obj[i].liked = false
            for(var j in like){
                if(like[j].userid == ID)
                {
                    obj[i].liked = true
                    break;
                }
            }
        }
        return obj

    }

    //用家族id取得家族貼文
    async getGroupArticleById(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'not found'
        }
        let articles = await this.ArticleRepository.getGroupArticleById(id)
        if(articles==undefined){
            throw 'not found'
        }
        for(var i in articles){
            let account = await this.AccountRepository.getAccountById(articles[i].userid)
            articles[i].gender = account.gender
            articles[i].username = account.username
        }
        for(var i in articles){
            let like = await this.LikeRepository.getLikeByArticleId(articles[i].ID)
            articles[i].likes = like.length
            articles[i].liked = false
            for(var j in like){
                if(like[j].userid == ID)
                {
                    articles[i].liked = true
                    break;
                }
            }
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
        await this.ArticleRepository.createArticle(data)
    }


    //用看板id取得看板文章
    async getBoardArticleById(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'notfound'
        }
        if(id == undefined){
            throw 'not found'
        }
        let articles = await this.ArticleRepository.getBoardArticleById(id)
        for(var i in articles){
            let account = await this.AccountRepository.getAccountById(articles[i].userid)
            articles[i].gender = account.gender
            articles[i].username = account.username
        }
        for(var i in articles){
            let like = await this.LikeRepository.getLikeByArticleId(articles[i].ID)
            articles[i].likes = like.length
            articles[i].liked = false
            for(var j in like){
                if(like[j].userid == ID)
                {
                    articles[i].liked = true
                    break;
                }
            }
        }
        articles = sort(articles)

        return articles
    }

}