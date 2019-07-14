import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'company'
});

// 连接数据库
connection.connect();

const toQuery = (sql: string, data: any = []) => new Promise((resolve, reject) => {
    connection.query(sql, data, (error: Error, res: Response) => {
        if (error) {
            throw error;
        } else {
            resolve(res);
        }
    })
})

export default toQuery;