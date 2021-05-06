const querystring = require('querystring');
const axios = require('axios');
const { config } = require('../../../config/index');
const BASE_URL = "https://marvelappplatzimaster.herokuapp.com";
//const BASE_URL = "http://localhost:3000";
const boom = require('@hapi/boom')
const storeUser = require("./store")
const store = new storeUser
const createToken = require("../../../utils/createJwt")

const getTokens = async (code) => {

    /*
    Returns:
    Promise<{
      access_token: string;
      expires_in: Number;
      refresh_token: string;
      scope: string;
      id_token: string;
    }>
    */

    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: config.GOOGLE_CLIENT_ID,
        client_secret: config.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/api/oauth/register`,
        grant_type: 'authorization_code',
    };
    try {
        const respuesta = await axios.post(url, querystring.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${respuesta.data.access_token}`, {
            headers: {
                Authorization: `Bearer ${respuesta.data.access_token}`,
            },
        }
        )
        return(googleUser.data);

    } catch (error) {
        throw boom.badImplementation(error.message);
    }

}

const validateUser = async (userData) => {
    
    let filterEmail = {
        email: userData.email
    }
    const existsUser = await store.getUserByFilter(filterEmail);
    if (existsUser.length > 0 && existsUser[0].login_type !== 'Google') {
        throw boom.badData('You must login with the normal login form!');
    }
    if (existsUser.length === 0 ) {
        
        let newUser = {
            username: userData.name,
            email: userData.email,
            login_type: 'Google',
        }
        const addedUser = await store.createUser(newUser);
        const token = createToken(addedUser);
        return token
    } else {
        const token = createToken(existsUser[0]);
        return token
    }

}



module.exports = {
    validateUser,
    getTokens
};