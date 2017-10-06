// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  facebookAuth: {
    clientID: "1134193510015564", // Nico App ID
    clientSecret: "574a084a7bfe3687a3307b001ea9e614", // Nico App Secret
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileURL:
      "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email"
  },

  twitterAuth: {
    consumerKey: "your-consumer-key-here",
    consumerSecret: "your-client-secret-here",
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },

  googleAuth: {
    clientID: "your-secret-clientID-here",
    clientSecret: "your-client-secret-here",
    callbackURL: "http://localhost:3000/auth/google/callback"
  }
};
