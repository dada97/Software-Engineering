import boardRepository  from '../repositories/boardRepository.js'


export default class Board {
    constructor() {
        this.boardRepository  = new boardRepository()
    }

    //取得所有看板
    async getAllBoard(){
        const boards = await this.boardRepository.getAllBoard()
        if(articles == undefined){
            throw 'not found'
        }
        return articles
    }
    
}