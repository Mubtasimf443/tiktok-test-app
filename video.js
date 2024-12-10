/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/


let btn =document.querySelector('.upload'),
input =document.querySelector('input');

btn.addEventListener('click', function(event) {
    if (input.files.length===0) return
    if (input.files[0].type!=='video/mp4') return alert('video is not mp4')
    let form =new FormData();
    form.append('video', input.files[0]);
    form.append('title', 'Testing a video');
    fetch(window.location.origin+'/video-upload', {
        method:'POST',
        body:form
    })
    
})