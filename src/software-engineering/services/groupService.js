import GroupRepository  from '../repositories/groupRepository.js'
import AccountRepository from '../repositories/accountRepository.js'
import RedisService from './redisService.js'

export default class Group {
    constructor() {
        this.GroupRepository  = new GroupRepository()
        this.AccountRepository = new AccountRepository()
        this.RedisService = new RedisService()
        
    }

    async createGroup(token,data){
        const acID = this.RedisService.Verify(token)
        if(acID == undefined){
            throw 'create fail'
        }
        if(data.name == undefined){
            throw 'create fail'
        }
        const group = await this.GroupRepository.getGroupByName(data.name)
        if(group !==undefined){
            throw 'group name exist'
        }
        await this.GroupRepository.createGroup(data)
        const newGroup = await this.GroupRepository.getGroupByName(data.name)
        let obj = {
            ID: newGroup.ID,
            userID: acID
        }
        this.GroupRepository.join(obj)

    }

    async join(token,id){
        const acID = await this.RedisService.Verify(token)
        if(acID==undefined){
            throw 'join fail'
        }
        const group = await this.GroupRepository.getGroupById(id)
        if(group == undefined){
            throw 'not found'
        }
        let obj = {
            ID: id,
            userID : acID
        }
        await GroupRepository.join(obj)
    }

    async quit(token,id){
        const acID = await this.RedisService.Verify(token)
        if(acID==undefined || id == undefined){
            throw 'quit fail'
        }
        const group = await this.GroupRepository.getGroupById(id)
        if(group == undefined){
            throw 'quit fail'
        }
        

    }

    async search(searchStr){
        if(searchStr == undefined){
            throw 'not found'
        }
        const groups = await GroupRepository.search(searchStr)
        if(groups == undefined){
            throw 'not found'
        }
        return groups
    }
}