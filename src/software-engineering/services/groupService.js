import GroupRepository  from '../repositories/groupRepository.js'
import AccountRepository from '../repositories/accountRepository.js'
import RedisService from './redisService.js'
import GroupMemberRepository  from '../repositories/groupMemberRepository.js'
import { createSocket } from 'dgram';
import { resolve } from 'dns';


const specID = '1'

export default class Group {
    constructor() {
        this.GroupRepository  = new GroupRepository()
        this.AccountRepository = new AccountRepository()
        this.RedisService = new RedisService()
        this.GroupMemberRepository = new GroupMemberRepository()
        
    }

    async createGroup(token,data){
        const acID = await this.RedisService.Verify(token)
        console.log(acID)
        if(acID == undefined){
            throw 'create fail'
        }
        if(data.groupname == undefined){
            throw 'create fail'
        }
        const group = await this.GroupRepository.getGroupByName(data.groupname)
        if(group !==undefined){
            throw 'group name exist'
        }
        await this.GroupRepository.createGroup(data)
        const newGroup = await this.GroupRepository.getGroupByName(data.groupname)
        if(acID !==specID){
            let obj = {
                groupID: newGroup.ID,
                memberID: acID
            }
            await this.GroupMemberRepository.join(obj)
        }
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
            groupID: id,
            memberID : acID
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
        const Group = await this.GroupRepository.getGroupByName(data.groupname)
        if(Group !== undefined){
            throw 'update fail'
        }
        if(ID == specID){
            return await this.GroupRepository.update(id,data)
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

    async quit(id,token){
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
            if(groupmember[i].memberID == acID){
                await this.GroupMemberRepository.quit(groupmember[i].ID)
                break
            }
        }
    }

    async search(searchStr){
        if(searchStr == undefined){
            throw 'not found'
        }
        const groups = await this.GroupRepository.search(searchStr)
        if(groups == undefined){
            throw 'not found'
        }
        return groups
    }

    async deleteGroup(id,token){
        const ID = await this.RedisService.Verify(token)
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