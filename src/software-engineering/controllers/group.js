import GroupService from '../services/groupService.js'

export default class Group {
    constructor() {
        this.GroupService = new GroupService()

        this.createGroup = this.createGroup.bind(this)
        this.update = this.update.bind(this)
        this.join = this.join.bind(this)
        this.quit = this.quit.bind(this)
        this.search = this.search.bind(this)
        this.getGroupByName = this.getGroupByName.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
        this.getAllGroup = this.getAllGroup.bind(this)
        this.getGroupByToken = this.getGroupByToken.bind(this)
    }

    async getGroupByToken(req,res){
        try{
            res.status(200).json({groups: await this.GroupService.getGroupByToken(req.header.authorization)})
        }catch(e){
            res.status(400).json({error:'not fail'})
        }
    }  
    
    //創建家族
    async createGroup(req,res){
        try{
            await this.GroupService.createGroup(req.header.authorization,req.body)
            res.status(200).json({succeed:'create succeed'})
        }catch(e){
            res.status(400).json({error:'create fail'})
        }
    }  
    
    //更新家族資訊
    async update(req,res){
        try{
            await this.GroupService.update(req.params.id,req.header.authorization,req.body)
            res.status(200).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update fail'})
        }
    }  

    //加入家族
    async join(req,res){
        try{
            await this.GroupService.join(req.header.authorization,req.params.id)
            res.status(200).json({succeed:'join succeed'})
        }catch(e){
            res.status(400).json({error:'join fail'})
        }
    }    


    //退出家族
    async quit(req,res){
        try{
            await this.GroupService.quit(req.params.id,req.header.authorization)
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

    //用家族名稱取得家族資訊
    async getGroupByName(req,res){
        try{
            res.status(200).json({groups: await this.GroupService.getGroupByName(req.params.search)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

    async deleteGroup(req,res){
        try{
            await this.GroupService.deleteGroup(req.params.id,req.header.authorization)
            res.status(200).json({succeed:'delete succeed'})
        }catch(e){
            res.status(400).json({error:'delete fail'})
        }
    }

    async getAllGroup(req,res){
        try{
            res.status(200).json({groups: await this.GroupService.getAllGroup(req.header.authorization)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }
    
}