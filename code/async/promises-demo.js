

export function getUserAsync(userId){

    return new Promise((resolve, reject) => {

        setTimeout(function(){

            if(userId < 0){
                //raise an error
                reject("Invalid usrr id")
                return;
            }
    
            const user = {id: userId, name: "Name " + userId};
            //return the user(success)
            resolve(user);
            
        }, 2000);


    })
}