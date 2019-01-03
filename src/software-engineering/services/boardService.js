import BoardRepository  from '../repositories/boardRepository.js'
import RedisService from './redisService.js'

const specID = '1'

export default class Board {
    constructor() {
        this.BoardRepository  = new BoardRepository()
        this.RedisService = new RedisService()
    }

    //取得所有看板
    async getAllBoard(){
        const boards = await this.BoardRepository.getAllBoard()
        if(boards == undefined){
            throw 'not found'
        }
        return boards
    }

    async createBoard(token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID != specID){
            throw 'create fail'
        }
        if(data.boardname == '' || data.boardname == undefined){
            throw 'create fail'
        }
        const board = await this.BoardRepository.getBoardByName(data.boardname) //檢查此看板名稱是否已存在
        if(board !== undefined){
            throw 'create fail'
        }
        await this.BoardRepository.createBoard(data)
    }

    async deleteBoard(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID != specID){
            throw 'delete fail'
        }
        if(id == undefined){
            throw 'delete fail'
        }
        const board = await this.BoardRepository.getBoardById(id)
        console.log(board)
        if(board == undefined){
            throw 'delete fail'
        }
        await this.BoardRepository.deleteBoard(id)
    }

    async update(id,token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID != specID){
            throw 'delete fail'
        }
        if(id == undefined){
            throw 'update fail'
        }
        const board = await this.BoardRepository.getBoardById(id)
        if(board == undefined){
            throw 'update fail'
        }
        let obj={
        }
        obj.boardname = data.boardname
        await this.BoardRepository.update(id,obj)
    }
    
    
}