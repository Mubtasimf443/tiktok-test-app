/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  Insha Allah 
By his marcy,  I will gain success
*/

import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema({
    date_of_online_class:{
        date :String,
    },
    date_of_regular_class:{
        date :String,
    },
    date_of_womens_defence_class:{
        date :String,
    },
    home_video_url:String,
    youtube_refresh_token:String,
    youtube_token:String,
    
    //meta products
    fb_access_token_enroll_date:Number,
    fb_access_token:String,
    fb_page_id :String,
    fb_page_access_token:String,
    instagram_access_token_status:Boolean,
    fb_access_token_status:Boolean,
    instagram_user_id:String,
    fb_user_id:String,

    linkedin_access_token:String,
    linkedin_organization:String,
    linkedin_refresh_token:String,
    instagram_token:String,
    tiktok_access_token:String,
    tiktok_refresh_token :String,
    tiktok_access_token_status:Boolean,
    youtube_access_token_status:Boolean,
    linkedin_access_token_status:Boolean,
   
});


const Settings=mongoose.model('settings', settingsSchema);





export async function settingsAsArray(array) {
    let settings=await Settings.findOne({});
    if (!settings) throw new Error("settings is null");
    let newArray=[];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (!settings[element]) throw new Error("Invalid element "+element);
        newArray.push(settings[element]);
    }
    return newArray
}

export default Settings ;