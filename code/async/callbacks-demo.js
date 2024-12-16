

export function getUser(id, successCallback, errorCallback){

    //connect to a database and fetch the user with that id;
    // This operation being time-consuming is design as aysnc.
    setTimeout(function(){

        if(id < 0){
            errorCallback("User not found");
            return;
        }

        const user = {
            id: id,
            name: "Name " + id
        };
        successCallback(user);

    }, 3000);

    //return "";

}