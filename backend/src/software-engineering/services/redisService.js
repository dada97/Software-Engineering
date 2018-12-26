import * as redis from 'redis'
import * as crypto from 'crypto'


export default class Redis {
    
    constructor() {
        this.client = redis.createClient()
    }

    generateToken() {
        const rand = Math.random()
        return crypto.createHash('sha256').update(String(rand)).digest('hex')
    }

    async Store(token, id) {
        try {
            const token = await this.get(id)
            await this.del(token)
        } catch (e) {

        }
        await this.set(token, id)
        await this.set(id, token)
    }

    async Verify(token) {
        try {
            return await this.get(token)
        } catch (e) {
            return -1
        }
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, val) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(val)
            })
        })
    }

    set(key, val) {
        return new Promise((resolve, reject) => {
            this.client.set(key, val, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }

    del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }
}