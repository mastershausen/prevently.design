import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface FilterTabProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const FilterTab: React.FC<FilterTabProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            selectedCategory === category.id && styles.tabActive
          ]}
          onPress={() => onCategorySelect(category.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={[
            styles.text,
            selectedCategory === category.id && styles.textActive
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    fontSize: 12,
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  textActive: {
    color: Colors.white,
  },
}); 