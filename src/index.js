const AccessKey = 'client_id=7dkXoggyhxLeP-MXiXnFTu-UjWBhxP-JxlycKBQzg6g'
function setUpperCase(string="No description") 
{
    if (string!=null){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }else{
        return "No description"
    }
}
const perPageNum = 7
var pNum = 1
const callback = (entries,observer)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting){
            random_fetchAPI(pNum,28)
        }
    })
}
// var color = $('.drop-Content').on('click',()=>{

// })
var color = ''
$('.drop-Content span').click(function (e) { 
    var color= $(this).text()
    $('.dropBtn').css('background-color', $(this).css('background-color'));
    console.log(color)    
});
const option= {
    root:null,
    rootMargin: '0px',
    threshhold:0
}
const observer = new IntersectionObserver(callback,option)
$(document).ready(function(){
    random_fetchAPI(pNum,28)
  });

function random_fetchAPI(pageNum=1,perPage){
    fetch('https://api.unsplash.com/photos?page='+pageNum+'&per_page='+perPage+'&'+ AccessKey)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        observer.disconnect()
        for (let i = 0; i < perPageNum; i++) {
            $('#imgList1').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass1" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
            observer.observe(document.getElementById("imgList1").lastElementChild)
        for (let i = perPageNum; i < 2*perPageNum; i++) {
            $('#imgList2').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass2" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
            observer.observe(document.getElementById("imgList2").lastElementChild)
        for (let i = 2*perPageNum; i < 3*perPageNum; i++) {
            $('#imgList3').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass3" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        observer.observe(document.getElementById("imgList3").lastElementChild)
        for (let i = 3*perPageNum; i < 4*perPageNum; i++) {
            $('#imgList4').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass4" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        observer.observe(document.getElementById("imgList4").lastElementChild)

      pNum++
      console.log(pNum)
    })
}