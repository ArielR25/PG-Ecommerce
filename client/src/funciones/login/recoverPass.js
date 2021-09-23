export async function sendMail(email) {
  var user = await fetch(
    "https://pg-henry-ecommerce.herokuapp.com/auth/sendemail",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );
  const res = user.json();
  return res;
}

export async function passModifi(code, newPass, email) {
  var user = await fetch(
    "https://pg-henry-ecommerce.herokuapp.com/auth/recoverpass",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
      },

      body: JSON.stringify({
        code: code,
        newPass: newPass,
        email: email,
      }),
    }
  );
  const res = await user.json();
  return res;
}
export async function changePass(code, newPass, email) {
  var user = await fetch(
    "https://pg-henry-ecommerce.herokuapp.com/auth/changepass",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
      },

      body: JSON.stringify({
        code: code,
        newPass: newPass,
        email: email,
      }),
    }
  );
  const res = await user.json();
  return res;
}
