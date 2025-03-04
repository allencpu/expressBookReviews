let resource = require('fs');
let fileData = "booksInventory.json";
let prompt = require('prompt-sync')();
 author="";


function readFile(fileName){
    let data = resource.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
    return data;
}
const methCall = new Promise((resolve, reject) => {
    // Prompting the user to input the filename
    
    
    console.log('Welcome to Books Inventory');
     isbn = prompt("and which  ISBN  are you interested in?");
   
   
     try {
    const result = (readFile(fileData));   
    resolve(result); 
    } catch (err) {
        reject(err);
    }
});
// Display information

methCall.then(
    (result) => {let c= (result.indexOf(isbn)-9);
       let cc=(result.indexOf("title",c-40));
       let ce=(result.indexOf("author",cc-40));
        let d =(result.indexOf("review",c+title.length))
    console.log(result.substring(ce,d+10
    )),
(err)=> console.log (" Err")
});

