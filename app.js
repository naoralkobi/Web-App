function insertTimeMessage(){
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;


    return strTime;
}

function insertDate(){
    var today = new Date();
    var date = " "+today.getDate() +"." +(today.getMonth()+1)+'.'+today.getFullYear();
    return date;
}

function logout(){
    window.location.href="index.html";
}
