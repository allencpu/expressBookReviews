const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const authenticatedUser = (username,password) => {
    if (users.includes( { name: {username}}) &&
    {username: {password} == password}
)
  {
    return false;
} else {
    return true;}
}

const isValid = (username)=>{ 
//returns boolean
//write code to check is the username is valid
}
//returns boolean
//write code to check if username and password match the one we have in records.


//only registered users can login
regd_users.post("/login", (req,res) => {
    username = req.body.username;
    password = req.body.password;
    // Verify Login info
    if (!username || !password){
        return res.status(403).json({message: "not Valid Login"});
    }
 
// Pre-Authenticate Customers before Logging in

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


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
