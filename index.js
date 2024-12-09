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


app.get('/home', function(req,res) {
    res.sendFile( path.resolve(__dirname, './index.html'))
})

app.listen(3000, e => log("Thanks to Allah Subhanahu Oa Ta'ala, Server is working"));

export {__dirname}