import { useState } from 'react';
import { Alert } from 'react-native';
import { productApi } from '../api/fakeStore';


//Metodos de mutación para api de productos, para crear, updatear, o borrar productos.
//Estos metodos modifican la información y devuelven mensajes de error en caso de ser necesario

export const useProductMutations = () => {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const createProduct = async (productData) => {
    try {
      setCreating(true);
      const newProduct = await productApi.create(productData);
      return newProduct;
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el producto');
      console.error('Create error:', error);
      return null;
    } finally {
      setCreating(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setUpdating(true);
      const updatedProduct = await productApi.update(id, productData);
      return updatedProduct;
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el producto');
      console.error('Update error:', error);
      return null;
    } finally {
      setUpdating(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setDeleting(true);
      await productApi.delete(id);
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
      console.error('Delete error:', error);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    creating,
    updating,
    deleting,
  };
};