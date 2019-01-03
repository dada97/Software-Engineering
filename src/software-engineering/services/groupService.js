import GroupRepository  from '../repositories/groupRepository.js'
import AccountRepository from '../repositories/accountRepository.js'
import RedisService from './redisService.js'
import GroupMemberRepository  from '../repositories/groupMemberRepository.js'


const specID = '1'

export default class Group {
    constructor() {
        this.GroupRepository  = new GroupRepository()
        this.AccountRepository = new AccountRepository()
        this.RedisService = new RedisService()
        this.GroupMemberRepository = new GroupMemberRepository()
        
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
        await this.GroupMemberRepository.join(obj)

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
        await this.GroupMemberRepository.join(obj)
    }

    async update(id,token,data){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'update fail'
        }
        if(id == undefined){
            throw 'update fail'
        }
        const group = await this.GroupRepository.getGroupById(id)
        if(group == undefined){
            throw 'update fail'
        }
        if(ID == specID){
            return await this.GroupRepository.update(id,data)
        }

        const Group = await this.GroupRepository.getGroupByName(data.name)

        if(Group !== undefined){
            throw 'update fail'
        }

        const groupmember = await this.GroupMemberRepository.getGroupMemberByGroupID(id)

        if(groupmember == undefined){
            throw 'update fail'
        }
        
        for(var i in groupmember){
            if(groupmember[i].memberID == ID){
                return await this.GroupRepository.update(id,data)
            }
        }
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
        const groupmember = await this.GroupMemberRepository.getGroupMemberByGroupID(id)
        for(var i in groupmember){
            if(groupmember[i].memberID == ID){
                await this.GroupMemberRepository.quit(groupmember[i].ID)
                break
            }
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

    async deleteGroup(id,token){
        const ID = this.RedisService.Verify(token)
        if(ID == undefined || ID !== specID){
            throw 'delete fail'
        }
        if(id == undefined){
            throw 'delete fail'
        }
        const group = await this.GroupRepository.getGroupById(id)
        if(group == undefined){
            throw  'delete fail'
        }
        await this.GroupRepository.deleteGroup(id)
    }

    async getAllGroup(token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined || ID !== specID){
            throw 'get fail'
        }
        return await this.GroupRepository.getAllGroup()
    }
}