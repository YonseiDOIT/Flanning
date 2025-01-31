export const daySlice = (longdate) => {
    //날짜 자르기
    let year= longdate.slice(2,4)
    let month= longdate.slice(5,7)
    let day= longdate.slice(8,10)
    let date= year+"."+month+"."+day

    //요일
    const dayOfWeek_n = new Date(longdate).getDay();
    let dayOfWeek=""
    if (dayOfWeek_n == 0){
        dayOfWeek="(일)"
    }else if (dayOfWeek_n == 1){
        dayOfWeek="(월)"
    }else if (dayOfWeek_n == 2){
        dayOfWeek="(화)"
    }else if (dayOfWeek_n == 3){
        dayOfWeek="(수)"
    }else if (dayOfWeek_n == 4){
        dayOfWeek="(목)"
    }else if (dayOfWeek_n == 5){
        dayOfWeek="(금)"
    }else{
        dayOfWeek="(토)"
    }


    return {date,dayOfWeek}
}

export const getDay=(dayList)=>{
    //현재 날짜랑 비교
    const dateNow = new Date();
    const dateStart= new Date(dayList[0]);
    const dateEnd= new Date(dayList[dayList.length-1]);

    let dayNumber=0

    console.log(dayList)
    if(dateNow < dateStart){
        //여행시작 전
        dayNumber=1
    }else if(dateNow > dateEnd){
        //여행 이후
        dayNumber=dayList.length
    }else{
        for(let i=1; i<dayList.length; i++){
            if(dateNow==dayList[i]){
                dayNumber= i
            }
        }
    }

    return dayNumber
}


export const getTime = (time) => {
    //현재 시간 가져오기
    const currentDate = new Date();
    const hours = currentDate.getHours();


    
    //console.log(hours)

    let dayNumber=0
    return dayNumber
}

