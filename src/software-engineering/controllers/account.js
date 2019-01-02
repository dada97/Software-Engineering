import AccountService from '../services/accountService.js'

export default class Account {
    constructor() {
        this.AccountService = new AccountService()

        this.getAccountByToken = this.getAccountByToken.bind(this)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.getAllAccount = this.getAllAccount.bind(this)
        this.deleteAccountById = this.deleteAccountById.bind(this)
        this.update = this.update.bind(this)
        this.getAccountById = this.getAccountById.bind(this)
        this.getAccountByName = this.getAccountByName.bind(this)
        this.search = this.search.bind(this)
    }

    async getAccountByToken(req,res){
        try{
            res.status(200).json({account:await this.AccountService.getAccountByToken(req.header.authorization)})
        }catch(e){
            console.log(e)
            res.status(400).json({error:'login fail'})
        }
    }

    async login(req,res){
        try{
            res.status(200).json({'token':await this.AccountService.login(req.body)})
        }catch(e){
            console.log(e)
            res.status(400).json({error:'login fail'})
        }
    }

    async register(req,res){
        try{
            await this.AccountService.register(req.body)
            res.status(200).json({succeed:'register suceed'})
        }catch(e){
			console.log(e)
            res.status(400).json({error:'login fail'})
        }
    }

    async getAllAccount(req,res){
        try{
			console.log(req.header.authorization)
            res.status(200).json({accounts:await this.AccountService.getAllAccount(req.header.authorization)})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async deleteAccountById(req,res){
        try{
            await AccountService.deleteAccountById(res.params.id,req.header.authorization)
            res.status(200).json({succeed:'delete succeed'})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async update(req,res){
        try{
            await AccountService.update(req.params.id,req.header.authorization,req.body)
            res.status(200).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update fail'})
        }
    }

    async getAccountById(req,res){
        try{
            res.status(200).json({account:await this.AccountService.getAccountById(req.params.id)})
        }catch(e){
            res.status(400).json({error:'get account fail'})
        }
    }

    async getAccountByName(req,res){
        try{
            res.status(200).json({account:await this.AccountService.getAccountByName(req.params.name)})
        }catch(e){
            res.status(400).json({error:'get account fail'})
        }
    }

    async search(req,res){
        try{
            res.status(200).json({accounts:await this.AccountService.search(req.params.search)})
        }catch(e){
			console.log(e)
            res.status(400).json({error:'not found'})
        }
    }

}