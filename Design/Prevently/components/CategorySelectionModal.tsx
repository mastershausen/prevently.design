import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width, height } = Dimensions.get('window');

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
}

interface CategorySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category) => void;
  activeCategories: string[];
}

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
  activeCategories
}) => {
  // Alle verfügbaren Kategorien basierend auf dem ProjectBriefing
  const allCategories: Category[] = [
    {
      id: 'fitness',
      title: 'Bewegung & Fitness',
      icon: '🏃‍♂️',
      color: '#2196F3',
      description: 'Regelmäßige Aktivität für Körper & Geist',
      isActive: activeCategories.includes('fitness')
    },
    {
      id: 'nutrition',
      title: 'Ernährung & Stoffwechsel',
      icon: '🥗',
      color: '#4CAF50',
      description: 'Ausgewogene Ernährung für mehr Energie',
      isActive: activeCategories.includes('nutrition')
    },
    {
      id: 'sleep',
      title: 'Schlaf & Erholung',
      icon: '😴',
      color: '#FF9800',
      description: 'Erholsamer Schlaf für Regeneration',
      isActive: activeCategories.includes('sleep')
    },
    {
      id: 'mental',
      title: 'Mentale Gesundheit',
      icon: '🧠',
      color: '#9C27B0',
      description: 'Psychisches Wohlbefinden stärken',
      isActive: activeCategories.includes('mental')
    },
    {
      id: 'prevention',
      title: 'Vorsorge & Checkups',
      icon: '🏥',
      color: '#795548',
      description: 'Regelmäßige Gesundheitschecks',
      isActive: activeCategories.includes('prevention')
    },
    {
      id: 'dental',
      title: 'Zahngesundheit',
      icon: '🦷',
      color: '#00BCD4',
      description: 'Mundpflege und Zahnvorsorge',
      isActive: activeCategories.includes('dental')
    },
    {
      id: 'beauty',
      title: 'Haut, Haare, Nägel',
      icon: '✨',
      color: '#E91E63',
      description: 'Äußere Gesundheit und Pflege',
      isActive: activeCategories.includes('beauty')
    },
    {
      id: 'immune',
      title: 'Immunsystem & Infektabwehr',
      icon: '🛡️',
      color: '#FF5722',
      description: 'Starke Abwehrkräfte aufbauen',
      isActive: activeCategories.includes('immune')
    },
    {
      id: 'longevity',
      title: 'Longevity & Anti-Aging',
      icon: '⏳',
      color: '#673AB7',
      description: 'Gesund altern und Langlebigkeit',
      isActive: activeCategories.includes('longevity')
    },
    {
      id: 'digestion',
      title: 'Verdauung & Darmgesundheit',
      icon: '🌿',
      color: '#8BC34A',
      description: 'Gesunder Darm für besseres Wohlbefinden',
      isActive: activeCategories.includes('digestion')
    },
    {
      id: 'vision',
      title: 'Augengesundheit & Sehkraft',
      icon: '👁️',
      color: '#3F51B5',
      description: 'Sehkraft erhalten und stärken',
      isActive: activeCategories.includes('vision')
    },
    {
      id: 'women',
      title: 'Frauen-Gesundheit',
      icon: '♀️',
      color: '#FF69B4',
      description: 'Spezielle Gesundheitsthemen für Frauen',
      isActive: activeCategories.includes('women')
    },
    {
      id: 'men',
      title: 'Männer-Gesundheit',
      icon: '♂️',
      color: '#2196F3',
      description: 'Spezielle Gesundheitsthemen für Männer',
      isActive: activeCategories.includes('men')
    }
  ];

  // Nur inaktive Kategorien anzeigen
  const availableCategories = allCategories.filter(cat => !cat.isActive);

  const handleCategorySelect = (category: Category) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={20} style={styles.blurBackground}>
          <SafeAreaView style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <IconSymbol name="xmark" size={24} color={Colors.text.dark} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Neue Kategorie hinzufügen</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Subtitle */}
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                Wähle einen neuen Präventionsbereich aus, den du aktivieren möchtest
              </Text>
            </View>

            {/* Categories List */}
            <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
              {availableCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <LinearGradient
                    colors={[category.color, `${category.color}CC`, `${category.color}99`]}
                    style={styles.categoryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.categoryContent}>
                      <View style={styles.categoryLeft}>
                        <Text style={styles.categoryIcon}>{category.icon}</Text>
                        <View style={styles.categoryInfo}>
                          <Text style={styles.categoryTitle}>{category.title}</Text>
                          <Text style={styles.categoryDescription}>{category.description}</Text>
                        </View>
                      </View>
                      <View style={styles.addButton}>
                        <IconSymbol name="plus" size={20} color="white" />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Footer Info */}
            <View style={styles.footerInfo}>
              <Text style={styles.footerText}>
                💡 Insgesamt gibt es 13 Präventionsbereiche - aktiviere die für dich wichtigsten
              </Text>
            </View>
          </SafeAreaView>
        </BlurView>
      </View>
    </Modal>
  );
};

export default CategorySelectionModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  blurBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginTop: height * 0.1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text.dark,
    marginLeft: 16,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  categoriesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryItem: {
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryGradient: {
    borderRadius: 20,
    padding: 20,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  categoryDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  footerInfo: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 