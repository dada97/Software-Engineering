import BoardService from '../services/boardService.js'

export default class Board {
    constructor() {
        this.BoardService = new BoardService()

        this.getAllBoard = this.getAllBoard.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.deleteBoard = this.deleteBoard.bind(this)
        this.update = this.update.bind(this)
    }

    //取得所有看板
    async getAllBoard(req,res){
        try{
            console.log("test")
            res.status(200).json({boards: await this.BoardService.getAllBoard()})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    //開新看板
    async createBoard(req,res){
        try{
            await this.BoardService.createBoard(req.header.authorization,req.body)
            res.status(200).json({succeed: "create succeed"})
        }catch(e){
            res.status(400).json({error:'create fail'})
        }
    }

    async deleteBoard(req,res){
        try{
            await this.BoardService.deleteBoard(req.params.id,req.header.authorization)
            res.status(200).json({succeed: "delte succeed"})
        }catch(e){
            res.status(400).json({error:'delete fail'})
        }
    }

    async update(req,res){
        try{
            await this.BoardService.update(req.params.id,req.header.authorization,req.body)
            res.status(200).json({succeed: "update succeed"})
        }catch(e){
            res.status(400).json({error:'update fail'})
        }
    }
    
}