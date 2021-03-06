import * as crypto from 'crypto'

import AccountRepository  from '../repositories/accountRepository.js'
import FileService  from './fileService.js'
import RedisService from './redisService.js'
import FriendRepository  from '../repositories/friendRepository.js'

const specID = '1'

const hashFunction = function(msg){
    return crypto.createHash('sha256').update(String(msg)).digest('hex')
}

export default class Account {
    constructor() {
        this.AccountRepository  = new AccountRepository()
        this.FileService  = new FileService()
        this.RedisService = new RedisService()
        this.FriendRepository = new FriendRepository()
    }

    async login(data){
		
        if(data.account == undefined || data.password == undefined){
            throw '登入失敗'
        }
        const account = await this.AccountRepository.getAccountByAccount(data.account);
        if(account == undefined){
            throw '登入失敗'
        }

        
        const hashPassword = hashFunction(data.password)
        if(hashPassword !== account.password){
            throw '登入失敗'
        }
		

        const token = this.RedisService.generateToken()
        this.RedisService.Store(token,account.ID)
        
        return token
    }

    async register(data){
        data.coin = 0;
        const account = await this.AccountRepository.getAccountByAccount(data.account) //判斷帳號是否已被使用
		data.password = hashFunction(data.password)
        if(account !== undefined){
            throw '此帳號已被註冊'
        }
        await this.AccountRepository.createAccount(data)
    }

    async getAllAccount(token){
        const ID = await this.RedisService.Verify(token)
        if(ID !== specID){
            throw '權限不足'
        }	
        const accounts = await this.AccountRepository.getAllAccount()
        if(accounts == undefined){
            throw '帳戶不存在'
        }
        return accounts
    }

    async getAccountById(id){
        if(id == undefined){
            throw '帳戶不存在'
        }
        const account = await this.AccountRepository.getAccountById(id)
        if(account==undefined){
            throw '帳戶不存在'
        }
        return account
    }

    async deleteAccountById(id,token){
        const ID = await this.RedisService.Verify(token)
        if(ID !== specID){
            權限不足
        }
        if(id == undefined){
            throw '帳戶不存在'
        }
        const account = await this.getAccountById(id)
        if(account == undefined){
            throw '帳戶不存在'
        }
        await this.AccountRepository.deleteAccountById(id)
    }

    async update(id,token,data){
        var list = ['password','gender','username']
        if(id == undefined){
            throw '帳戶不存在'
        }
        const ID = await this.RedisService.Verify(token)
        if(ID !== specID){
            if(ID == undefined || id!==ID){
                throw '帳戶不存在'
            }
        } 
        const account = await this.getAccountById(id)
        if(account == undefined){
            throw '帳戶不存在'
        }
        let obj = account
        for(var i of list){
            if(data[i] !== undefined){
                if(i == 'password'){
                    data[i] = hashFunction(data[i])
                }
                obj[i] = data[i]
            }
        }
        await this.AccountRepository.update(id,obj)
    }

    async getAccountByToken(token){
        if(token== undefined){
            throw '帳戶不存在'
        }
        const id = await this.RedisService.Verify(token)
        if(id == undefined){
            throw '帳戶不存在'
        }
        return await this.getAccountById(id)
    }

    async getAccountByName(name){

        if(name==undefined){
            throw 'not found'
        }
        const account = await this.AccountRepository.getAccountByName(name)
        if(account == undefined){
            throw 'not found'
        }
        return account
    }

    async search(searchName){
        if(searchName==undefined){
            throw 'not found'
        }
        const accounts = await this.AccountRepository.search(searchName)
        if(accounts == undefined){
            throw 'not found'
        }
        let obj = []
        for(var i in accounts){
            var t ={
                id: accounts[i].ID,
                username: accounts[i].username,
                gender: accounts[i].gender
            }
            obj.push(t)
        }
        return obj
    }

    async card(token){
        const ID = await this.RedisService.Verify(token)
        if(ID == undefined){
            throw 'card fail'
        }
        let accounts = await this.AccountRepository.getAllAccount()
        let friends = await this.FriendRepository.getFriendByAccountId(ID)
        while(1){
            var item = accounts[Math.floor(Math.random()*accounts.length)]
            let flag = false
            for(var i in friends){
                if(item.ID == friends.friendID){
                    flag = true
                    break;
                }
            }
            if(flag == false){
                return item
            }
        }
        
    }
}