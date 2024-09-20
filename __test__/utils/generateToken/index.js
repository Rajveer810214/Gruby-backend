const admin = require('firebase-admin');


// Function to get App Check token
async function getAppCheckToken() {
  try {
    const appCheck = admin.appCheck();
    const tokenResponse = await appCheck.createToken('1:269553958236:android:c12317019a2cef78831599');
    console.log('App Check Token:', tokenResponse.token);
    return tokenResponse.token;
  } catch (error) {
    console.error('Error getting App Check token:', error);
  }
}

module.exports=getAppCheckToken;
