    export function localStore(items, action) {

        let getCart= JSON.parse(window.localStorage.getItem("cart"))
        if(getCart===null){
            getCart={}
        }
        if(action==='add'){
            if(getCart[`a${items._id}`]){
                getCart[`a${items._id}`].count+=1
            }else{
                getCart[`a${items._id}`]=items
                getCart[`a${items._id}`].count=1
            } 
        }else if(action==='subtract'){
            getCart[`a${items._id}`].count-1===0 ? delete getCart[`a${items._id}`] : getCart[`a${items._id}`].count-=1
        }else if(action==='delete'){
            delete getCart[`a${items._id}`]
        }else if(action==='clear'){
            getCart={}
        } 
        window.localStorage.setItem("cart",JSON.stringify(getCart))
        return getCart
    } 