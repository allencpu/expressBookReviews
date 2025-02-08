const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if (req.session.authorization){
        let token = req.session.authorization['accesstoken'];
        
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
app.post("/login", (req,res) => {
    username = req.body.username;
    password = req.body.password;
    // Verify Login info
    if (!username || !password){
        return res.status(403).json({message: "not Valid Login"});
    }
    // Re-Authenticate Customer
    if(authenticatedUser(username,password)){
        // create tokem
        let accessToken = jwt.sign({
            data: password
        },'access',{expiresIn:  60*60});

            req.session.authorization = {
                accesstoken, username}
                return res.status(200).send("Customer "+ username + " now Logged in");
            } else { 
                return res.status(208).json({message: "Customer Not Logged In"});
            }
            
        });
        // Register new User
        app.post("/register", (req,res) => {
            const username = req.body.username;
            const password = req.body.username;
            // check Login info
            if (username && password){
                if (!doesExist){
                    customers.push({"username":username,"password":password});
                    return res.status(200).json({message: " Customer REGISTERED!"});
                } else {
                    return res.status(404).json({message: "User already exist"});
                }
            }
       return res.status(404).json({message: "Cannot register-- invalid User"});
     });
    


 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
