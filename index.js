/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/


import { log } from 'console';
import express, { response } from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import fetch from 'node-fetch'
import { connectDB } from './controllars/ConnectDb.js';
import  Settings, { settingsAsArray }  from './models/settings.js';
import { BASE_URL, TIKTOK_KEY, TIKTOK_REDIRECT_URI, TIKTOK_SECRET } from './controllars/ENV.js';
import { redirectionURLFunction } from './controllars/redirectionURLFunction.js';
import { getAccessToken } from './controllars/getAccessToken.js';
import formidable from 'formidable';
import morgan from 'morgan'
import Tiktok from './Tiktok.js';
import catchError, { namedErrorCatching } from './controllars/CatchError.js';

const app=express();
const __dirname =path.dirname(fileURLToPath(import.meta.url));

let tiktok=new Tiktok({
    key :TIKTOK_KEY,
    secret:TIKTOK_SECRET,
    redirect_uri :TIKTOK_REDIRECT_URI,
    scope :['user.info.basic','video.upload','video.publish']
})


app.get('/auth',async function (req,res){
    return res.redirect(tiktok.getAuthUrl());
});
app.get('/callback',async function (req,res){
    try {
        if (!req.query.code) namedErrorCatching('code not found','code not found');
        let {access_token,refresh_token}=await tiktok.getAccessToken(req.query.code)
        let S=await Settings.findOne({});
        S.tiktok_access_token=access_token;
        S.tiktok_refresh_token= refresh_token;
        S.tiktok_access_token_status=true;
        await S.save();
        return res.json({
            access_token,
            refresh_token
        });

    } catch (error) {
        console.error(error)
        try {
            await Settings.findOneAndUpdate({}, {tiktok_access_token_status :false,tiktok_access_token:"",tiktok_refresh_token:"", }).then(d => log('data updated'));
        } catch (error) {
            console.error(error);
        }
        return catchError(res,error);
    }
});
app.get('/tiktok',async function (req,res) {
    try {
        let [status,access_token]=await settingsAsArray(["tiktok_access_token_status","tiktok_access_token"]);
        if (!status) namedErrorCatching('auth_error', 'you are not authenticated');
        let Account=new tiktok.Account(access_token);
        let data=await Account.initVideoOnInbox('https://gojushinryu.com/video-for-download');
        return res.json({data});
    } catch (error) {
        console.error(error)
        return catchError(res,error);
    }
})

app.listen(3000,()=>{
    log('server is running alhamdulellah')
})