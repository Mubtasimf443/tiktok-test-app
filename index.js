/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/


import { log } from 'console';
import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'

const app=express();
const __dirname =path.dirname(fileURLToPath(import.meta.url));

let 
Tiktok_key='sbawlckvhm82juhm5x',
tiktok_secret="GnAFzlruZRyLY6rgmu4L1UDLR0S85AN4",
redirect_url='https://tiktok-video-upload-app.onrender.com/callback';

const redirectionURLFunction = () => encodeURI(`https://www.tiktok.com/v2/auth/authorize?${Tiktok_key}=&response_type=code&scope=user.info.basic&redirect_uri=${redirect_url}&state=${Math.random().toString(36).substring(2)}`);


app.get('/home', function(req,res) {
    res.sendFile( path.resolve(__dirname, './index.html'))
})
app.get('/get-code', (req,res) =>  res.redirect(redirectionURLFunction()))


app.get('/callback',async function(req,res){
    log(req.query);
    res.sendStatus(200)
})


app.listen(3000, e => log("Thanks to Allah Subhanahu Oa Ta'ala, Server is working"));

export {__dirname}