import Router from '../router.js'

import AccountController from '../software-engineering/controllers/account.js'

class Account extends Router {
    constructor() {
        super()
        this.controller = new AccountController()
        this.init()
    }

    init() {
        this.get('/',           this.controller.GetAllAccounts)
        this.get('/name/:name', this.controller.GetAccountsByName)
        this.get('/:id',        this.controller.GetAccountByID)
        this.post('/',          this.controller.Register)
        this.post('/login',     this.controller.Login)
        this.put('/:id',        this.controller.Edit)
        this.delete('/:id',     this.controller.Delete)
    }
}

const AccountRouter = new Account()
export default AccountRouter.Match.bind(AccountRouter)