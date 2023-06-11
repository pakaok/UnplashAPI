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
var throttle = true
const callback = (entries,observer)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting&&throttle){
            throttle=false
            observer.disconnect()
            if(!searchState){
                random_fetchAPI(pNum,28)
            }else{
                search_fetchAPI(pNum,28,$('.dropBtn').text().toLowerCase(),$('#searchWord').val())
            }
        }
    })
}
// var color = $('.drop-Content').on('click',()=>{

// })
var color = ''
$('.drop-Content span').click(function () {
    if ($(this).text()!='None'){
        color= $(this).text()
        $('.dropBtn').text(color);
        $('.dropBtn').css('background-color', $(this).css('background-color'));
        $('.dropBtn').css('color', $(this).css('color'));
        console.log(color)   
    }else{
        color = ''
        $('.dropBtn').text('None');
        $('.dropBtn').css('background-color', $(this).css('background-color'));
        $('.dropBtn').css('color', $(this).css('color'));
    }
});
const option= {
    root:null,
    rootMargin: '0px',
    threshhold:0
}
const observer = new IntersectionObserver(callback,option)

$(document).ready(function(){
    random_fetchAPI(pNum,28)
    $('#searchButton').click(function(){
        $('#imgList1').empty();
        $('#imgList2').empty();
        $('#imgList3').empty();
        $('#imgList4').empty();
        pNum=1
        search_fetchAPI(pNum,28,$('.dropBtn').text().toLowerCase(),$('#searchWord').val())
    })
  });

function random_fetchAPI(pageNum=1,perPage){
    fetch('https://api.unsplash.com/photos?page='+pageNum+'&per_page='+perPage+'&'+ AccessKey)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        after_Fetch(res)
        console.log(pNum)
    })
}
var searchState=false
function search_fetchAPI(pageNum=1,perPage,color='',keyword=''){
    var query='&query='
    var qColor = '&color='
    if(keyword!=''){query += keyword}else{query = ''}
    if(color!=''&&color!='none'&&color!='color'){qColor += color}else{qColor = ''}
    if(color=='b & w'){qColor = '&color=black_and_white'}
    if (query){
        fetch('https://api.unsplash.com/search/photos?page='+pageNum+'&per_page='+perPage+
        query+qColor+
        '&'+ AccessKey)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            console.log('https://api.unsplash.com/search/photos?&page='+pageNum+'&per_page='+perPage+
            query+qColor+
            '&'+ AccessKey)
            if(res.total==0){
                $('main').append('<h1 style="margin:0 auto 10% auto;width:30%;color:gray;text-align:center;font-size:5em">No Result</h1>')
                return;
            }
            after_Fetch(res.results)
            console.log(pNum)
            searchState=true
            
        })
        // .catch(err => {console.log(err)})
    }else{
        random_fetchAPI(pNum,28)
    }
}

function after_Fetch(res){
    for (let i = 0; i < perPageNum; i++) {
        if(typeof res[i]!='undefined'){
            $('#imgList1').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass1" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
    }
    for (let i = perPageNum; i < 2*perPageNum; i++) {
        if(typeof res[i]!='undefined'){
            $('#imgList2').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass2" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
    }
    for (let i = 2*perPageNum; i < 3*perPageNum; i++) {
        if(typeof res[i]!='undefined'){
            $('#imgList3').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass3" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        
    }
    for (let i = 3*perPageNum; i < 4*perPageNum; i++) {
        if(typeof res[i]!='undefined'){
            $('#imgList4').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass4" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
    }
    observeImg()
    setTimeout(() => {
        throttle=true
    }, 500);
    pNum++
}

function observeImg(){
    observer.observe(document.getElementById("imgList1").lastElementChild)
    observer.observe(document.getElementById("imgList2").lastElementChild)
    observer.observe(document.getElementById("imgList3").lastElementChild)
    observer.observe(document.getElementById("imgList4").lastElementChild)
}