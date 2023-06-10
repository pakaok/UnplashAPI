const AccessKey = 'client_id=7dkXoggyhxLeP-MXiXnFTu-UjWBhxP-JxlycKBQzg6g'
function setUpperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const perPageNum = 7
var pNum = 1
const callback = (entries,observer)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting){
            random_fetchAPI(pNum,30)
        }
    })
}

const ob=document.querySelector('#copyRight')
const option= {
    root:null,
    rootMargin: '0px',
    threshhold:0
}

$(document).ready(function(){
    random_fetchAPI(pNum,30)
    const observer = new IntersectionObserver(callback,option)
    observer.observe(ob)
  });

const ob1=document.querySelector('#imgItem7')
const ob2=document.querySelector('#imgItem14')
const ob3=document.querySelector('#imgItem21')
const ob4=document.querySelector('#imgItem28')



function random_fetchAPI(pageNum=1,perPage){
    // $("#imgList1").empty();
    // $("#imgList2").empty();
    // $("#imgList3").empty();
    // $("#imgList4").empty();
    fetch('https://api.unsplash.com/photos?page='+pageNum+'&per_page='+perPage+'&'+ AccessKey)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        for (let i = 0; i < perPageNum; i++) {
            $('#imgList1').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass1" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        for (let i = perPageNum; i < 2*perPageNum; i++) {
            $('#imgList2').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass2" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        for (let i = 2*perPageNum; i < 3*perPageNum; i++) {
            $('#imgList3').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass3" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        for (let i = 3*perPageNum; i < 4*perPageNum; i++) {
            $('#imgList4').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass4" src="'+res[i].urls.regular+'">'+
            '<span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
      $(".imgClass1").fadeIn(500);
      $(".imgClass2").fadeIn(900);
      $(".imgClass3").fadeIn(1300);
      $(".imgClass4").fadeIn(1700);
      pNum++
    })
}