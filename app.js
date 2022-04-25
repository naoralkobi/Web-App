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

function addImageMessage(image) {

    //var image = document.getElementById('imgOutput');
    var img = document.createElement('img');
    img.src = URL.createObjectURL(image[0]);

    img.style.width = "100px";
    img.style.height = "100px";

    //image.src = URL.createObjectURL(image[0]);

    var table = document.getElementById("myTableData");

    var currentTime = insertTimeMessage();

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    let name=document.getElementById("chat_name").innerHTML;

    // in case its a new chat:
    if (!user_message.has(name)) {
       user_message.set(name,[]);
    }

    user_message.get(name)[user_message.get(name).length] = img;


    row.insertCell(0).appendChild(img);
    row.insertCell(1).innerHTML= "<small>"+currentTime+"</small>";

    insertColorsMessage(row);
    document.getElementById('myImg').value='';
    
}

function insertColorsMessage(row){ 
    //color for the message: 
    row.cells[0].setAttribute("id","container"); 
    row.cells[1].setAttribute("class","bla"); 
}

function logout(){
    window.location.href="index.html";
}
