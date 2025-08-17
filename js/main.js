// import { getShardInfo } from "./location_hint.js";

(function($) {

	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["January","February","March","April","May","June","July","August","September","October","November","December"],
        day = today.getDate(),
		dayOfWeek = today.getDay(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
		
	var Color_BlackShard = '#847272';
	var Color_RedShard = '#ff1e14';
	
    // options should like '2014-01-01'

    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };
    
	// 定义一个加载图像的函数
	function loadImage(url) {
	  return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(new Error('Failed to load image'));
		image.src = url;
	  });
	}

	Calendar.prototype.drawHeader = async function(e) {
		// console.log( "Calendar.prototype.drawHeader(): e:" + e );
		var headMonth = document.getElementsByClassName('head-month'),
			headDay = document.getElementsByClassName('head-day'),
			wrapHeader = document.querySelector('.wrap-header');
			
		wrapHeader.style.backgroundSize = "cover";
		wrapHeader.style.backgroundPosition = "center";

	  //---------------------
	  headMonth[0].innerHTML = monthTag[month] + "<br>" + year;

	  //---------------------
	  // e ? (headDay[0].innerHTML = e) : (headDay[0].innerHTML = day);
		if ( !e ){
			headDay[0].innerHTML = "  未选中日期  ";// 更新文本内容
			wrapHeader.style.backgroundImage = 'url(images/aviary.jpg)';
			return;
		}
	  
		//选中的日期是x月x日星期x，
	  var ChineseWeekDay = ['日', '一', '二', '三', '四', '五', '六'];
	  var selectedDay = new Date(year, month, e);
	  var headDayString;
	   headDayString = "日历选中日期： [" + (selectedDay.getMonth() + 1) + "月" + selectedDay.getDate() + "日 星期" + ChineseWeekDay[selectedDay.getDay()] + "] ， ";
	   
	   
	  //这一天没有碎片事件/降临在xxxx。
	  var shardInfoList = getShardInfo( selectedDay );
	  if (shardInfoList.length == 0)
		headDayString += ("<br>" + "这天没有碎片事件。");
	  else
		headDayString += ("<br>" + "这天的碎片降临在" + shardInfoList[0] + ", <br> 提供" + shardInfoList[1] + shardInfoList[2]) + "。";
	  
	  // headDay[0].innerHTML = headDayString;
	  
	  headDay[0].style.opacity = 0;
	  setTimeout(function() {// 等待一小段时间，让过渡效果生效
	    headDay[0].innerHTML = headDayString;// 更新文本内容
	    headDay[0].style.opacity = 1;// 将透明度设置为 1，触发过渡效果
	  }, 100); // 这里的 100 表示等待 100 毫秒，可以根据需要调整等待时间

	  
	  // wrapHeader.style.backgroundImage = 'url(images/LocationImages/' + shardInfoList[0] + '.jpg)'; //修改成某个在线链接的图片
		
	  if ( shardInfoList.length==0 ){
		wrapHeader.style.backgroundImage = 'url(images/WindPath.jpg)';
		// wrapHeader.style.backgroundImage = '';
		return;
	  }
		
	  
	  try {
		var imageUrlMapping = {
			"蝴蝶平原": 'images/LocationImages/蝴蝶平原.jpg',
			"幽光山洞": 'images/LocationImages/幽光山洞.jpg',
			"云中仙乡": 'images/LocationImages/云中仙乡.jpg',
			"云顶浮岛": 'images/LocationImages/云顶浮岛.jpg',
			"圣岛":     'images/LocationImages/圣岛.jpg',
			"荧光森林": 'images/LocationImages/荧光森林.jpg',
			"秘密花园": 'images/LocationImages/秘密花园.jpg',
			"密林遗迹": 'images/LocationImages/密林遗迹.jpg',
			"大树屋":   'images/LocationImages/大树屋.jpg',
			"神殿后花园": 'images/LocationImages/神殿后花园.jpg',
			"滑冰场":  'images/LocationImages/滑冰场.jpg',
			"圆梦村":  'images/LocationImages/圆梦村.jpg',
			"雪隐峰":  'images/LocationImages/雪隐峰.jpg',
			"边陲荒漠": 'images/LocationImages/边陲荒漠.jpg',
			"巨兽荒原": 'images/LocationImages/巨兽荒原.jpg',
			"黑水港湾": 'images/LocationImages/黑水港湾.jpg',
			"远古战场": 'images/LocationImages/远古战场.jpg',
			"星光沙漠": 'images/LocationImages/星光沙漠.jpg',
			"水母港湾": 'images/LocationImages/水母港湾.jpg',
			"遗忘方舟": 'images/LocationImages/遗忘方舟.jpg',
						
		};

		const imageUrl = imageUrlMapping[shardInfoList[0]];
		const image = await loadImage(imageUrl); // 等待图像加载完成

		wrapHeader.style.backgroundImage = `url(${image.src})`;
		wrapHeader.style.backgroundSize = 'cover';
		wrapHeader.style.backgroundRepeat = 'no-repeat';
		wrapHeader.style.backgroundPosition = 'center';
	  } catch (error) {
		console.error(error);
	  }
	};
    
	Calendar.prototype.drawDays = function() {
		var startDay = new Date(year, month, 1).getDay(),
			nDays = new Date(year, month + 1, 0).getDate(),
			n = startDay; //最后一天的格子数，从1开始数

		for (var k = 0; k < 42; k++) {
			days[k].innerHTML = '';
			days[k].id = '';
			days[k].className = '';
		}

		for (var i = 1; i <= nDays; i++) {
			days[n].innerHTML = i;
			n++;
		}
		
		console.log( "Calendar.prototype.drawDays = function() 1号的编号，最后一天的编号，当月的天数： ", startDay, nDays, n );

		for (var j = 0; j < 42; j++) {
			if (days[j].innerHTML === "") {
				days[j].id = "disabled";
			} else if (j === day + startDay - 1) {
				if ((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth()) && (year === today.getFullYear()))) {
					this.drawHeader(day);
					days[j].id = "today";
				}
			}
			if (selectedDay) {
				if ((j === selectedDay.getDate() + startDay - 1) && (month === selectedDay.getMonth()) && (year === selectedDay.getFullYear())) {
					days[j].className = "selected";
					this.drawHeader(selectedDay.getDate());
				}
			}
		}
		
		var convertHexToRgba = (hexColor, opacity) => {
		    var color = hexColor.replace('#', '');
		    var r = parseInt(color.substring(0, 2), 16);
		    var g = parseInt(color.substring(2, 4), 16);
		    var b = parseInt(color.substring(4, 6), 16);
		    var rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
		    return rgbaColor;
		  };
		
		
		for ( var j=0; j<42; j++ ){
			days[j].style.backgroundColor = convertHexToRgba('#ffffff', 0.1); //reset bg color
		}
		
		for ( var j=0; j<42; j++ ){ //paint according to shard type
			if ( days[j].innerHTML === "" )
				continue;
			
			var dateNum = j-startDay+1;
			var weekdayNum = (j%7===0) ? 7 : (j%7);

			if (dateNum >= 1 && dateNum <= 15) {
				if (weekdayNum === 2) days[j].style.backgroundColor = convertHexToRgba(Color_BlackShard, 0.5);
				if (weekdayNum === 6 || weekdayNum === 7) days[j].style.backgroundColor = convertHexToRgba(Color_RedShard, 0.5);
			} else if (dateNum >= 16) {
				if (weekdayNum === 3) days[j].style.backgroundColor = convertHexToRgba(Color_BlackShard, 0.5);
				if (weekdayNum === 5 || weekdayNum === 7) days[j].style.backgroundColor = convertHexToRgba(Color_RedShard, 0.5);
			}
		}
		for ( var j=0; j<32; j++ ){
			days[j].style.margin = "20px";
		}
	};
	
 
	
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        
        // 如果当前是选中日期模式，自动更新进度条
         if (typeof progressMode !== 'undefined' && progressMode === 'selected') {
             // 更新选中日期并刷新进度条
             if (typeof selectedDate !== 'undefined') {
                 selectedDate = parseInt(o.innerHTML);
                 if (typeof updateProgressForSelectedDate === 'function') {
                     updateProgressForSelectedDate();
                 }
             }
         }
    };
    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
	
	
    var calendar = new Calendar();
    
        
}, false);

})(jQuery);
