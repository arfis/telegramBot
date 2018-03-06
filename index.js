const { Composer, Scene } = require('micro-bot')
const request = require('request');
const commandParts = require('telegraf-command-parts');
const express = require('express');
const Telegraf = require('telegraf')


const app = new Composer()
const port = 3001;
const api  = express();

const greeter = new Scene('greeter')

// const bot = new Telegraf("548487175:AAEtKWHfAfpPc7g_IeEBBh1IMMu3tyGl_pk");

app.use(commandParts());
greeter.enter((ctx) => ctx.reply('Hi'))


app.command('/define', (ctx) => {

    const tctx = ctx;
    const searchWord = ctx.state.command.args;
    request(`http://bitcoach.net/api/wp-json/acf/v3/translate?word=${searchWord}`, function (error, response, body) {
        const received = JSON.parse(body);

        if (received.translation) {
            tctx.reply(`slovo ${searchWord.toUpperCase()} znamena: "${received.translation}"`)
        } else {
            tctx.reply('nepoznam preklad :(');
        }
    });
})

app.hears('/robo', (ctx) => ctx.reply('co picujes kares'))
app.hears('/lubos', (ctx) => ctx.reply('kryptooo!'))
app.hears('/tibor', (ctx) => ctx.reply('vysoky kares!'))
app.command('/help', ({ reply }) => reply('when one of there words are used, telegram will respond: "/lubos", "/tibor", "/robo'))


module.exports = (ctx) => {
    api.listen(port, () => {
        console.log('We are live on ' + port);
});

    api.post('/notes', (req, res) => {
        // You'll create your note here.
        ctx.reply('A POST WAS MADE');
    res.send('Hello')
});
}
