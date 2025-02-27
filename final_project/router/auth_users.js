const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

const regd_users = express.Router();

let users = [];
let titles = books;

const isValid = (username)=>{ 
//returns boolean
//write code to check is the username is valid

    if (users.includes( { name: {username}}))
     {
       return true;
   } else {
       return false;}
   }

   function findReviews (item, detail) {
    let book =0; let input ="";
    for(let x=1; x<11;x++) {input = titles[x];
    if (input.ISBN == detail ){book=x;
    }
    if (book > 0){
        return titles[book].reviews;
    }else {
        return ("Cannot locate this " + detail);
    }
}}
function findDetails( item , detail){
    let book=0;
    let input=""
    for(let x=1; x<11; x++) {input = titles[x];
        if (input[item] == detail){
            book=x;
        }
    }
    
    if (book){return book;
    }else {
        return ("cannot locate this " + item);
}}



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
    
    let review =(req.body.reviews).review;
    const isbn =req.params.isbn;
    //const filtered_book =getDetails("ISBN",isbn);
    let oldBook = findDetails("ISBN",isbn);
    let author = req.query.author;
    if (author) {newBook.author =author};

    let title = req.query.title;
    if (title) {newBook.title = title};
    let ISBN = req.query.ISBN;
    if (ISBN) { newBook.ISBN =ISBN};
    let reviews =req.query.reviews;

    if (reviews) {
        reviews.push({"username":username,"review":review});
         newBook.reviews =reviews};

    //oldReview.push({"username":username,"review":review})
   // let newReview = findReviews("reviews",isbn)
      
       // titles.push(...oldReview);
        //return res.status(200).send("Customer "+ username + "'s review  "+ titles);
    res.send(review);
    });
regd_users.delete("/auth/review/:isbn", (req, res) => {
})
//  Get book review
regd_users.get('/review/:isbn',function (req, res) {
    const output =findReviews("reviews",req.params.isbn);
    res.send(output);
    
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
