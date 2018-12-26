import AccountService from '../services/accountService.js'

export default class Account {
    constructor() {
        this.AccountService = new AccountService()
    }

    async login(req,res){
        console.log(req.body)
        try{
            res.status(400).json({token:AccountService.login(req)})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async register(req,res){
        try{
            await AccountService.register(req)
            res.status(400).json({succeed:'register suceed'})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async getAllAccounts(req,res){
        try{
            res.status(400).json({accounts:AccountService.getAllAccounts()})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async deleteAccountById(req,res){
        try{
            await AccountService.deleteAccountById(req)
            res.status(400).json({succeed:'delete succeed'})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async update(req,res){
        try{
            await AccountService.update(req.params.id,req,req)
            res.status(400).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update fail'})
        }
    }

    async getAccountById(req,res){
        try{
            res.status(400).json({account:await AccountService.getAccountById(req.params.id,req,req)})
        }catch(e){
            res.status(400).json({error:'get account fail'})
        }
    }

}