const os = require ('os');
const gretting = require ('./gretting');
let UsetName = os.userInfo().username;
console.log("Дата запроса: " + gretting.date);
console.log(gretting.getMessage(UsetName));