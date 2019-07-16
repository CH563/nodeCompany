import * as http from 'http';
import toQuery from './mysql';

const login = (result: string, response: http.ServerResponse): void => {
    const params: {
        username: string;
        password: string;
    } = JSON.parse(result);
    const { username, password } = params;
    if (!username) {
        response.write(JSON.stringify({
            code: -1,
            message: '缺少username'
        }));
        response.end();
        return;
    }
    if (!password) {
        response.write(JSON.stringify({
            code: -1,
            message: '缺少password'
        }));
        response.end();
        return;
    }
    // 查询 user 表
    const readSql = `SELECT * FROM user Where user_name = "${username}"`;
    toQuery(readSql).then((res) => {
        console.log('SQL 查询结果：');
        // 将结果先去掉 RowDataPacket，再转换为 json 对象
        const userList = JSON.parse(JSON.stringify(res));
        console.log(userList);
        const isReplace = userList.length;
        if (!isReplace) {
            response.write(JSON.stringify({
                code: -1,
                message: '用户还没注册'
            }));
            response.end();
            return;
        }
        if (userList[0].password === password) {
            response.write(JSON.stringify({
                code: 0,
                message: '登录成功'
            }));
            response.end();
            return;
        }
        response.write(JSON.stringify({
            code: -1,
            message: '密码错误'
        }));
        response.end();
    });
};

export default login;