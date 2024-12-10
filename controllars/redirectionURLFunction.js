/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/


export  const redirectionURLFunction = () => {
    return (
        `https://www.tiktok.com/v2/auth/authorize?`
        +`client_key=${Tiktok_key}`
        +`&scope=user.info.basic`
        +'&response_type=code'
        +`&redirect_uri=${redirect_url}`
        +`&state=${Math.random().toString(36).substring(2)}`
    )
}
