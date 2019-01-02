import Model from '../models/MySQL'

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }
	
	//新增Comment
	async createComment(data){
		return await this.CommentModel.insert(this.CommentModel.table,data);
    }
	
	//取得article所有Comments
    async getCommentByArticleId(id){
		return await this.CommentModel.where(this.CommentModel.table,'articleid',id);
    }
	
	//刪除特定id的Comment
	async deleteCommentById(id){
		console.log(id)
		return await this.CommentModel.delete_(this.CommentModel.table,"ID",id);
    }
	
	//修改特定id的Comment的資料
	async update(id,data){
		return await this.CommentModel.update(this.CommentModel.table,id,data);
	}
	
	//取得特定id的comment
	async getCommentById(id){
		let comments = []
		comments =  await this.CommentModel.where(this.CommentModel.table,'ID',id);
		return comments[0]
	}
}