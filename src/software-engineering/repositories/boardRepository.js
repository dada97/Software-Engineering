import Model from '../models/MySQL'

export default class Board {
    constructor() {
        this.BoardModel = new Model('board')
    }

    //取得所有看板
    async getAllBoard(){
        return await this.BoardModel.select(this.BoardModel.table);
    }

    async createBoard(data){
        console.log(data)
        return await this.BoardModel.insert(this.BoardModel.table,data);
    }

    async getBoardById(id){
        console.log(id)
        let boards = []
        boards = await  this.BoardModel.where(this.BoardModel.table,"ID",id);
        console.log(boards)
         return boards[0]
    }

    async getBoardByName(name){
        let boards = []
        boards = await  this.BoardModel.where(this.BoardModel.table,"boardname",name);
        return boards[0]
    }

    async deleteBoard(id){
        return await this.BoardModel.delete_(this.BoardModel.table,"ID",id);
    }

    async update(id,data){
    	return await this.BoardModel.update(this.BoardModel.table,id,data);
    }

}