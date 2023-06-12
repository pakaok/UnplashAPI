const AccessKey = '7dkXoggyhxLeP-MXiXnFTu-UjWBhxP-JxlycKBQzg6g'

var searchState=false
const option= {
    root:null,
    rootMargin: '0px',
    threshhold:0
}
var color = ''
const perPageNum = 7
var pNum = 1
var throttle = true // to avoid multiple fetch()
const callback = (entries,observer)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting&&throttle){
            throttle=false
            observer.disconnect()
            if(!searchState){//if not search mode
                random_fetchAPI(pNum,28)
            }else{//if search mode
                search_fetchAPI(pNum,28,$('.dropBtn').text().toLowerCase(),$('#searchWord').val())
            }
        }
    })
}
const observer = new IntersectionObserver(callback,option)


$('.drop-Content span').click(function () {//color selection in html
    if ($(this).text()!='None'){
        color= $(this).text()
        $('.dropBtn').text(color);
        $('.dropBtn').css('background-color', $(this).css('background-color'));
        $('.dropBtn').css('color', $(this).css('color'));
        $('.drop-Content').css('display','')
    }else{
        color = ''
        $('.dropBtn').text('None');
        $('.dropBtn').css('background-color', $(this).css('background-color'));
        $('.dropBtn').css('color', $(this).css('color'));
    }
});

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
    fetch('https://api.unsplash.com/photos?page='+pageNum+'&per_page='+perPage+'&client_id='+ AccessKey)
    .then((res)=>{
        if(res.status==200&&res.ok){
            return res.json()
        }else if(res.status==401){
            observer.disconnect()
            alert("401:Invalid Access Token. Update Access Token")
        }else if(res.status==403){
            observer.disconnect()
            alert("403:Rate Limit. Update Access Token or Increase Rate limit")
        }else if(res.status==404){
            observer.disconnect()
            alert("404:The requested resource does not exist")
        }else if(res.status==500||res.status==503){
            observer.disconnect()
            alert("Unknown Error")
        }
    })
    .then((res)=>{
        after_Fetch(res)
    })
}
function search_fetchAPI(pageNum=1,perPage,color='',keyword=''){
    var query='&query='
    var qColor = '&color='
    if(keyword!=''){query += keyword}else{query = ''}
    if(keyword.indexOf('&')>-1){
        alert('Keyword cannot contain "&"')
        random_fetchAPI(pNum,28)
        return;
    }
    if(color!=''&&color!='none'&&color!='color'){qColor += color}else{qColor = ''}
    if(color=='b & w'){qColor = '&color=black_and_white'}
    if (query){
        fetch('https://api.unsplash.com/search/photos?page='+pageNum+'&per_page='+perPage+
        query+qColor+
        '&client_id='+ AccessKey)
        .then((res)=>{
            if(res.status==200&&res.ok){
                return res.json()
            }else if(res.status==401){
                observer.disconnect()
                alert("401:Invalid Access Token. Update Access Token")
            }else if(res.status==403){
                observer.disconnect()
                alert("403:Rate Limit. Update Access Token or Increase Rate limit")
            }else if(res.status==404){
                observer.disconnect()
                alert("404:The requested resource does not exist")
            }else if(res.status==500||res.status==503){
                observer.disconnect()
                alert("Unknown Error")
            }
        })
        .then((res)=>{
            if(res!=undefined&&res.total==0){//when no result
                if(!$('#noresult').length){
                    $('main').append('<h1 id="noresult" style="margin:0 auto 10% auto;width:30%;color:gray;text-align:center;font-size:5em">No Result</h1>')
                }
                return;
            }
            if(res!=undefined&&res.results.length==0){//if no more results, stop automatic fetch()
                observer.disconnect()
                return;
            }
            if(res!=undefined&&res.results!=undefined){
                after_Fetch(res.results)
            }
            // console.log(pNum)
            searchState=true//intersectionObserver will load remaining search results if this value is true.
        })
    }else{
        random_fetchAPI(pNum,28)
    }
}

function after_Fetch(res){
    for (let i = 0; i < perPageNum; i++) {
        if(typeof res!='undefined'&& typeof res[i]!='undefined'){
            $('#imgList1').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass1" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
    }
    for (let i = perPageNum; i < 2*perPageNum; i++) {
        if(typeof res!='undefined'&& typeof res[i]!='undefined'){
            $('#imgList2').append('<div id="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass2" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
    }
    for (let i = 2*perPageNum; i < 3*perPageNum; i++) {
        if(typeof res!='undefined'&& typeof res[i]!='undefined'){
            $('#imgList3').append('<div class="imgItem'+(i+1)+'"><a href="'+res[i].links.html+
            '"target="_blank"><img class="imgClass3" src="'+res[i].urls.regular+'"><span id="imgDesc">'+
            setUpperCase(res[i].alt_description) +'<br> by <br>'+res[i].user.name +'</span>'+'</a></div>');
        }
        
    }
    for (let i = 3*perPageNum; i < 4*perPageNum; i++) {
        if(typeof res!='undefined'&& typeof res[i]!='undefined'){
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

function observeImg(){//if any end of photo columns is visible, then intersec callback() runs  
    if(document.getElementById("imgList1").lastElementChild){
        observer.observe(document.getElementById("imgList1").lastElementChild)
    }
    if(document.getElementById("imgList2").lastElementChild){
        observer.observe(document.getElementById("imgList2").lastElementChild)
    }
    if(document.getElementById("imgList3").lastElementChild){
        observer.observe(document.getElementById("imgList3").lastElementChild)
    }
    if(document.getElementById("imgList4").lastElementChild){
        observer.observe(document.getElementById("imgList4").lastElementChild)
    }
}
function setUpperCase(string="No description") 
{
    if (string!=null){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }else{
        return "No description"
    }
}