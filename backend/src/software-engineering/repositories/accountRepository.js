import Model from '../models/MySQL'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
    }
}