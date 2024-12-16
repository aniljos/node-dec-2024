import {getUser} from './callbacks-demo.js';

//callback demo

getUser(-100, (user) => {
    console.log("success Callback", user)
}, (errMsg) => {

    console.log("error Callback", errMsg);
})

console.log("getUser invoked");
