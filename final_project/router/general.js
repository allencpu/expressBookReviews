const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//const fs = require('fs');

//let fileData = "booksInventory.json";

function getDetails( item , detail){
    let book=13;
    let input=""
    for(let x=1; x<11; x++) {input = books[x];
        if (input[item] == detail){
            book=x;
        }
    }
    if (book<=13){return books[book];
    }else {
        return ("cannot locate this " + item);
}}

function getReviews (item, detail){
    let book =13; let input ="";
    for(let x=1; x<11;x++) {input = books[x];
        console.log(input.ISBN);
    if (input.ISBN == detail ){book=x;
    } 
}
    if (book<13){
        return books[book].reviews;
    }else {
        return ("Cannot locate this " + detail);
    }
}


function readFile(fileName){
    let data = fs.readFileSync(fileName);
    return data;
}

// Get the book list available in the shop
public_users.get('/pr/books',function (req, res) {
  //Write your code here
  const methCall = new Promise((resolve, reject) => {
    // Prompting the user to input the filename
     try {
    const result = books;   
    resolve(result); 
    } catch (err) {
        reject(err);
    }});
  // Display information
methCall.then((result) =>
res.send(result),
(err)=> res.send("err"));
});
  // Get books based on title using promise method
  public_users.get('pr/title/:title',function (req, res) {
    //Write your code here
    let titleA= (req.params.title).toString();
const methCall = new Promise((resolve, reject)=> {
    try {
        const result = getDetails("title",req.params.title.toString());
        resolve(result);
    }catch (err) {
        reject(err);
    }});
methCall.then((result) =>
res.send(result),
(err) => res.send("cannot locate the title ***"+titleA+"***"));
  });


// Get the book list available in the shop
public_users.get('/books',function (req, res) {
    //Write your code here
    res.send(books);
    
  });

  // Get book details based on ISBN
  public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const output = getDetails("ISBN",req.params.isbn);
    res.send(output);
   });
    
  // Get book details based on author
  public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const output = getDetails("author",req.params.author);
    res.send(output);
  });


  public_users.get('/title/:title',function (req, res) {
    //Write your code here
    const output = getDetails("title",req.params.title);
    res.send(output);
  
});
  //  Get book review
  public_users.get('/review/:isbn',function (req, res) {
    const output =getReviews("reviews",req.params.isbn);
    res.send(output);
    
});
  
  module.exports.general = public_users;
