import GroupService from '../services/groupService.js'

export default class Group {
    constructor() {
        this.GroupService = new GroupService()

        this.createGroup = this.createGroup.bind(this)
        this.update = this.update.bind(this)
        this.join = this.join.bind(this)
        this.quit = this.quit.bind(this)
        this.search = this.search.bind(this)
    }
    
    //創建家族
    async createGroup(req,res){
        try{
            await this.GroupService.createGroup(req.params.id,req.body)
            res.status(200).json({succeed:'create succeed'})
        }catch(e){
            res.status(400).json({error:'create fail'})
        }
    }  
    
    //更新家族資訊
    async update(req,res){
        try{
            await this.GroupService.update(req.params.id,req.body)
            res.status(200).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update fail'})
        }
    }  

    //加入家族
    async join(req,res){
        try{
            await this.GroupService.join(req.params.id,req.body)
            res.status(200).json({succeed:'join succeed'})
        }catch(e){
            res.status(400).json({error:'join fail'})
        }
    }    


    //退出家族
    async quit(req,res){
        try{
            await this.GroupService.quit(req.params.id,req.body)
            res.status(200).json({succeed:'quit succeed'})
        }catch(e){
            res.status(400).json({error:'quit fail'})
        }
    }


    //搜尋家族
    async search(req,res){
        try{
            res.status(200).json({groups: await this.GroupService.search(req.params.search)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    
}