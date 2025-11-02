import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Loading } from '../components/Loading';
import { COLORS, SPACING } from '../utils/constants';

//Llamando a los componentes creados previamente 
export const ProductListScreen = () => {
    const { products, loading } = useProducts();
    const navigation = useNavigation();
    
    //Boton para crear producto
    useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={styles.createButtonText}>+ Crear</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

    if (loading) return <Loading />;

    return (
        <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('Detail', { id: item.id })}
        />
            )}
       
         contentContainerStyle={styles.list} />
    );
};

//Estilos
const styles = StyleSheet.create({
  list: {
    paddingVertical: SPACING.sm,
  },
  createButton: {
    marginRight: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  createButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
});