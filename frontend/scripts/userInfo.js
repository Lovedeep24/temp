document.addEventListener("DOMContentLoaded", ()=>{
    fetchUserDetails();
});
let requestStatus = null;

//---------------------F E T C H I N G   U S E R   D A T A----------------------
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
        console.error(`error:`,error);
    }
}

//---------------------------------------------------------R E N D E R I N G    U S E R    D A T A--------------------------------------------------------

function renderUserData(data){
    const userName=document.getElementById("userName");
    userName.innerHTML=`${data.userName}`;

    const credits=document.getElementById("creditDisplay");
    credits.innerHTML=`${data.credits}`;

    const pastScansList=document.getElementById("pastScans");
    pastScansList.innerHTML='';


    const pastScans=data.pastScan;
    if(data.length<1)
    {
        pastScansList.innerHTML='No Past Scan data Available'
    }

    pastScans.map((scan)=>{
        const scanItem=document.createElement("tr");
        const createdAt = `${scan.createdAt}`;
        const Date = createdAt.split("T")[0];
        scanItem.innerHTML=`<td>${scan.topic}</td>
                            <td>${scan.fileName}</td>
                            <td>${Date}</td>`
        pastScansList.appendChild(scanItem);
    })

}

//-------------------------------------------------------H A N D A L I N G   C R E D I T    R E Q U E S T---------------------------------------- 
async function handleCreditReq()
{
    const userId=localStorage.getItem("userId");
    const token=localStorage.getItem("token");
    try {
        if(requestStatus === true)
        {
            alert("You have Requested for Credit Already");
            return
        }
        const response = await fetch(`http://localhost:3000/creditRequest/${userId}`,{
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

//----------------------------------------------- R E D I R E C T I N G   T O   U P L O A D   P A G E---------------------------------------------
function handleScan(){
    window.location.href = 'uploadFile.html';
}