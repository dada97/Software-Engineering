import Router from '../router.js'

import ArticleController from '../software-engineering/controllers/article.js'

class Article extends Router {
    constructor() {
        super()
        this.controller = new ArticleController()
        this.init()
    }

    init() {
        this.get('/account/:id',     this.controller.getArticleByAccountId) //用帳戶id取得此帳戶所有貼文
        this.get('/friend/:id',      this.controller.getFriendArticlesByAccountId)  //用帳戶Id取得所有好友貼文
        this.get('/group/:id',       this.controller.getGroupArticleById)   //用家族id取得家族貼文
        this.get('/board/:id',       this.controller.getBoardArticleById)   //用看板id取得看板貼文
        this.get('/:id',             this.controller.getArticleById)  // 取得特定id的article
        this.get('/',                this.controller.getAllArticle)     //取得所有article
        this.post('/',               this.controller.createArticle)           //新增貼文
        this.put('/:id',             this.controller.update)             //更新某id的article
        this.delete('/:id',          this.controller.deleteArticletById)  //刪除article
    }
}

const ArticleRouter = new Article()
export default ArticleRouter.Match.bind(ArticleRouter)