
//---------------------------------------------S W I T C H I N G    L O G I N     A N D     S I G N U P----------------------------------------------------------------

function toggleForm() {
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    
    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    }
}
 

//------------------------------------------------------------------L O G I N-----------------------------------------------------------------------------------

async function handlelogin(){
    const email=document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked')?.value;

    if(!email || !password)
    {
        alert("All fields Required");
        return
    }

    const response = await fetch("http://localhost:3000/login",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password,role})
    });
    const data=await response.json();
    localStorage.setItem("token",data.accessToken);
    localStorage.setItem("userId",data.userId);

    if (response.status === 200)
        {       
        if(role === 'admin')
        {
            window.location.href = 'admin.html';
        }
        else if(role === 'user')
        {
            window.location.href = 'userInfo.html';
        }
        else{
            alert("Not Authorised");
        }
    } else if(response.status === 401) {
        alert("Unauthorized Access");
    }else if(response.status === 404) {
        alert("Email not registerd");
    }else if(response.status === 402) {
        alert("Invalid Password");
    }
    else{
        alert("Login Failed");
    }
}
 
//-------------------------------------------------------------------S I G N U P ---------------------------------------------------------------------

async function signup(event) {
    event.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const userName = document.getElementById('name').value;
    const password = document.getElementById('signupPassword').value;
    const confirmpassword = document.getElementById('confirmPassword').value;
    if(!email || !userName || !password || !confirmpassword)
    {
        alert("All Fields are Required")
    }
    else if(password === confirmpassword)
    {
        var response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName,email, password })
        });
    }
    else{
        alert("Password do not match");
    }
    if(response.status === 200)
    {
        alert("Signed Up successfully");
        window.location.href = 'login.html';
    }else if(response.status === 400){
        alert("Email already registered");
    }else{
        alert("something went wrong");
    }
  
} 