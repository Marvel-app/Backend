  
const querystring = require('querystring')
const CORS_ORIGIN = "http://localhost:3000";
const { config } = require('../../config/index');

function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    
    const options = {
        redirect_uri: `${CORS_ORIGIN}/api/oauth/register`,
        client_id: config.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
    const fullurl = `${rootUrl}?${querystring.stringify(options)}`
    return fullurl;
}

module.exports = getGoogleAuthURL;