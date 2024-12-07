// import { redirectUri, getAuthorizationUrl } from "./login";

const APIController = (function () {
    const clientId = '0d594fae287f4bcca5d4b327c62f67a6';
    const clientSecret = '0295e6e28cab42f4be10b4e42606bcaa';
    let token = '';

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        token = data.access_token;
    }

    (async () => {
        await _getToken();
    })();

    // const exchangeCodeForToken = async (authCode) => {
    //     const result = await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    //         },
    //         body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${encodeURIComponent(redirectUri)}`,
    //     });

    //     const data = await result.json();
    //     console.log('Access Token:', data.access_token);
    //     return data;
    // };

    const search = async (query, type) => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await result.json();
        return data;
    };

    const getTops = async (metric, time, length) => {
        const result = await fetch(`https://api.spotify.com/v1/me/top/${metric}?time_range=${time}&limit=${length}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await result.json();
        return data;
    };

    return {
        getToken: () => token,
        search,
        getTops
    };
})();

export {
    APIController
}