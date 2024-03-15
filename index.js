const { Telegraf } = require("telegraf");
var express = require('express');
const schedule = require('node-schedule');
const rp = require('request-promise');
const cheerio = require('cheerio');


var app = express()
const bot = new Telegraf("6737661380:AAFrT233tOn6HVlwl1CIXCaTTISp9yYOb7c");
const cron = "* 5 * * * *"
var qtt = 0;

app.listen(3000, () => {
    console.log("Startando servidor na porta 3000")
    schedule.scheduleJob(cron, function () {
        console.log("Agendado")
        rp("https://core.org.br/pb/concurso-publico-core-pb/")
        .then(function(html) {
            let $ = cheerio.load(html);
            let tset = $('div.the_content', html).text().split("\n").filter( e => !e.includes('\t') || e == '');
            if(tset.length > qtt) {
                qtt = tset.length;
                bot.telegram.sendMessage(-4124493550, tset.pop() + "\n acessar em : https://core.org.br/pb/concurso-publico-core-pb/")
            }
            
        })
        .catch(function(err) {
            console.log(err);
        });
    })
})