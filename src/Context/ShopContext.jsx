import React from "react";

export const ShopContext = React.createContext(null)

const getdefaultCart = ()=>{
  let cart = {}
  for(let index=0; index<300+1;index++)
  {
    cart[index]=0
  }
  return cart
}

export const ShopContextProvider = (props) => {

  const [cartItems,setCartItems] = React.useState(getdefaultCart())
  
  const [all_product,setAll_Product]=React.useState([])
  
  
  React.useEffect(()=>{
    fetch("http://localhost:4005/allproducts")
    .then((response)=>response.json())
    .then((data)=>setAll_Product(data))

    .catch((error) => {
      console.error("Error fetching products:", error);
    })
    
  },[])

  const addToCart =(itemId)=>{
    setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]+1}))
  }

  

  const removeFromCart =(itemId)=>{
    setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]-1}))
  }
  
  const getTotalCartAmount = () =>{
    let totalAmount = 0 
    for (const item in cartItems)
      {
        if(cartItems[item]>0)
        {
          let itemInfo = all_product.find((product)=>product.id === Number(item))
          totalAmount += itemInfo.new_price * cartItems[item]
        }
      }
      return totalAmount
  }

  const getTotalCartItems = () =>{
    let totalItems = 0
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        totalItems += cartItems[item]
      } 
    }
    return totalItems
  }

  const contextValue = {getTotalCartAmount,getTotalCartItems,all_product,cartItems,addToCart,removeFromCart}
    
  
  return (
    <ShopContext.Provider value = {contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}
