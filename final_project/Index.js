const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

// Check user list
const doesExist = (username) => {
    if (users.includes( { name: {username}}))
     {
       return true;
   } else {
       return false;}
   }

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
if (req.session.authorization){
    let token = req.session.authorization['accessToken'];
    
    // check JWT
    jwt.verify(token,"access",(err,user) => {
        if (!err) {
            req.user = user;
            next();
        } else {
            return res.status(403).json({message: "not Valid User"});
        }
    });
} else {
    return res.status(403).json({message: "User must Log in!"});
}
});
// Customer Login
app.get('/users',function (req, res) {
    //Write your code here
    res.send(users);
    //return res.status(300).json({message: "Yet to be implemented"});
  });
  app.post("/customer/login", (req,res) => {
    username = req.body.username;
    password = req.body.password;
    // Verify Login info
    if (!username || !password){
        return res.status(403).json({message: "not Valid Login"});
    }
})
          // Register new User
          app.post("/register", (req,res) => {
            const username = req.body.username;
            const password = req.body.password;
            // check Login info
            if (username && password){
                if (!doesExist(username)){
                    users.push({"username":username,"password":password});
                    return res.status(200).json({message: " Customer REGISTERED!"});
                } else {

                    return res.status(404).json({
                        message: "The user " + username + " w/ password "+ password + " already exists "});
                      
                }
            }
       return res.status(404).json({message: "Cannot register-- invalid User"});
     });
    
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
