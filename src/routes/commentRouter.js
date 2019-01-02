import Router from '../router.js'
import CommentController from '../software-engineering/controllers/comment.js'

class Comment extends Router {
    constructor() {
        super()
        this.controller = new CommentController()
        this.init()
    }

    init() {
        this.get('/:id',     this.controller.getCommentById) //用article id取得留言
        this.post('/:id',   this.controller.createComment)  //留言
        this.put('/:id',    this.controller.update)  //修改留言
        this.delete('/:id', this.controller.deleteComment)  //刪除留言
        
    }
}

const CommentRouter = new Comment()
export default CommentRouter.Match.bind(CommentRouter)