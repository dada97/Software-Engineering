import * as crypto from 'crypto'

import AccountRepository  from '../repositories/accountRepository.js'
import FileService  from './fileService.js'
import RedisService from './redisService.js'


const hashFunction = function(msg){
    return crypto.createHash('sha256').update(String(msg)).digest('hex')
}

export default class Account {
    constructor() {
        this.AccountRepository  = new AccountRepository()
        this.FileService  = new FileService()
        this.RedisService = new RedisService()
    }

    async login(data){    
        if(data.account == undefined || data.password == undefined){
            throw '登入失敗'
        }
        const account = await this.AccountRepository.getAccountByAccount(data.account)
        if(account == undefined){
            throw '登入失敗'
        }
        const hashPassword = hashFunction(data.password)
        if(hashPassword !== account.password){
            throw '登入失敗'
        }
        const token = this.RedisService.generateToken()
        this.RedisService.store(token,account.id)
        return token
    }

    async register(data){
        const account = await this.AccountRepository.getAccountByAccount(data.account) //判斷帳號是否已被使用
        if(account !== undefined){
            throw '此帳號已被註冊'
        }
    }

    async getAllAccounts(){
        const accounts = await this.AccountRepository.getAllAccounts()
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

    async deleteAccountById(id){
        if(id == undefined){
            throw '帳戶不存在'
        }
        const account = await this.getAccountById(id)
        if(account == undefined){
            throw '帳戶不存在'
        }
        await this.AccountRepository.deleteAccountById(id)
    }

    async update(id,data){
        if(id == undefined){
            throw '帳戶不存在'
        }
        const account = await this.getAccountById(id)
        if(account == undefined){
            throw '帳戶不存在'
        }
        await this.AccountRepository.update(id,data)
    }
}