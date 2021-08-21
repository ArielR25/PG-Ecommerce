

export async function generarPago (payload,token){
    
    let r;
      await fetch ('http://localhost:4000/cart', {
        method: 'POST',
        headers:{
          'x-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
      .then(data => r = data)
      return r
  };

  