import AccountService from '../services/accountService.js'

export default class Account {
    constructor() {
        this.AccountService = new AccountService()
    }

    async login(req,res){
        try{
			token = await this.AccountService.register(req.body)
            res.status(200).json({token:token})
       }catch(e){
		   console.log(e)
           res.status(400).json({error:'login fail'})
        }
    }

    async register(req,res){
        try{
            await AccountService.register(req.body)
            res.status(400).json({succeed:'register suceed'})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async getAllAccount(req,res){
        try{
            res.status(400).json({accounts:AccountService.getAllAccount()})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async deleteAccountById(req,res){
        try{
            await AccountService.deleteAccountById(res.params.id)
            res.status(400).json({succeed:'delete succeed'})
        }catch(e){
            res.status(400).json({error:'login fail'})
        }
    }

    async update(req,res){
        try{
            await AccountService.update(req.params.id,req.body)
            res.status(400).json({succeed:'update succeed'})
        }catch(e){
            res.status(400).json({error:'update fail'})
        }
    }

    async getAccountById(req,res){
        try{
            res.status(400).json({account:await AccountService.getAccountById(req.params.id)})
        }catch(e){
            res.status(400).json({error:'get account fail'})
        }
    }

    async getAccountByName(req,res){
        try{
            res.status(400).json({account:await AccountService.getAccountByName(req.params.name)})
        }catch(e){
            res.status(400).json({error:'get account fail'})
        }
    }

    async search(req,res){
        try{
            res.status(400).json({accounts:await AccountService.search(req.params.search)})
        }catch(e){
            res.status(400).json({error:'not found'})
        }
    }

}