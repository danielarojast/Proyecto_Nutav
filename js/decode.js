export const decodeToken = (token) => {
    if (!token) {
        throw new Error("Token is null or undefined");
    }
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
};

export const validateToken = (decodedToken) => {
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
        return false;
    }
    return true;
};