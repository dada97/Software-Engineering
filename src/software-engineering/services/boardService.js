import boardRepository  from '../repositories/boardRepository.js'
import RedisService from './redisService.js'

const specID = '1'

export default class Board {
    constructor() {
        this.boardRepository  = new boardRepository()
        this.RedisService = new RedisService()
    }

    //取得所有看板
    async getAllBoard(){
        const boards = await this.boardRepository.getAllBoard()
        if(boards == undefined){
            throw 'not found'
        }
        return articles
    }

    async createBoard(token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID != specID){
            throw 'create fail'
        }
        if(data.boardname == '' || data.boardname == undefined){
            throw 'create fail'
        }
        const board = await this.getBoardByName(data.boardname) //檢查此看板名稱是否已存在
        if(board !== undefined){
            throw 'create fail'
        }
        await boardRepository.createBoard(data)
    }

    async deleteBoard(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID != specID){
            throw 'delete fail'
        }
        if(id == undefined){
            throw 'delete fail'
        }
        const board = await this.boardRepository.getBoardById(id)
        if(board == undefined){
            throw 'delete fail'
        }
        await this.boardRepository.deleteBoard(id)
    }

    async update(id,token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID != specID){
            throw 'delete fail'
        }
        if(id == undefined){
            throw 'update fail'
        }
        const board = await this.boardRepository.getBoardById(id)
        if(board == undefined){
            throw 'update fail'
        }
        let obj={
        }
        obj.boardname = data.boardname
        await this.boardRepository.update(id,obj)
    }
    
    
}