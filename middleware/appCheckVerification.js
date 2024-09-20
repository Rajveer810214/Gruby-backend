const { getAppCheck } =require("firebase-admin/app-check");
const appCheckVerification = async (req, res, next) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");
  console.log('Received App Check token:', appCheckToken); // Log the token

  if (!appCheckToken) {
    res.status(401).send("Unauthorized: No App Check token provided");
    return;
  }
  try {
    const appCheck = getAppCheck();
    const appCheckClaims = await appCheck.verifyToken(appCheckToken);
    console.log("App Check claims:", appCheckClaims);
    // If verifyToken() succeeds, continue with the next middleware
    next();
  } catch (err) {
    console.error('Error verifying App Check token:', err);
    res.status(401).send("Unauthorized: Invalid App Check token");
  }
};
module.exports= appCheckVerification
