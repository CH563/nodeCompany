import * as mysql from 'mysql';
import * as http from 'http';
import * as url from 'url';
import * as qs from 'querystring';
import * as dayjs from 'dayjs';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'company'
});

// 连接数据库
connection.connect();

// 创建服务
console.log('创建web');
http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    // cors跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // header类型
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // 跨域允许的请求方式
    response.setHeader('Content-Type', 'application/json');

    const { method } = request;

    // 处理post请求
    if (method === 'POST') {
        console.log('POST 请求');
        const pathName = request.url;
        console.log(`接口为：${pathName}`);
        let tempResult: string = '';

        // 数据开始接入
        request.addListener('data', chunk => {
            tempResult += chunk;
        });

        // 数据接入完成
        request.addListener('end', () => {
            const result: string = JSON.stringify(qs.parse(tempResult));
            console.log('参数为：');
            console.log(result);

            switch (pathName) {
                case '/sendMessage':
                    console.log('送发留言');
                    break;
                case '/login':
                    console.log('登录');
                    break;
                case '/register':
                    console.log('注册');
                    break;
                default:
                    console.log(`找不到 ${pathName} 模块`);
            }
        });
        return;
    }

    // 处理get请求
    if (method === 'GET') {
        console.log('get请求');

        // 解析 url 接口
        const pathName = url.parse(request.url).pathname;
        console.log(`接口为${pathName}`);

        if (pathName === '/getMessage') {
            console.log('获取留言信息');
            return;
        }
        if (pathName === '/') {
            response.writeHead(200, {
                'Content-Type': 'text/html;charset=UTF-8'
            });
            response.write('<h4>服务已开启</h4>');
        }
        response.end();
    }
}).listen(8888); // 监听8888端口
