import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

//Componente visual de la tarjeta del producto que se mostrará en la lista

export const ProductCard = ({ product, onPress }) => {
 
  const navigation = useNavigation();

  const handleDelete = (e) => {
    // Prevenir que se abra el detalle
    e.stopPropagation();
    navigation.navigate('Delete', { product });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>{product.category}</Text>

        {/* Botón de eliminar */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

//Estilos de la product card

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: COLORS.background,
  },
  info: {
    padding: SPACING.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'capitalize'},
  deleteButton: {
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
      },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
      },
  
});