const Discord = require("discord.js");
const client = new Discord.Client();
client.login("ODAxNzkxMzU0MjM2ODI5Njk3.GPm725.g7wWNqeB42SD-xQQmsi0uCKsHrKmRVyHDfHIFw")
const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");

// We instantiate express app and the session store.
const app = express();
const MemoryStore = require("memorystore")(session);
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
client.on("ready", () => {
	console.log("Ready!!")
})
passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
passport.use(
    new Strategy(
      {
        clientID: "801791354236829697",
        clientSecret: "1WcraVRj1b2Fd3gv5lHZajVI-LjKod7i",
        callbackURL: "https://ashour1.glitch.me/auth",
        scope: ["identify", "guilds", "guilds.join"]
      },
      (accessToken, refreshToken, profile, done) => {
        // eslint-disable-line no-unused-vars
        // On login we pass in profile with no logic.
        process.nextTick(() => done(null, profile));
      }
    )
  );
  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret:
        "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false
    })
  );

  // We initialize passport middleware.
  app.use(passport.initialize());
  app.use(passport.session());

  // We bind the domain.
  app.locals.domain = "https://ashour1.glitch.me/";

  // We set out templating engine.
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");
app.use(express.static("assets"));

  // We initialize body-parser middleware to be able to read forms.
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
 app.get('/', async(req,res) => {
		const user = req.isAuthenticated() ? req.user : null;
		
	  
		const botStats = [{
			botty: client,
			user: req.isAuthenticated() ? req.user : null
    }];
		 res.render("index", {
			 
			  client,
       Discord,
			  bot: botStats,
			  user,


			
		  })
		  
		
	  
	
		})