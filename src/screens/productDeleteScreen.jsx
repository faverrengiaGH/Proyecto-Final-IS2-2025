import React from 'react';
import { View,Text,Image,TouchableOpacity, StyleSheet,ScrollView, ActivityIndicator,} from 'react-native';
import { useProductMutations } from '../hooks/useProductMutations';
import { COLORS, SPACING } from '../utils/constants';
import { CommonActions } from '@react-navigation/native';

export const DeleteProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { deleteProduct, deleting } = useProductMutations();

  const handleDelete = async () => {
    const success = await deleteProduct(product.id);
    
    if (success) {
      // Navegar directamente a la lista principal
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Products' }],
        })
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Warning Icon */}
      <View style={styles.warningContainer}>
        <Text style={styles.warningIcon}>⚠️</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>¿Eliminar este producto?</Text>
      
      {/* Mensaje de advertencia */}
      <Text style={styles.warningText}>
        Esta acción no se puede deshacer. El producto será eliminado permanentemente.
      </Text>

      {/* Preview del producto */}
      <View style={styles.productPreview}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
          disabled={deleting}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton, deleting && styles.deleteButtonDisabled]}
          onPress={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

//Estilos de la página para borrar productos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  warningContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3CD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  warningIcon: {
    fontSize: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  warningText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
    lineHeight: 22,
  },
  productPreview: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: SPACING.md,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: SPACING.xs,
  },
  productCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});