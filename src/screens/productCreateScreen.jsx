import React from 'react';
import { Alert } from 'react-native';
import { ProductForm } from '../components/productForm';
import { useProductMutations } from '../hooks/useProductMutations';

export const CreateProductScreen = ({ navigation }) => {
  const { createProduct, creating } = useProductMutations();

  const handleSubmit = async (productData) => {
    const newProduct = await createProduct(productData);

    if (newProduct) {
      Alert.alert(
        'Éxito',
        'Producto creado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      submitLabel="Crear Producto"
      loading={creating}
    />
  );
};