import {getUser} from './callbacks-demo.js';
import { getUserAsync } from './promises-demo.js';

//callback demo

// getUser => 100
// getUser => 101
// getUser => 102

// getUser(100, (user) => {
//     console.log("success Callback", user)
//     getUser(101, (user101) => {

//         console.log("success Callback 101", user101)

//         getUser(102, (user102)=>{

//             console.log("success Callback 102", user102)
//         }, () => {})

//     }, () => {})


// }, (errMsg) => {
//     console.log("error Callback", errMsg);
// })


//promise


// getUser => 100
// getUser => 101
// getUser => 102

const promise = getUserAsync(100);
promise
    .then(user => {
        console.log("success", user)
        
        getUserAsync(101)
            .then(user101 => {
                console.log("success 101", user101);


            })
    })
    .catch(errMessage => console.log(errMessage))
    .finally(() => console.log("getUser completed"))

console.log("getUser invoked");


// demo async & await
async function getUsers(){

    // getUser => 100
    // getUser => 101
    // getUser => 102

    try {
        const user = await getUserAsync(100);
        console.log("user100", user)
        const user101 = await getUserAsync(101);
        console.log("user101", user101)
        const user102 = await getUserAsync(102);
        console.log("user102", user102)

    } catch (error) {
        console.log(error)
    }

}
await getUsers();
console.log("app completed")
