import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './bottles.css'
import { addToLS, getStoredCard, removeFromLS } from "../../Utilities/LocalStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([])
    const [cart, setCart] = useState([])
    
    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle]
        setCart(newCart)
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id => {
        //visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        //remove from ls
        removeFromLS(id)
    }

    //Load cart from local storage
    useEffect(() => {
        console.log('called the useEffect', bottles.length)
        if(bottles.length>0){
            const storedCart = getStoredCard();
            console.log(storedCart, bottles)
            const savedCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id ===id)
                if(bottle){
                    savedCart.push(bottle)
                }
            }
            setCart(savedCart)
        }
    },[bottles])

    useEffect(()=>{
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])

    return (
        <div>
            <h1>Bottles here: {bottles.length}</h1>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

        <div className="bottle-container">
        {
            bottles.map(bottle => <Bottle key={bottle.id} handleAddToCart={handleAddToCart} bottle={bottle}></Bottle>)
        }
        </div>
        </div>
    );
}

export default Bottles;