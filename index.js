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
import  Settings  from './models/settings.js';
import { BASE_URL, TIKTOK_KEY, TIKTOK_REDIRECT_URI, TIKTOK_SECRET } from './controllars/ENV.js';
import { redirectionURLFunction } from './controllars/redirectionURLFunction.js';
import { getAccessToken } from './controllars/getAccessToken.js';
import formidable from 'formidable';
import morgan from 'morgan'

const app=express();
const __dirname =path.dirname(fileURLToPath(import.meta.url));

await connectDB()




app.get('/home', (req,res) => res.sendFile( path.resolve(__dirname, './index.html')))
app.get('/video-upload', (req,res) => res.sendFile( path.resolve(__dirname, './video.html')))



app.get('/get-code', (req,res) =>  res.redirect(redirectionURLFunction()))


app.get('/callback',async function(req,res){
    try {
        log(req.query);
        if (req.query.code) {
            let response= await getAccessToken(req.query.code);
            if (response.hasError) throw response.error;
            if (response.data) {
                let settings=await Settings.findOne({});
                if (!settings) return res.send('settings is null')
                if (settings){
                    settings.tiktok_access_token_status=true;
                    settings.tiktok_access_token=response.data.access_token;
                    settings.tiktok_refresh_token=response.data.refresh_token;
                    await settings.save();
                    return res.status(200).send('YES , YAH , FINALY TIKTOK API ACCESS TOKEN IS SAVED')
                }
            }
        }
    } catch (error) {
        console.error(error);
        return res.send('error happened')
    }

})


app.post('/video-upload', morgan('dev'),(req,res)=> {
    log("video upload started")
    try {
        let DontSuffortMime = false;
        let options = {
            uploadDir: path.resolve(__dirname,'./temp'),
            maxFiles: 1,
            allowEmptyFiles: false,
            maxFileSize: 250 * 1024 * 1024,
            filter: (file) => {
                if (file.mimetype === 'video/mp4') return true
                DontSuffortMime = true
                return false
            },
            filename: () => (Date.now() +'.mp4')
        };
        formidable(options).parse(req,async function(error ,fields,files){
            try {
                if (error) {
                    log(error)
                    throw error
                }
                if (DontSuffortMime) throw 'server_video_upload_error: mime type not supported'
                if (!fields.title) throw 'server_video_upload_error: title not given'
                if (!files.video) throw 'server_video_upload_error: video not given'
                let 
                title =fields.title[0],
                video_name=files.video[0].newFilename;
                log(fields)
                log(files)
                let video_url=BASE_URL+'/temp/'+video_name;
                let settings=await Settings.findOne({});
                if (!settings) throw 'server_video_upload_error: settings is null'
                if (!settings.tiktok_access_token_status) throw 'server_video_upload_error: tiktok access token status is false'
                return res.status(201).json({
                    hasError:false,
                    publish_id :'iwedkl83829'
                })
                let response=await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
                    method :'POST',
                    headers :{
                        'Content-Type':'application/json',
                        'Authorization':` Bearer ${settings.tiktok_access_token}`
                    },
                    body:JSON.stringify({
                        source_info:{
                            source:'PULL_FROM_URL',
                            video_url 
                        }
                    })
                });
                response=await response.json();
                log({response})
                if (response.data) {
                    return res.json({
                        hasError:false,
                        publish_id :response.data.publish_id
                    })
                }
                if (response.error) {
                    return {
                        hasError:true,
                        error :response.error
                    }
                }

            } catch (error) {
                log(error)
                if (typeof error ==='string') {
                    if (error.includes('server_video_upload_error')) {
                        let massage=error.replace('server_video_upload_error:','');
                        return res.json({
                            error :{
                                name :'video upload error',
                                massage :massage
                            }
                        })
                    }
                    else {
                        return res.send('server error')
                    }
                } 
                else {
                    return res.send('server error')
                }
            }
        })
    } catch (error) {
        
    }
})

app.use('/temp', express.static(path.resolve(__dirname, './temp')))
app.listen(3000, e => log("Thanks to Allah Subhanahu Oa Ta'ala, Server is working"));

export {__dirname}