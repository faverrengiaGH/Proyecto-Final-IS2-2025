import React, { useLayoutEffect } from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ProductForm } from '../components/ProductForm';
import { useProductMutations } from '../hooks/useProductMutations';
import { COLORS, SPACING } from '../utils/constants';

export const EditProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { updateProduct, updating } = useProductMutations();

  // Agregar botón "Eliminar" en el header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.deleteHeaderButton}
          onPress={() => navigation.navigate('Delete', { product })}
        >
          <Text style={styles.deleteHeaderText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, product]);

  const handleSubmit = async (productData) => {
    const updatedProduct = await updateProduct(product.id, productData);

    if (updatedProduct) {
      Alert.alert(
        'Éxito',
        'Producto actualizado correctamente',
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
      initialValues={product}
      onSubmit={handleSubmit}
      submitLabel="Actualizar Producto"
      loading={updating}
    />
  );
};

const styles = StyleSheet.create({
  deleteHeaderButton: {
    marginRight: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.error,
    borderRadius: 6,
  },
  deleteHeaderText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 12,
  },
});