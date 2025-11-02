import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductListScreen } from '../screens/productListScreen';
import { ProductDetailScreen } from '../screens/productDetailScreen';
import { CreateProductScreen } from '../screens/productCreateScreen';
import { EditProductScreen } from '../screens/productEditScreen';
import { DeleteProductScreen } from '../screens/productDeleteScreen';
import { COLORS } from '../utils/constants';

const Stack = createStackNavigator();


//El stack de las pantallas a navegar
export const AppNavigator = () => (
  <NavigationContainer>
<Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen name="Products" component={ProductListScreen} options={{ title: 'Productos' }}/>
      <Stack.Screen name="Detail" component={ProductDetailScreen} options={{ title: 'Detalle' }} />
      <Stack.Screen name="Create" component={CreateProductScreen} options={{ title: 'Crear Producto' }} />
      <Stack.Screen name="Edit" component={EditProductScreen} options={{ title: 'Editar Producto' }}/>
      <Stack.Screen name="Delete" component={DeleteProductScreen} options={{ title: 'Eliminar Producto', headerStyle:{ backgroundColor: COLORS.white, }, headerTintColor: COLORS.error, }} />
    </Stack.Navigator>
  </NavigationContainer>
);