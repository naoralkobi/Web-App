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

function addTextMessageToContect(row,name){

    let contect = document.getElementById(name);

    if(row.cells[0].innerHTML.length > 10 )
    {
        contect.cells[1].innerHTML = name + "<br><small> Me: " + row.cells[0].innerHTML.substring(0, 9)+"...</small>";
    }
    else
    {
        contect.cells[1].innerHTML = name + "<br><small> Me: " + row.cells[0].innerHTML+ "</small>";
    }
    contect.cells[2].innerHTML = row.cells[1].innerHTML +"<br><small style='color: grey;'>" +insertDate()+ "</small> ";

    contect.cells[2].style.color="grey";

}

function addAudioMessageToContect(row,name){

    let contect = document.getElementById(name);
    contect.cells[1].innerHTML = name + "<br><small> Me: Audio </small>";
    contect.cells[2].innerHTML = row.cells[1].innerHTML +"<br><small style='color: grey;'>" +insertDate()+ "</small> ";
    contect.cells[2].style.color="grey";
}

function addImgMessageToContect(row,name){

    let contect = document.getElementById(name);
    contect.cells[1].innerHTML = name + "<br><small> Me: Photo </small>";
    contect.cells[2].innerHTML = row.cells[1].innerHTML +"<br><small style='color: grey;'>" +insertDate()+ "</small> ";
    contect.cells[2].style.color="grey";
}

function addVideoMessageToContect(row,name){

    let contect = document.getElementById(name);
    contect.cells[1].innerHTML = name + "<br><small> Me: Video </small>";
    contect.cells[2].innerHTML = row.cells[1].innerHTML +"<br><small style='color: grey;'>" +insertDate()+ "</small> ";
    contect.cells[2].style.color="grey";
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

///function to connect to chat screen
function connection(){
    window.location.href="app.html";
}

function AddStaticMessages(){

    var img = document.createElement('img');
    img.src = "sunset.jpg";

    img.style.width = "100px";
    img.style.height = "100px";

    var video = document.createElement('video');

    video.controls = true;
    video.style.width = "200px";
    video.style.height = "100px";


    video.src = "video1.mp4";


    const clipContainer = document.createElement('article');
    const clipLabel = document.createElement('p');
    const audio = document.createElement('audio');

    clipContainer.classList.add('clip');
    audio.setAttribute('controls', '');

    clipContainer.appendChild(audio);

    audio.controls = true;
    audio.src = "sound1.mp3";

    let name = "Omer Adam";
    let currentTime = "12:00 PM";

    if (!user_message.has(name)) {
        user_message.set(name,[]);
     }
    user_message.get(name)[0] = new MessageData("Hello Omer Adam",currentTime);
    user_message.get(name)[1] = new MessageData(img,currentTime);
    user_message.get(name)[2] = new MessageData(video,currentTime);
    user_message.get(name)[3] = new MessageData(audio,currentTime);
    user_message.get(name)[4] = new MessageData("What do you think?",currentTime);

     name = "Bob";


    if (!user_message.has(name)) {
        user_message.set(name,[]);
     }
    user_message.get(name)[0] = new MessageData(img,currentTime);
    user_message.get(name)[1] = new MessageData(audio,currentTime);
    user_message.get(name)[2] = new MessageData("Hello Bob, how are you? i want to you to see my bunney!",currentTime);
    user_message.get(name)[3] = new MessageData(video,currentTime);

    name = "Spiderman";

    var img2 = document.createElement('img');
    img2.src = "venom.jpg";
    audio.src= "guitar.mp3";

    if (!user_message.has(name)) {
        user_message.set(name,[]);
     }


    user_message.get(name)[0] = new MessageData(img2,currentTime);
    user_message.get(name)[1] = new MessageData("Here is your enemy Venom!!",currentTime);
    user_message.get(name)[2] = new MessageData(video,currentTime);
    user_message.get(name)[3] = new MessageData(audio,currentTime);

    name = "Alice";

    var img3 = document.createElement('img');
    img3.src = "alice2.jpg";
    audio.src= "guitar.mp3";

    if (!user_message.has(name)) {
        user_message.set(name,[]);
     }


    user_message.get(name)[0] = new MessageData(img3,currentTime);
    user_message.get(name)[1] = new MessageData("i think you should change your picture to this one :)",currentTime);
    user_message.get(name)[2] = new MessageData("and this is my bunny! cool!",currentTime);
    user_message.get(name)[3] = new MessageData(video,currentTime);
    user_message.get(name)[4] = new MessageData(audio,currentTime);

    name = "Jack Sparrow";

    var img3 = document.createElement('img');
    img3.src = "snow.jpg";

    if (!user_message.has(name)) {
        user_message.set(name,[]);
     }


    user_message.get(name)[0] = new MessageData(video,currentTime);
    user_message.get(name)[1] = new MessageData(audio,currentTime);
    user_message.get(name)[2] = new MessageData("Lets make a snowman!",currentTime);
    user_message.get(name)[3] = new MessageData(img3,currentTime);
   
  }



