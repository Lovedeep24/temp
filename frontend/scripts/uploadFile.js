document.addEventListener("DOMContentLoaded", ()=>{
    fetchUserDetails();
});
let requestStatus = null;



//----------------------------------------------------------F E T C H I N G    U S E R      D A T A-------------------------------------------------------------------
async function fetchUserDetails(){
    const token=localStorage.getItem("token");
    const userId=localStorage.getItem("userId");
    try {
        const response = await fetch(`http://localhost:3000/userprofile/${userId}`,{
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data=await response.json();
        requestStatus=data.creditRequest;
        if(response.status === 200)
        {
            renderUserData(data);
        }
        else{
            console.log("user data not fetched")
        }
    } catch (error) {
        console.error("error:",error);
    }
}
//-------------------------------------------------R E N D E R I N G    U S E R     D A T A---------------------------------------------------
function renderUserData(data){
    const credits=document.getElementById("creditDisplay");
    credits.innerHTML=`${data.credits}`;
}

//--------------------------------------------H A N D L I N G    C R E D I T S     R E Q U E S t-------------------------------------------
async function handleCreditReq()
{
    const userId=localStorage.getItem("userId");
    const token=localStorage.getItem("token");
    try {
        if(requestStatus === true)
        {
            alert("You have Requested for Credit already");
            return
        }
        const response = await fetch(`http://localhost:3000/${userId}`,{
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if(response.status === 200)
        {
            alert("Credeit request sent");
        }
        else{
            alert("Could not send Credit request Try again");
        }
    } catch (error) {
        console.error(error);
    }
}


 function handleProfile(){

    window.location.href = 'userInfo.html';
}

async function handleScan(){
    const userId=localStorage.getItem("userId");
    const docId=localStorage.getItem("docId");
    const token=localStorage.getItem("token");
 
    const scanBtn=document.getElementById("btn");
    scanBtn.innerHTML="Scanning..."
    const response = await fetch(`http://localhost:3000/match/${docId}/${userId}`,{
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    const data= await response.json();
    let str = data.maxMatch;  
    let percent = parseFloat(str.replace(/[^0-9.]/g, ''));  
    if (response.status === 200) {
        localStorage.setItem("incomingData", data.maxMatchContent);
        localStorage.setItem("matchPer", percent);
        // alert("SUCCESS");
        window.location.href = 'scan.html';
    } else {
        alert("Error in scanning, please try again.");
    }
    // window.location.href = 'scan.html';
}
///---------------------------------------------C H E C K I N G     F I L E      F O R M A T----------------------------------------------------


document.getElementById("fileInput").addEventListener("change", handleUpload);
async function handleUpload()
{
    const fileInput = document.getElementById("fileInput"); 
    const file = fileInput.files[0];                        
    const uploadBox = document.getElementById("uploadBox"); 

    if (file) {                                                        
        uploadBox.innerHTML = `${file.name}`;
        await uploadFile();              
    } 

    if (!file) {
        alert("Please select a file.");
        return;
    }

    if (file.type !== "text/plain") {
        alert("Only .txt files are allowed!");
        return;
    }
       
}
  

async function uploadFile() {
    try {
    const Btn=document.getElementById("btn");
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const token = localStorage.getItem("token"); 
    const userId = localStorage.getItem("userId");
    const fileContent = await file.text(); 
   const response = await fetch('http://localhost:3000/upload',{
       method:"POST",
       body:await fileContent,
       headers: {
           "userId": userId,
           "filename": file.name,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "text/plain"
       }
   });
     const data = await response.json();
       if(response.status === 200)
       {
        localStorage.setItem("docId",data.scanId);
        localStorage.setItem("userContent",data.content);
        Btn.disabled = false;
        alert("upload Successfull");
        }
        else{
            console.log('error in scanning');
        }
} catch (error) {
    console.error("Error during upload:", error);
    alert("An error occurred, please try again.");
}
    
}

