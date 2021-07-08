//this is the context file 

import { createContext, useEffect, useState } from 'react'; 
import { toast } from "react-toastify";
import axios from 'axios'; 
import * as fakeHttp from '../helpers/fakehttp' // * means all, so we are importing everything from fakehttp and storing it into the fakehttp variable

export const ProductsContext = createContext(); 
//createContext creates a new instance of context
//createContext is a react function 

export default function ProductsContextProvider({ children }){
                                                //a prop to be passed down
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]); 
	const [favoriteProductIds, setFavoriteProductIds] = useState([]); 
  const [headerSearchInput, setHeaderSearchInput] = useState(''); 
  const [loading, setLoading] = useState(false) 


  function handleHeaderSearchInput(event){
    setHeaderSearchInput(event.target.value)
  }
  
	function saveFavoriteId(productId) {
			 setFavoriteProductIds([...favoriteProductIds, productId]) 
       //creating a new array with the current favoriteProductIds value
       //adding the productId
	}

	function removeFavoriteId(productId) {
    const newArray = favoriteProductIds.filter(favId => favId !== productId);
		setFavoriteProductIds(newArray)
	} 

  useEffect(() => {
    const foundProducts = products.filter(product => product.title.toUpperCase()
    .includes(headerSearchInput.toUpperCase()))
     setProductsFiltered(foundProducts)
  }, [headerSearchInput])
  // when the user types inside of the input we want to update our list of products
  // we want to match what the user types
  // for example as the customer types motorolla after they type for example moto it 
  // autopopulates
	
	useEffect(() => { //the arrow function is a callback function
    async function fetchProducts() { //async is a function 
      try{ //try is for if the response is successful
      setLoading(true) //whether the call the is successful or not setLoading is true
      //which means the loading page will load. setLoading is being called before 
      //the request so that's why it works 
      const response = await fakeHttp.getProducts()
    
      setProducts(response.data); //this comes from the fakeHttp
      } catch(err) {
        console.log(err);
				toast.error('Some error happened :(')
        
      } finally{
        setLoading(false)
         //if this is not here the loading would be true forever
        //and the loading message would be there forever 
      }
    }
    fetchProducts()
	}, []); 

	useEffect(() => {
				if(favoriteProductIds.length){
					toast.info('A product was saved into the favorites');
				}
	}, [favoriteProductIds]);



  return(
    <ProductsContext.Provider 
      value={{
        products: headerSearchInput !== "" ? productsFiltered: products, //MORE QUESTIONS 
// products: headerSearchInput ? productsFiltered : products,
//if there is something inside of the input it means the user is trying to filter and the filtered products will
//be returned. Line 65 is an array and is necessary because everything that is entered in the input will
//be consumable by all the components
        favoriteProductIds,
        saveFavoriteId,
        removeFavoriteId,
        handleHeaderSearchInput,
        loading,

      }}
    >
      {children}
   </ProductsContext.Provider>
  )
} 