import {endpoint} from './constant'
export const signup = async(data) =>{
    try{
        let bodyContent = JSON.stringify({
            "email": data.email,
            "password": data.password
          });
        let response = await fetch(endpoint+"/signup", { 
            method: "POST",
            body: bodyContent,
            headers: {"Content-Type": "application/json",}
          });
          const data = await response;
          console.log(data);
    return data;
}catch (err){
    console.log(err);
}
}