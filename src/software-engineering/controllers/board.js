import BoardService from '../services/boardService.js'

export default class Board {
    constructor() {
        this.BoardService = new BoardService()

        this.getAllBoard = this.getAllBoard.bind(this)
    }

    //取得所有看板
    async getAllBoard(req,res){
        try{
            res.status(200).json({boards: await this.BoardService.getAllBoard()})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }
    
}