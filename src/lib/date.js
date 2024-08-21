export function date(longdate) {
    let mon= longdate.slice(5,7)
    let day= longdate.slice(8,10)

    let month=''
    console.log(mon)
    console.log(day)

    if (mon == "01"){
        month="JANUARY"
    }else if(mon == "02"){
        month="FEBRUARY"
    }else if(mon == "03"){
        month="MARCH"
    }else if(mon == "04"){
        month="APRIL"
    }else if(mon == "05"){
        month="MAY"
    }else if(mon == "06"){
        month="JUNE"
    }else if(mon == "07"){
        month="JULY"
    }else if(mon == "08"){
        month="AUGUST"
    }else if(mon == "09"){
        month="SEPTEMBER"
    }else if(mon == "10"){
        month="OCTOBER"
    }else if(mon == "11"){
        month="NOVEMBER"
    }else if(mon == "12"){
        month="DECEMBER"
    }else{
        month="NULL"
    }


    return [month,day];
  }