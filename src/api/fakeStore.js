//Llama a la api desde constants, para poder modificarla de ser necesario desde un solo archivo

 import { API_CONFIG } from "../utils/constants";
 const { BASE_URL } = API_CONFIG;

//Metodos para interactuar con la api

export const productApi={ 
    getAll: async () => {
    const response = await fetch(`${BASE_URL}/products`); //Se usa ` para llamar una variable dentro de una URL
    return response.json();
    },

    getById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
     },

    create: async (product) => {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
    },
    
    update: async (id, product) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
    },

    delete: async (id) => {
    await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    }

}