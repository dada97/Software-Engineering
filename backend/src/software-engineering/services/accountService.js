import * as crypto from 'crypto'

import AccountRepository  from '../repositories/accountRepository.js'
import FileService  from './fileService.js'
import RedisService from './redisService.js'


export default class Account {
    constructor() {
        this.AccountRepository  = new AccountRepository()
        this.FileService  = new FileService()
        this.RedisService = new RedisService()
    }
}