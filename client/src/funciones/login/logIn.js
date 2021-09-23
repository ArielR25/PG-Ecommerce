export default function userLogin(data) {
  return async function () {
    var user = await fetch(
      "https://pg-henry-ecommerce.herokuapp.com/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await user.json();
    return res;
  };
} //guardar en la carpeta nueva
