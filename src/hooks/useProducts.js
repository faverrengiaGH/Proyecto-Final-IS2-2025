import { useState, useEffect } from "react";
import { productApi } from "../api/fakeStore";

export const useProducts= () => {
    const [products, setProducts] = useState([]) //Inicia en la memoria el array para los productos
    const [loading, setLoading] = useState(true) //Informa a la memoria que se están cargando los productos, por default true porque no se tienen los productos previamente
    const [error, setError] = useState(null) //Informa a la memoria si aparecen errores, null como default

    
    useEffect(() => {loadProducts();},[]); 

    const loadProducts=async() => {
        try{
            setLoading(true); //Comienza el loading
            const data=await productApi.getAll(); //Llama al metodo para recibir productos
            setProducts(data); //Carga el producto
        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    
    //Exporta la información de productos, carga, error, y si se llama nuevamente devuelve los productos
    return {products, loading, error, refetch:loadProducts}

}