const AccessKey = 'client_id=7dkXoggyhxLeP-MXiXnFTu-UjWBhxP-JxlycKBQzg6g'


function cc(){
    fetch('https://api.unsplash.com/photos?'+ AccessKey)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            $('#imgList').append('<img src="'+res[i].urls.regular+'">');
        }
    })
}