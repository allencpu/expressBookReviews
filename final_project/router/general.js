const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/books',function (req, res) {
  //Write your code here
  res.send(books);
  r//eturn res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  //Write your code here
  let book="";
  let input="";
  const isbn = req.params.isbn;
  for (let x=0; x<9; x++){input = books[x+1];
    if(input["isbn"] == isbn){book=x+1;
    }
}
  res.send(books[book]);
} else {
  
  return res.status(300).json({message: "Cannot locate that specific isbn"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let book="";
  let input="";
  const author = req.params.author;
  for (let x=0; x< 9 ; x++){input = books[x+1];
    if (input["author"] == author){
        book=x+1;
    }
}
  res.send(books[book]);
} else {
  return res.status(300).json({message: "Cannot locate that author"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
