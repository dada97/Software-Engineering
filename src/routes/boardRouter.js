import Router from '../router.js'

import BoardController from '../software-engineering/controllers/board.js'

class Board extends Router {
    constructor() {
        super()
        this.controller = new BoardController()
        this.init()
    }

    init() {
        this.get('/',       this.controller.getAllBoard) //取得所有看板
        this.post('/',      this.controller.createBoard)  //開新看板
        this.delete('/:id', this.controller.deleteBoard) //刪除看板
        this.put('/:id',    this.controller.update) //更新看板資訊
    }
}

const BoardRouter = new Board()
export default BoardRouter.Match.bind(BoardRouter)