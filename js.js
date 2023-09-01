$(document).ready(function(){
	let times=0;
	let i;
	//button文字預設
	let open=document.querySelector(".open");
	open.innerHTML += "開獎";
	//第一次預測號碼
	let number_all = [];
	let predict_number=[];
	for (i=1 ; i < 49; i++){
		number_all.push(i);
	}
	for (i=0 ; i < 6; i++){
		let predict_n=Math.floor(Math.random()*number_all.length);
		predict_number.push(number_all[predict_n]); 
		number_all.splice(predict_n, 1);
		document.getElementById('choose_'+i).textContent = predict_number[i];
	}		
	//開獎球1~48
	let next=[];
	let lottery_number_all=[];
	for (i=1 ; i < 49; i++){
		lottery_number_all.push(i);
	}
	//第一期預測存入前三期紀錄
	let forecast_record=[];//預測紀錄
	for (i=0 ; i < 6; i++){
		forecast_record.push(predict_number[i]);
	}
	let lottery_record=[];//開獎紀錄
  let Redemption=predict_number;//兌獎
	let current_forecast=predict_number;//本期預測
	$(".Button").on("click",function(){
		times++;
		//開獎
		let now = [];
		for ( i=0 ; i < 6; i++){
			let lottery_n=Math.floor(Math.random()*lottery_number_all.length);
			now.push(lottery_number_all[lottery_n]); 
			lottery_number_all.splice(lottery_n,1);
			document.getElementById('newBall'+i).textContent = now[i];
			lottery_record.push(now[i]);
		}
		// 開獎前三期不重複
		if(lottery_number_all.length<30){
			for (i=0 ; i < 6; i++){
				lottery_number_all.push(lottery_record[0]);
				lottery_record.shift();
			}
		}				
		// console.log('開獎集'+lottery_number_all.length);
		// console.log('開獎集'+lottery_number_all);
		// console.log('開獎前三期'+lottery_record);		
		//下期預測
		let the_next=document.querySelector(".the_next");
		the_next.innerHTML = "<div class='predict'><h2>下期預測號碼</h2><div class='predict_number'><div class='row_1'><div class='next_choose' id = 'next_choose_0'></div><div class='next_choose' id = 'next_choose_1'></div><div class='next_choose' id = 'next_choose_2'></div></div><div class='row_1'><div class='next_choose' id = 'next_choose_3'></div><div class='next_choose' id = 'next_choose_4'></div><div class='next_choose' id = 'next_choose_5'></div></div></div></div>";
		//第2+期------------
		if (times!=1){
			//第2+期預測前三期紀錄
			if(number_all.length<30){
				for (i=0 ; i < 6; i++){
					number_all.push(forecast_record[0]);
					forecast_record.shift();
				}
			}
			console.log('預測集數'+number_all.length);
			console.log('預測集'+number_all);
			console.log('預測前三期'+forecast_record);
			//下期預測替換成本期預測
			for (i=0 ; i < 6; i++){
				document.getElementById('choose_'+i).textContent = next[i];
			}
			Redemption=next;
			current_forecast=next;
		}
		//下期預測號碼
		next=[];
		for (i=0 ; i < 6; i++){
			let predict_n=Math.floor(Math.random()*number_all.length);
			next.push(number_all[predict_n]);
			number_all.splice(predict_n, 1);
			document.getElementById('next_choose_'+i).textContent = next[i];
			forecast_record.push(next[i]);
		}	
		//結果
		let n=0;
		let number=[];
		for (i=0 ; i < 6; i++){
			if (Redemption.indexOf(now[i])!= -1){
				n=n+1;
				number.push(now[i]);
			}
		}
		let result=document.querySelector(".result");
		if (n<1){
			result.innerHTML = "沒中";
		}else if (n==3){
			result.innerHTML = "三獎";
		}else if (n==5){
			result.innerHTML = "五獎";
		}else if (n==6){
			result.innerHTML = "全中";
		}else{
			result.innerHTML = "有中"+number;
		}		
		//紀錄
		let note=document.querySelector(".note");
		note.innerHTML += "<div clsss='note_content'>第期 "+times+" 號碼：<br>開獎："+now+"<br>預測："+current_forecast+"</div>";
		current_forecast=next;
	});
});



