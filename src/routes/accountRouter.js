import Router from '../router.js'

import AccountController from '../software-engineering/controllers/account.js'

class Account extends Router {
    constructor() {
        super()
        this.controller = new AccountController()
        this.init()
    }

    init() {
        this.get('/:id',        this.controller.getAccountByID)     //用id搜尋帳戶資訊
        this.get('/',           this.controller.getAllAccounts)     //取得所有帳戶
        this.post('/register',  this.controller.register)           //註冊
        this.post('/login',     this.controller.login)              //登入
        this.put('/:id',        this.controller.update)             //更新帳戶資訊
        this.delete('/:id',     this.controller.deleteAccountById)  //用id刪除帳戶
    }
}

const AccountRouter = new Account()
export default AccountRouter.Match.bind(AccountRouter)