import Router from '../router.js'
import GroupController from '../software-engineering/controllers/group.js'

class Group extends Router {
    constructor() {
        super()
        this.controller = new GroupController()
        this.init()
    }

    init() {  
        this.get('/search/:search',this.controller.search)     //搜尋家族
        this.get('/token',this.controller.getGroupByToken)
        this.get('/',   this.controller.getAllGroup)        //取得所有家族
        this.post('/join/:id',  this.controller.join)           //加入家族(:id為家族id)
        this.post('/',       this.controller.createGroup)    //創建家族
        this.put('/:id',        this.controller.update)         //修改家族資訊
        this.delete('/quit/:id',this.controller.quit)           //退出家族(:id為家族id)
        this.delete('/:id',  this.controller.deleteGroup)    //刪除家族
    }
}

const GroupRouter = new Group()
export default GroupRouter.Match.bind(GroupRouter)