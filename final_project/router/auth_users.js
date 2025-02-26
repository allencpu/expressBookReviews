const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
//returns boolean
//write code to check is the username is valid

    if (users.includes( { name: {username}}))
     {
       return true;
   } else {
       return false;}
   }

//only registered users can login
regd_users.post("/login", (req,res) => {
//Write your code here
username = req.body.username;
password = req.body.password;
// Verify Login info
if (!username || !password){
    return res.status(403).json({message: "not Valid Login"});
}

const authenticatedUser = (username,password) => {
    if (users.includes( { name: {username}}) &&
    {username: {password} == password}
)
  {
    return false;
} else {
    users.push({"username":username,"password":password});
    return true;}

}
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
    let  reviews = req.query.reviews;
    let review =req.body.review;
    const isbn =req.params.isbn;
    let filtered_books = books.filtered((item) => item.ISBN === isbn);
    if (filtered_books.length > 0 ) {
        let filtered_book = filtered_books[0];
        (filtered_book.reviews).push({"username":username,"review":review});}
        books.push(filtered_book);
        return res.status(200).send("Customer "+ username + "'s review is finished updating");
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
