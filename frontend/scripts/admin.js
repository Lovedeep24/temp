document.addEventListener("DOMContentLoaded", ()=>{
    fetchUserRequests();
    fetchTopUsers();
    fetchTopTopics();
    getUserStats();
});

//------------------------------------------------------G E T T I N G   U S E R   S T A T S--------------------------------------------------------

async function getUserStats(){
    const token=localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/analytics',{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data =await response.json();
        if(response.status === 200)
        {
            renderUserStats(data);
        }
        else{
            console.log("Internal Server Error");
        }

    } catch (error) {
        console.error(`error: `,error);
    }
}

//--------------------------------------------------------------R E N D E R I N G   S T A T S   D A T A------------------------------------------------

function renderUserStats(userData){
    const userTable= document.getElementsByClassName("user-table")[0];
    userTable.innerHTML= '';

    if(userData.length<1)
    {
        userTable.innerHTML = `<p>No User Data Found</p>`
    }
    else{
        userData.map(user=>{
            const tablerRow=document.createElement("tr");
            tablerRow.innerHTML=`<td>${user.userName}</td>
                                 <td>${user.remainingCredit}</td>
                                 <td>${user.totalScan}</td>`
                     userTable.appendChild(tablerRow);            
        });
    }

    }


//---------------------------------------------------------- F E T C H I N G   T O P   U S E R S-----------------------------------------------------------

async function fetchTopUsers() {
    const token=localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/topusers',{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }); // Replace with your backend route for top users
        const data = await response.json();
        renderTopUsers(data);
    } catch (error) {
        console.error('Error fetching top users:', error);
    }
}

//-----------------------------------------------------------R E N D E R   T O P   U S E R-------------------------------------------------------------

function renderTopUsers(users) {
    const topUsersList = document.getElementsByClassName("topUsersList")[0];
    topUsersList.innerHTML = ''; // Clear any existing content

    if (users.length < 1) {
        topUsersList.innerHTML = `<p>No top users available</p>`;
    } else {
        users.map(user => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${user.userName}</strong>  ${user.totalScan} Scans`;
            topUsersList.appendChild(listItem);
        });
    }
}

//----------------------------------------------------F E T C H I N N G   C O M M O N    T O P I C S--------------------------------------------------------

async function fetchTopTopics() {
    const token=localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/topic',{
            method:"GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }); 
        const data = await response.json();
        renderTopTopics(data);
    } catch (error) {
        console.error('Error fetching top topics:', error);
    }
}

//--------------------------------------------------------R E N D E R I N G    C O M M O N    T O P I C S-----------------------------------------------------

function renderTopTopics(topics) {
    const topTopicsList = document.getElementsByClassName("topTopicsList")[0];
    topTopicsList.innerHTML = ''; 

    if (topics.length < 1) {
        topTopicsList.innerHTML = `<p>No common searched topics available</p>`;
    } else {
        topics.map(topic => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${topic.topic} (${topic.count} searches)`;
            topTopicsList.appendChild(listItem);
        });
    }
}


//------------------------------------------------------F E T C H I N G    U S E R   R E Q U E S T -----------------------------------------------

async function fetchUserRequests() {
    const token=localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/getcreditrequest',{
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }); // Replace with your backend route
        const data = await response.json();

        renderRequests(data);
    } catch (error) {
        console.error('Error fetching user requests:', error);
    }
}


//-------------------------------------------------------------R E N D E R I N G   T H E   R E Q U E S T S----------------------------------------

function renderRequests(users) {
    const mainDiv=document.getElementById("creditReq");
    if(users.length<1)
    {
        mainDiv.innerHTML=`<p>No request</p>`
    }
    else{
         users.map(user => {
        const requestDiv=document.createElement("div");
        requestDiv.classList.add("request");
        requestDiv.setAttribute('data-key', user.userId);
 
         requestDiv.innerHTML = `
             <h3>${user.userName}</h3>
             <p>Current Credits: ${user.credits}</p>
             <p>Assign Credits: 
                 <input type="number" id="creditInput-${user.userId}" min="1" value="0">
             </p>
             <div class="decision-Btn">
                 <button class="approve" onclick="approveUser('${user.userId}')" >Approve</button>
                 <button class="reject" onclick="rejectUser('${user.userId}')" >Reject</button>
             </div>
         `;
 
         mainDiv.appendChild(requestDiv);
     });
    }
}

//-----------------------------------------------------H A N D L I N G   A P P R O V E    R E Q U E S T----------------------------------------------------------

async function approveUser(userId) {
    const creditInput = document.getElementById(`creditInput-${userId}`);
    const assignedCredits = creditInput.value; 
 

try {
    const token=localStorage.getItem("token");

    const response=await fetch(`http://localhost:3000/approve/${userId}`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credits: Number(assignedCredits),
        })
    });
    // const data=await response.json();
    if(response.status === 200)
        {
            removeUserDiv(userId);
            location.reload();
        } 
} catch (error) {
    console.error(error);
}
}



//-----------------------------------------------H A N D L I N G    R E J EC T    R E Q U E ST-------------------------------------------------------

async function rejectUser(userId) {
    const token=localStorage.getItem("token");
    try {
        const response=await fetch(`http://localhost:3000/decline/${userId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        // const data=await response.json()  ;
        if(response.status === 200)
            {
                removeUserDiv(userId);
                location.reload();
            } 
    } catch (error) {
        console.error(error);
    }
}


//-----------------------------------------------------R E M O V I N G    D I V    A F T E R   D E C I SI O N-------------------------------------------------------

function removeUserDiv(userId){
    const divId=document.querySelector(`[data-key="${userId}"]`);
    if(divId)
    {
        divId.remove();
    }

}