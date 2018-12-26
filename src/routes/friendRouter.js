import Router from '../router.js'
import FriendController from '../software-engineering/controllers/friend.js'

class Friend extends Router {
    constructor() {
        super()
        this.controller = new FriendController()
        this.init()
    }

    init() {
        this.get('/:id',     this.controller.getFriendByAccountId) //取得帳戶的好友資訊
        this.post('/:id',    this.controller.createFriend)         //新增好友
        this.delete('/:id',  this.controller.deleteFriend)         //刪除好友
    }
}

const FriendRouter = new Friend()
export default FriendRouter.Match.bind(FriendRouter)