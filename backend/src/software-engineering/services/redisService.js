import * as redis from 'redis'

export default class Redis {
    constructor() {
        this.client = redis.createClient()
    }

}