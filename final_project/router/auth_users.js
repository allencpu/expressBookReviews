const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{

 // Validate users information matches the registered user
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    username = req.body.username;
    password = req.body.password;
    // Verify Login info
    if (!username || !password){
        return res.status(403).json({message: "not Valid Login"});
    }
  //Write your code here
   if(authenticatedUser(username,password)){
        // create tokem
        let accessToken = jwt.sign({
            data: password
        },'access',{expiresIn:  60*60});

            req.session.authorization = {
                accessToken, username}
                return res.status(200).send("Customer "+ username + " now Logged in");
            } else { 
                return res.status(208).json({message: "Customer Not Logged In"});
            }
            
        });
  return res.status(300).json({message: "Yet to be implemented"});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
