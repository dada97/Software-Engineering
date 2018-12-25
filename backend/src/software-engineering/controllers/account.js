import AccountRepository    from '../repositories/accountRepository.js'
import AccountService from '../services/accountService.js'

export default class Account {
    constructor() {
        this.AccountRepository = new AccountRepository()
        this.AccountService = new AccountService()
    }
}