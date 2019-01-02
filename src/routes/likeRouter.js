import Router from '../router.js'
import LikeController from '../software-engineering/controllers/like.js'

class Like extends Router {
    constructor() {
        super()
        this.controller = new LikeController()
        this.init()
    }

    init() {  
        this.post('/:id',this.controller.createLike)     //文章按讚
        this.get('/:id',this.controller.getArticleLike) //取得文章按讚的人
    }
}

const LikeRouter = new Like()
export default LikeRouter.Match.bind(LikeRouter)