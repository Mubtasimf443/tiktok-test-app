/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/

import { TIKTOK_KEY, TIKTOK_REDIRECT_URI } from "./ENV.js"


export  const redirectionURLFunction = () => {
    return (
        `https://www.tiktok.com/v2/auth/authorize?`
        +`client_key=${TIKTOK_KEY}`
        +`&scope=user.info.basic`
        +'&response_type=code'
        +`&redirect_uri=${TIKTOK_REDIRECT_URI}`
        +`&state=${Math.random().toString(36).substring(2)}`
    )
}
