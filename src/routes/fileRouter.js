import Router from '../router'

import FileController from '../software-engineering/controllers/file.js'

class File extends Router {
    constructor() {
        super()
        this.controller = new FileController()
        this.init()
    }

    init() {
        this.get('/:filePath', this.controller.getFile)
    }
}

const FileRouter = new File()
export default FileRouter.Match.bind(FileRouter)