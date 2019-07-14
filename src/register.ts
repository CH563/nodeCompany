import * as http from 'http';
import toQuery from './mysql';
import * as dayjs from 'dayjs';

// 注册
const register = (result: string, response: http.ServerResponse): void => {
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
    new Promise((resolve, reject) => {
        // SQL语句查询USER表所有
        const readSql = `SELECT * FROM user Where user_name = "${username}"`;
        toQuery(readSql).then((res) => {
            console.log('SQL 查询结果：');
            // 将结果先去掉 RowDataPacket，再转换为 json 对象
            const newRes = JSON.parse(JSON.stringify(res));
            console.log(newRes);
            const isReplace = newRes.length;
            if (isReplace) {
                response.write(JSON.stringify({
                    code: -1,
                    message: '注册失败，姓名重复！'
                }));
                response.end();
            } else {
                resolve();
            }
        });
    }).then(() => {
        // 新增的 SQL 语句及新增的字段信息
        const addSql = 'INSERT INTO user(user_name,user_password, time) VALUES(?,?,?)';
        const addParams = [username, password, dayjs().format('YYYY:MM:DD HH:mm:ss')];
        toQuery(addSql, addParams).then(res => {
            console.log(res);
            console.log('注册成功');
            response.write(JSON.stringify({
                code: 0,
                message: '注册成功！'
            }));
            response.end();
        })
    });
}

export default register;