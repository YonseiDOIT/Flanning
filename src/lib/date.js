export function date(longdate) {
    let mon= longdate.slice(5,7)
    let day= longdate.slice(8,10)

    let month=''
    console.log(mon)
    console.log(day)


    return [mon,day];
  }