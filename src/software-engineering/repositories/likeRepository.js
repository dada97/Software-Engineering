import Model from '../models/MySQL'

export default class Like {
    constructor() {
        this.LikeModel = new Model('like')
    }
	 
	
	//取得按讚的賬戶id
    async getLikeByAccountId(id){
		return this.LikeModel.where(this.LikeModel.table,"articleid",id);
    }

    //新增按讚的賬戶資料
    async createLike(data){
		return this.LikeModel.insert(this.LikeModel.table,data);
    }

    //刪除按讚的賬戶資料
    async deleteLike(data){
		return this.LikeModel.delete_(this.LikeModel.table,"articleid",id);//有問題
    }
    

}
