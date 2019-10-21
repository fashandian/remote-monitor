/*
 * @Date: 2019-10-20 13:31:47
 * @LastEditors: fashandian
 * @LastEditTime: 2019-10-20 13:41:33
 */
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(
        path.join(__dirname, './streamMedia/streamMedia.html')
    );
});

app.listen(3000, () => {
    console.log('server listening 3000 port!');
});

app.on('error', err => {
    console.error('server error', err);
});
