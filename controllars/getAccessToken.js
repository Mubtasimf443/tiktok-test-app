/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/

import fetch from "node-fetch";
import { TIKTOK_SECRET ,TIKTOK_KEY,TIKTOK_REDIRECT_URI} from "./ENV.js";
import {log} from 'console'

export async function getAccessToken(code) {
    try {
        let object={
            code:code,
            client_key:TIKTOK_KEY,
            client_secret:TIKTOK_SECRET,
            grant_type :'authorization_code',
            redirect_uri :TIKTOK_REDIRECT_URI
        };
        let urlencoded= new URLSearchParams(object)
        let response=await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method :'POST',
            headers :{
                'Content-Type':'application/x-www-form-urlencoded',
                'Cache-Control':'no-cache'
            },
            body :urlencoded.toString()
        });
        response=await response.json();
        log(response)
        if (response.error) {
            return {
                hasError :true,
                error :response.error
            }
        }
        return {
            hasError:false,
            data:response
        }
    } catch (error) {
        console.error(error);
        return {
            hasError :true,
            error :error
        }
    }
}

