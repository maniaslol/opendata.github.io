var data='';//資料放置的地方
getData();//取得資料
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
    xhr.send(null);
    xhr.onload=function(){
        if(xhr.status==200){
            console.log(xhr);
            data = JSON.parse(xhr.responseText);
            console.log(data);
        }
    }  
}
var option = document.getElementById('district')//下拉選單
var hitoCard = document.getElementById('hito-card');//熱門選單的卡片
var content = document.querySelector('.content');//印製卡片位置
var page = document.getElementById('page');//資料頁區
var num = 0;//資料總數
var pagenow = 1;//當下資料頁
var pagemax = 0;//資料頁最大值

option.addEventListener('change', showtime);//監聽下拉選單
option.addEventListener('mousemove', updateList,{once:true});//更新下拉選單
hitoCard.addEventListener('click', showtime);//監聽熱門選單區
page.addEventListener('click', changepage);//監聽資料頁區

function updateList(){
    let dataList=[];
    let str='<option class="select-o" value="請選擇行政區!!">--請選擇行政區--</option>';
    data.result.records.forEach(function(i){
        dataList.push(i.Zone);
    });
    dataList=dataList.filter(function(el,i){
        return dataList.indexOf(el)===i;
    });
    dataList.forEach(function(el,i){
        str+=`<option class="select-o" value="${dataList[i]}">${dataList[i]}</option>`;
    });
    console.log(str);
    option.innerHTML=str;
};
function showtime(e) {
    var targetValue = e.target.value;//下拉選單變換的值
    var len = data.result.records.length;//資料總數
    var targetinnerhtml = e.target.innerHTML;//熱門區選取到的HTML內容 EX:三民區
    var str = '';//過濾後資料字串
    var strnum = '';//資料頁區字串
    var h3 = targetValue || targetinnerhtml;
    num = 0;//資料數
    pagenow = 1;//當下頁面
    e.preventDefault();
    if(e.target.nodeName=='A'||e.target.nodeName=='SELECT' ){//確定選取資料來自下拉選單或是熱門區
        for (var i = 0; len > i; i++) { 
            // 
            // var picture = data.result.records[i].Picture1;
            // var name = data.result.records[i].Name;
            // var zone = data.result.records[i].Zone;
            // var opentime = data.result.records[i].Opentime;
            // var add = data.result.records[i].Add;
            // var tel = data.result.records[i].Tel;
            // var ticket = data.result.records[i].Ticketinfo;
            if(targetValue == data.result.records[i].Zone) {
            num += 1;//每次取的資料的記數
            if (data.result.records[i].Ticketinfo == "" && num <= 4) { //有無免費票過濾，一次最多顯示4筆資料
                str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div></div>';
            } else if (num <= 4) {
                str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div><div class="card-mark"><div class="mark-icon"></div><p>' + data.result.records[i].Ticketinfo + '</p></div></div>';
            }
            }
            else if(targetinnerhtml == data.result.records[i].Zone){
            option.value = targetinnerhtml;//把熱門區資料上傳到下拉選單    
            num += 1;
            if (data.result.records[i].Ticketinfo == "" && num <= 4) {
                str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div></div>';
            } else if (num <= 4) {
                str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div><div class="card-mark"><div class="mark-icon"></div><p>' + data.result.records[i].Ticketinfo + '</p></div></div>'; 
            }
            }
            content.innerHTML = '<h3>' + h3 + '</h3><div class="card-group" id="card-Group">' + str + '</div>';
        }
    }
    else{
        return;
    }
    if (num > 4) { //資料大於4，印製資料頁面
        for (var j = 1; (Math.ceil(num / 4) + 1) > j; j++) {
            strnum += '<a href="#" class="pageNum' + j + '">' + j + '</a>'
        }
        pagemax = (Math.ceil(num / 4));//定義當下頁面最大數
        page.innerHTML = '<a href="#" id="prev"><i class="fas fa-chevron-left"></i>prev</a>' + strnum + '<a href="#" id="next">next<i class="fas fa-chevron-right"></i></a>';
    }
    else{  //資料小於4，不印製，並刷新為空
        page.innerHTML="";
    }
}
function changepage(e) {
    var targetchange = e.target.innerHTML; //取資料頁字串裡面的值 EX:1,2,3或是下一頁上一頁的值
    var len = data.result.records.length;
    var nowvalue = document.getElementById('district').value; //找當前下拉選單上面的值 EX:三民區
    var str = '';
    var strnum = '';
    num = 0;
    e.preventDefault();
    if (e.target.nodeName == "A" && targetchange !== '<i class="fas fa-chevron-left"></i>prev' && targetchange !== 'next<i class="fas fa-chevron-right"></i>') {
    //確定指定目標是"A"，並且不是下一頁，上一頁。
        for (var i = 0; len > i; i++) {
            if (nowvalue == data.result.records[i].Zone) {
                num += 1;
                if (data.result.records[i].Ticketinfo == "" && num <= (targetchange * 4) && num > ((targetchange - 1) * 4)) {
                    str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div></div>';
                } else if (num <= (targetchange * 4) && num > ((targetchange - 1) * 4)) {
                    str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div><div class="card-mark"><div class="mark-icon"></div><p>' + data.result.records[i].Ticketinfo + '</p></div></div>';
                }
            }
        }
        pagenow = parseInt(e.target.innerHTML);//找到當下頁面的頁數
        content.innerHTML = '<h3>' + nowvalue + '</h3><div class="card-group" id="card-Group">' + str + '</div>';
    } else if (e.target.nodeName == "A" && targetchange == '<i class="fas fa-chevron-left"></i>prev' && pagenow > 1) {
    //確定指定目標是"A"並且是"上一頁"，且頁面大於1
        pagenow -= 1;//當下頁面-1
        for (var i = 0; len > i; i++) {
            if (nowvalue == data.result.records[i].Zone) {
                num += 1;
                if (data.result.records[i].Ticketinfo == "" && num <= (pagenow * 4) && num > ((pagenow - 1) * 4)) {
                    str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div></div>';
                } else if (num <= (pagenow * 4) && num > ((pagenow - 1) * 4)) {
                    str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div><div class="card-mark"><div class="mark-icon"></div><p>' + data.result.records[i].Ticketinfo + '</p></div></div>';
                }
            }
        }
        content.innerHTML = '<h3>' + nowvalue + '</h3><div class="card-group" id="card-Group">' + str + '</div>';
    } else if (e.target.nodeName == "A" && targetchange == 'next<i class="fas fa-chevron-right"></i>' && pagenow < pagemax) {
    //確定指定目標是"A"和下一頁，並頁面小於頁面最大數
        pagenow += 1;//當下頁面+1
        for (var i = 0; len > i; i++) {
            if (nowvalue == data.result.records[i].Zone) {
                num += 1;
                if (data.result.records[i].Ticketinfo == "" && num <= (pagenow * 4) && num > ((pagenow - 1) * 4)) {
                    str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div></div>';
                } else if (num <= (pagenow * 4) && num > ((pagenow - 1) * 4)) {
                    str += '<div class="card"><div class="card-header" style="background-image: url(' + data.result.records[i].Picture1 + ')"><h4>' + data.result.records[i].Name + '</h4><p>' + data.result.records[i].Zone + '</p><div class="clear-fix"></div></div><div class="card-p"><div class="time-icon"></div><p>' + data.result.records[i].Opentime + '</p></div><div class="card-p"><div class="position-icon"></div><p>' + data.result.records[i].Add + '</p></div><div class="card-p"><div class="phone-icon"></div><p>' + data.result.records[i].Tel + '</p></div><div class="card-mark"><div class="mark-icon"></div><p>' + data.result.records[i].Ticketinfo + '</p></div></div>';
                }
            }
        }
        content.innerHTML = '<h3>' + nowvalue + '</h3><div class="card-group" id="card-Group">' + str + '</div>';
    }
}
$(document).ready(function () { //下拉選單印製完資料，替當下頁面數與上一頁加上灰色的字，並且不能點
    $('#page , .select').click(function (evet) {      //當頁面處於第一頁時，上一頁與第一頁變成灰色，並且不能點
        if (pagenow == 1) {
            $('#prev').addClass('cover'); 
            $('.pageNum1').addClass('cover');
        } else if (pagenow > 1) {
            $('#prev').removeClass('cover');
            $('.pageNum1').removeClass('cover');
        }
    })

    $('.hito-card').click(function (evet) { //熱門選單印製完資料，替當下頁面數與上一頁加上灰色的字，並且不能點
        $('#prev').addClass('cover');
        $('.pageNum1').addClass('cover');
    })
    $('#page').click(function(event){    //在點取資料頁數給予更新
        for(var i=0 ; pagemax>=i ; i++){
            $('.pageNum'+i).removeClass('cover');   //先全部刪除樣式
            }
        $('.pageNum'+pagenow).addClass('cover');    //找當下頁面加上灰色字，並且不能點
    })
    
    $('#page').click(function (event) {     //當頁面處於最後一頁時，下一頁與最後一頁變成灰色，並且不能點
        if (pagenow == pagemax) {
            $('#next').addClass('cover');
        } else if (pagenow < pagemax) {
            $('#next').removeClass('cover');
        }
    })
    $('.btn-gotop a').click(function(event){   //至頂按鍵
        event.preventDefault();
        $('html, body').animate({
			scrollTop: 0
		}, 1000);
    })
});