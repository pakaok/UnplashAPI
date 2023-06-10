const AccessKey = 'client_id=7dkXoggyhxLeP-MXiXnFTu-UjWBhxP-JxlycKBQzg6g'
function setUpperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function cc(){
    fetch('https://api.unsplash.com/photos?page=1&per_page=20&'+ AccessKey)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        for (let i = 0; i < 5; i++) {
            $('#imgList1').append('<div class="imgItem"><a href="'+res[i].links.html+
            '"target="_blank"><img src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br><br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        for (let i = 5; i < 10; i++) {
            $('#imgList2').append('<div class="imgItem"><a href="'+res[i].links.html+
            '"target="_blank"><img src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br><br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        for (let i = 10; i < 15; i++) {
            $('#imgList3').append('<div class="imgItem"><a href="'+res[i].links.html+
            '"target="_blank"><img src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br><br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        for (let i = 15; i < 20; i++) {
            $('#imgList4').append('<div class="imgItem"><a href="'+res[i].links.html+
            '"target="_blank"><img src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br><br>'+res[i].user.name +'</span>'+'</a></div>');
        }
    })
}