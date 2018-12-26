import * as http from 'http'
import * as fs from 'fs'
import * as url from 'url'

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
        //var pathname = url.parse(request.url).pathname;
        //res.writeHead(400)
        fs.readFile(request.path[0], function (err, data) {
            if (err) {
               console.log(err);
               // HTTP 状态码: 404 : NOT FOUND
               // Content Type: text/plain
               res.writeHead(404, {'Content-Type': 'text/html'});
            }else{             
               // HTTP 状态码: 200 : OK
               // Content Type: text/plain
               res.writeHead(200, {'Content-Type': 'text/html'});    
               
               // 响应文件内容
               res.write(data.toString());        
            }
            //  发送响应数据
            res.end();
        })
        //res.end()
    }
})

server.listen(3000)
server.on('listening', () => {
    console.log('Node.js web server at localhost:3000 is running...')
})