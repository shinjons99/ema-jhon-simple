
import { getShoppingCart } from '../../utilities/fakedb.js';


const cartProductsLoader = async() =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();


//if cart data is in database, you have to use async await
const storeCart = getShoppingCart()
const savedCart = [];
    for(const id in storeCart){
        const addedProduct = products.find(pd=>pd.id === id);
        if(addedProduct){
            const quantity = storeCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    return savedCart;
}

export default cartProductsLoader;