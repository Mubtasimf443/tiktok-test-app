/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/
import fetch from "node-fetch";
import {log} from 'console'

export default class Tiktok {
    constructor({key,secret,redirect_uri,scope}){ 
        this.key=key;
        this.secret=secret;
        this.redirect_uri=redirect_uri;
        this.scope=scope || ['user.info.basic'] ;
    }
    getAuthUrl(){
        let 
        client_key=this.key, 
        redirect_uri=this.redirect_uri, 
        scope=this.scope;
        let params=(new URLSearchParams({
            scope :scope.join(','),
            client_key,
            redirect_uri,
            state:Math.random().toString(36).substring(2),
            response_type:'code'
        })).toString();
        return ( `https://www.tiktok.com/v2/auth/authorize?` +params);
    };
    async getAccessToken(code){
        let 
        client_key=this.key, 
        redirect_uri=this.redirect_uri, 
        client_secret=this.secret,
        grant_type ='authorization_code';
        let urlencodedData = (new URLSearchParams({
            code: code,
            client_key,
            redirect_uri,
            client_secret,
            grant_type
        })).toString();
        let response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: urlencodedData
        });
        response=await response.json().catch(error => {
            return {
                error :{
                    name :'error in json parsing',
                    massage :"can't parse json"
                }
            }
        });
        if (response.data) {
            if (response.data.access_token && response.data.refresh_token) {
                return {
                    access_token:response.data.access_token ,
                    refresh_token: response.data.refresh_token
                }
            } else if (!(response.data.access_token && response.data.refresh_token)) {
                throw response;
            }
        }
        if (response.error) {
            return {
                hasError :true,
                error :response.error
            }
        };
        throw response;
    };
    Account=Account;
}

class Account {
    constructor(accessToken) {
        this.accessToken=accessToken;
    }
    async initVideoOnInbox(video_url) {
        let accessToken=this.accessToken;
        let response=await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${accessToken}`
            },
            body: JSON.stringify({
                source_info: {
                    source: 'PULL_FROM_URL',
                    video_url
                }
            })
        });
        response = await response.json().catch(error => { return { error: { name: 'error in json parsing', massage: "can't parse json" } } });
        log(response);
        return response;
           
    }
}