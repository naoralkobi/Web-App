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

function moveMessageTop(name)
{
    $("#" + name).prependTo('#contectTable');
}

function addTextMessage() {
    var new_message = document.getElementById("message");

    // in case its empty message
    if(new_message.value.length == 0)
    {
        return;
    }

    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var currentTime = insertTimeMessage();

    row.insertCell(0).innerHTML= new_message.value;
    row.insertCell(1).innerHTML= "<small>"+currentTime+"</small>";

    document.getElementById("sendSound").play();

    //add the new message to the bank.
     let name=document.getElementById("chat_name").innerHTML;

     // in case its a new chat:
     if (!user_message.has(name)) {
        user_message.set(name,[]);
     }
   
     user_message.get(name)[user_message.get(name).length] = new MessageData(new_message.value,currentTime);

    document.getElementById('message').value = "";

    addTextMessageToContect(row,name);
    insertColorsMessage(row);
    moveMessageTop(name);

    $("#message-area").scrollTop($("#message-area")[0].scrollHeight);

    document.getElementById("myTableData").scrollIntoView();
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

    user_message.get(name)[user_message.get(name).length] = new MessageData(img,currentTime);


    row.insertCell(0).appendChild(img);
    row.insertCell(1).innerHTML= "<small>"+currentTime+"</small>";

    addImgMessageToContect(row,name);
    insertColorsMessage(row);
    moveMessageTop(name);
    document.getElementById('myImg').value='';
    
}


function addVideoMessage(data) {
    var video = document.createElement('video');

    video.controls = true;
    video.style.width = "200px";
    video.style.height = "100px";


    video.src = URL.createObjectURL(data[0]);

    var table = document.getElementById("myTableData");
    var currentTime = insertTimeMessage();

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);


    let name=document.getElementById("chat_name").innerHTML;

    // in case its a new chat:
    if (!user_message.has(name)) {
       user_message.set(name,[]);
    }

    user_message.get(name)[user_message.get(name).length] = video;

    row.insertCell(0).appendChild(video);
    row.insertCell(1).innerHTML= "<small>"+insertTimeMessage()+"</small>";

    insertColorsMessage(row);
    
    document.getElementById('myVideo').value='';
}

function insertColorsMessage(row){ 
    //color for the message: 
    row.cells[0].setAttribute("id","container"); 
    row.cells[1].setAttribute("class","bla"); 
}

function addRowfromMap(new_message) {
          
    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    if(typeof(new_message.data) == "string") 
    {
        row.insertCell(0).innerHTML= new_message.data;
    }
    else 
    {
       row.insertCell(0).appendChild(new_message.data);
    }
    row.insertCell(1).innerHTML= "<small>"+new_message.messagetime+"</small>";

    //color for the message:
    insertColorsMessage(row);
}

function addContect() {

    var name = document.getElementById("firstName").value;
    newContactName = name;

    // in case its empty name
    if (name.length == 0) {
        return;
    }

    // in case this user exist - alert an error.
    if (existContectList.includes(name)) {
        alert(name + " Is Already In Your Chat List.");
        return;
    }

    // Add the new name to the list.
    existContectList[existContectList.length] = name;

    var table = document.getElementById("contectTable");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var img = document.createElement('img');
    img.src = 'profil.png';
    img.width = 30;

    row.insertCell(0).appendChild(img);
    row.insertCell(1).innerHTML = name;
    row.insertCell(2).innerHTML = "";

    document.getElementById('firstName').value = "";

    row.cells[0].setAttribute("class", "profile-image rounded-circle");
    row.setAttribute("onclick", "setChatName(this);loadMessages()");
    row.setAttribute("id", name);
    moveMessageTop(name);
}

function clearMessageBox(){
    $("#myTableData tr").remove(); 
}

function loadMessages(){

   //first clear the table from older messages 
    clearMessageBox();

    document.getElementById("message-box").removeAttribute("hidden");
    document.getElementById("contactProfile").removeAttribute("hidden");
    document.getElementById("opening").setAttribute("hidden","hidden");

   // alert(event);
    
    // put the user profile picture on top of chat:
    // $("#userProfilePic").attr('src', localStorage.getItem('profile_pic'));

    //get the chat Name for restore his messages.
    let chatUserName = document.getElementById("chat_name").innerHTML;

    let size = user_message.get(chatUserName)?.length || 0;
    //load the chat from the map.
    for (let i = 0; i < size; i++) {
        //alert("the " + i + " message is: " +user_message.get(chatUserName)[i].data);
        addRowfromMap(user_message.get(chatUserName)[i]);

    }
}


function logout(){
    window.location.href="index.html";
}
