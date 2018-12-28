import Router from '../router.js'

import BoardController from '../software-engineering/controllers/board'

class Board extends Router {
    constructor() {
        super()
        this.controller = new BoardController()
        this.init()
    }

    init() {
        this.get('/',     this.controller.getAllBoard) //取得所有看板
    }
}

const BoardRouter = new Board()
export default BoardRouter.Match.bind(BoardRouter)