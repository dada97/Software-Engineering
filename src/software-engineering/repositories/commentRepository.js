import Model from '../models/MySQL'

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }
	
	//新增Comment
	async createComment(data){
		return this.CommentModel.insert(this.CommentModel.table,data);
    }
	
	//取得所有Comment
    async getAllComment(){
		return this.CommentModel.select(this.CommentModel.table);
    }
	
	//刪除特定id的Comment
	async deleteCommentById(id){
		return this.CommentModel.delete_(this.CommentModel.table,"ID",id);
    }
	
	//修改特定id的Comment的資料
	async update(id,data){
		return this.CommentModel.update(this.CommentModel.table,id,data);
    }
}