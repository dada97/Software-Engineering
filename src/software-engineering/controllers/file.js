import FileService from '../services/fileService.js'

export default class File {
    constructor() {
        this.getFile = this.getFile.bind(this)
    }

    async getFile(req, res) {
        try {
            res.status(200).sendFile(FileService.getPath(['./uploadedFiles', req.params.filePath]))
        } catch (e) {
            res.status(400).json({ error: 'get file error' })
        }
    }
}