//Formulario de producto para creacion o edición
//Obtiene valores inciales si lo existen. Incluye vista, y tiene una validación básica de los valores ingresados.
//Si pasan esta validación, envía submit a la api que se le de.

import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,} from 'react-native';
import { COLORS, SPACING } from '../utils/constants';

export const ProductForm = ({ 
  initialValues = {}, 
  onSubmit, 
  submitLabel = 'Guardar',
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    price: initialValues.price?.toString() || '',
    description: initialValues.description || '',
    image: initialValues.image || '',
    category: initialValues.category || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Ingresa un precio válido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      });
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            value={formData.title}
            onChangeText={(value) => updateField('title', value)}
            placeholder="Nombre del producto"
            placeholderTextColor={COLORS.textSecondary}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Precio */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Precio *</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            value={formData.price}
            onChangeText={(value) => updateField('price', value)}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor={COLORS.textSecondary}
          />
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        {/* Categoría */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría *</Text>
          <TextInput
            style={[styles.input, errors.category && styles.inputError]}
            value={formData.category}
            onChangeText={(value) => updateField('category', value)}
            placeholder="electronics, jewelery, men's clothing..."
            placeholderTextColor={COLORS.textSecondary}
          />
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Descripción */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción *</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
            value={formData.description}
            onChangeText={(value) => updateField('description', value)}
            placeholder="Describe el producto..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={COLORS.textSecondary}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>

        {/* URL de Imagen */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL de Imagen</Text>
          <TextInput
            style={styles.input}
            value={formData.image}
            onChangeText={(value) => updateField('image', value)}
            placeholder="https://..."
            placeholderTextColor={COLORS.textSecondary}
            autoCapitalize="none"
          />
        </View>

        {/* Botón Submit */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Guardando...' : submitLabel}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

//Estilos del formulario

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  textArea: {
    height: 100,
    paddingTop: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});