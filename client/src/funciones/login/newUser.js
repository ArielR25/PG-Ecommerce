export default async function newUser(data) {
  var user = await fetch("https://pg-henry-ecommerce.herokuapp.com/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await user.json();

  return res;
} //guardar en la carpeta nueva
