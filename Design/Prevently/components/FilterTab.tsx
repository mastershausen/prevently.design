import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
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
    </ScrollView>
  );
};

export default FilterTab;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 16,
    maxHeight: 40,
    flexShrink: 1,
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    fontSize: 13,
    marginRight: 5,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  textActive: {
    color: Colors.white,
  },
}); 