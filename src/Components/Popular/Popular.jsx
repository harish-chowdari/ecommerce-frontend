import React from 'react'
import data_products from "../Assets/data"
import Item from "../Item/Item"
import "./Popular.css"

export const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
        <div className='popular-item'>
        
            {data_products.map((item,i)=> {
                return <Item key={i} id={item.id} 
                image={item.image}
                name={item.name}
                new_price={item.new_price}
                old_price={item.new_price}
                /> 
            })}
        </div>
    </div>
  )
}
