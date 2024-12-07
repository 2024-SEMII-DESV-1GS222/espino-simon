const clientId = '0d594fae287f4bcca5d4b327c62f67a6';
const redirectUri = 'http://127.0.0.1:5500/views/index.html';
const scopes = 'user-read-private user-read-email';

const getAuthorizationUrl = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    return authUrl;
};

export {
    getAuthorizationUrl,
    redirectUri
}