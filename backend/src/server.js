import * as http from 'http'

import Parser from './parser'
import cors       from './cors'
import Request    from './request'
import Response   from './response'
import Router     from './router'

import AccountRouter from './routes/accountRouter.js'

const router = new Router()

const corsConfig = {
    origin: '*',
    credentials: true
}

router.use(Parser)
router.use(cors(corsConfig))

router.use('/account',  AccountRouter)


const server = http.createServer(async (req, res) => {
    const request  = new Request(req)
    const response = new Response(res)
    if (!(await router.Match(request, response))) {
        res.writeHead(400)
        res.end()
    }
})

server.listen(3000)
server.on('listening', () => {
    console.log('Node.js web server at localhost:3000 is running...')
})