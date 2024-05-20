import { validateToken, decodeToken } from "../js/decode.js";

(() => {
    // Ocultar el contenido de la página mientras se realiza la validación
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.display = 'none';

        const storedData = localStorage.getItem('token');
        if (!storedData) {
            console.error('No token found in localStorage');
            window.location = "../index.html";
            return;
        }

        try {
            const token = JSON.parse(storedData);
            console.log(token)

            const decodedToken = decodeToken(token);
            console.log(decodedToken);

            if (validateToken(decodedToken)) {
                if (decodedToken.role === "Traveler" && window.location.pathname.includes('traveler.html')) {
                    document.body.style.display = 'block'; 
                } else if (decodedToken.role === "Guide" && window.location.pathname.includes('guide.html')) {
                    document.body.style.display = 'block';
                } else {
                    window.location = "../index.html"; 
                }
            } else {
                console.warn('Token has expired or is invalid');
                window.location = "../index.html";
            }
        } catch (error) {
            console.error('Error decoding or validating token:', error);
            window.location = "../index.html";
        }
    });
})();
