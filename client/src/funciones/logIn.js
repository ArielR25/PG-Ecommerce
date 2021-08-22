export default function userLogin(data){
    return async function (){
    var user = await fetch('http://localhost:4000/auth/login',{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    const res = await user.json();
    console.log(res)

    /* window.localStorage.setItem("token",res.token) */
    return res
}
}//guardar en la carpeta nueva