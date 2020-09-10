let a1 = {"user_id":1,"name":"Ebonee De Filippis","mail":"ede0@posterous.com","mobile":"3022104268","nric":"X1895885Y"};

/*
- JSON string
 { "item1":1 }

 - JS object
 { item1: 1 }
*/
console.log(a1);

let b1 = JSON.stringify(a1); // javascript obj to json string
console.log(b1);

let c1 = JSON.parse(b1);  // json string to js object
console.log(c1);


let a = [
    {"user_id":1,"name":"Ebonee De Filippis","mail":"ede0@posterous.com","mobile":"3022104268","nric":"X1895885Y"},
    {"user_id":2,"name":"Lidia Fairburn","mail":"lfairburn1@1688.com","mobile":"7395144605","nric":"C3482263B"}
];

/* let a = [
    {user_id:1,name:"Ebonee De Filippis",mail:"ede0@posterous.com",mobile:"3022104268",nric:"X1895885Y"},
    {user_id:2,name:"Lidia Fairburn",mail:"lfairburn1@1688.com",mobile:"7395144605",nric:"C3482263B"}
]; */

console.log(typeof(a));
console.log(a);

let b = JSON.stringify(a);  // obj to JSON string
console.log(b);

console.log(typeof(b));

