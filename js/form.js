import { decodeToken, validateToken } from "./decode.js";


const loginBtn = document.querySelector('.login');
const registerBtn = document.querySelector('.register');
const emailLogin = document.querySelector("#email")
const passwordLogin = document.querySelector("#password")

const username = document.querySelector("#username")
const emailRegister = document.querySelector("#email1")
const passwordRegister = document.querySelector("#password1")
const role = document.querySelector("#role")

const register = async (e) => {
  e.preventDefault();

  const formData = {
    username: username.value,
    email: emailRegister.value,
    password: passwordRegister.value,
    role: role.value
  }
  console.log(formData);

  try {
    const response = await fetch('http://localhost:3000/v1/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("se registro correctamente")
      console.log('Registro exitoso');
      window.location = "../index.html"
    } else {
      const responseData = await response.json();
      alert(`Error en el registro: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error en el registro:', error);
  }
};



const login = async (e) => {
  e.preventDefault();
  const formData = {
    email: emailLogin.value,
    password: passwordLogin.value,
  }
  console.log(formData);
  try {
    const response = await fetch('http://localhost:3000/v1/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });


    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json()
    const token = data.access_token

    console.log(token);
    localStorage.setItem('token', JSON.stringify(token));
    // Decode the token
    const decodedToken = decodeToken(token);
    console.log(decodedToken);

    // Validate the token
    if (validateToken(decodedToken)) {
      console.log(decodedToken.role);
      if(decodedToken.role === "Traveler"){
        window.location = "../traveler.html"
      }else if(decodedToken.role === "Guide"){
        window.location = "../guide.html"
      }else{
        window.location = "../admin.html"
      }
      
      // If all validations pass, redirect to the main page
      // window.location.href = '../index.html';
    } else {
      console.error('Token no válido o expirado');
    }
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    alert('Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
  }
};




loginBtn.addEventListener('submit', login);
registerBtn.addEventListener('submit', register);