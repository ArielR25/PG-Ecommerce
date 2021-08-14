export function localStore(items, action) {
   var getCart=JSON.parse(window.localStorage.getItem("cart"))
   if(getCart===null){
       getCart={}
   }
    if(action==='add'){
        getCart[items._id] ? getCart[items._id].count+=1 : getCart[items._id].count=1
    }else if(action==='subtract'){
        getCart[items].count-1===0 ? delete getCart[items] : getCart[items].count-=1
    }else if(action==='delete'){
       delete getCart[items]
    }else{
        getCart={}
    }
    window.localStorage.setItem("cart",JSON.stringify(getCart))
    return getCart
}