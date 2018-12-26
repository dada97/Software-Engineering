import * as formidable from 'formidable'
import * as path from 'path'
import * as fs from 'fs'

let appRoot = path.join(path.dirname(require.main.filename), '../')

export default class File {
    constructor() {
        
    }

    parse(req) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            form.encoding       = 'utf-8'
            form.keepExtensions = true
            form.multiples      = true
            form.uploadDir      = getPath(['./uploadedFile'])
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject('file error')
                    return
                }
                resolve({ fields: fields, files: files })
            })
        })
    }

    moveFile(from,to) {
        return new Promise((resolve, reject) => {
            fs.rename(from, path.join(appRoot, to), err => {
            if (err) {
                reject('file error')
                return
            }
                resolve()
            })
        })
    }

    deleteFile(fileName){
        return new Promise((resolve,reject)=>{
            fs.unlink(path.join(appRoot, fileName) ,err=>{
                if(err){
                    reject('file error')
                    return
                }
                resolve()
            })
        })
    }

    getPath(args) {
        return path.join(path.dirname(require.main.filename), ...args)
    }


}