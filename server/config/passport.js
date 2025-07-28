const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const User = require("./models/User");

passport.serializeUser((user,done)=>{
    done(null,user.id); //stores user id in session cookie
});

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
    done(null,user);
});

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:"/auth/github/callback"
},async (accessToken, refreshToken, profile, done)=>{
    let user = await User.findOne({githubId: profile.id});
    if(user) return done(null,user); //if user exists- login

    user=new User({
        githubId:profile.id,
        username:profile.username,
        avatar:profile._json.avatar_url,
        email:profile._json.email,
        accessToken:accessToken,
    });

    await user.save(); //saving user in mongo db
    done(null,user);//return user to session

}));

