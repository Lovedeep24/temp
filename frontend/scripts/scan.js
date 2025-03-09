
document.addEventListener("DOMContentLoaded",scanDocument);

async function scanDocument(){
    const userId=localStorage.getItem("userId");
    const docId=localStorage.getItem("docId");
   const incomingData = localStorage.getItem("incomingData");
   const matchPer = localStorage.getItem("matchPer");
   const userContent = localStorage.getItem("userContent");


   const userData=document.getElementById("userContent");
    userData.innerHTML=userContent;

    const recievedData=document.getElementById("matchContent");
    recievedData.innerHTML=incomingData;

    const matchPercent=document.getElementById("matching");
    matchPercent.innerHTML=matchPer;
}


function handleProfile(){
    window.location.href = 'userInfo.html';
}