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
  Pressable,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width, height } = Dimensions.get('window');

interface CategoryData {
  id: string;
  title: string;
  icon: string;
  color: string;
  progress: number;
  description: string;
}

interface CategoryGridModalProps {
  visible: boolean;
  onClose: () => void;
  categories: CategoryData[];
  onCategoryPress: (category: CategoryData) => void;
  onAddCategory: () => void;
}

const CategoryGridModal: React.FC<CategoryGridModalProps> = ({
  visible,
  onClose,
  categories,
  onCategoryPress,
  onAddCategory
}) => {
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
              <Text style={styles.headerTitle}>Deine aktiven Bereiche</Text>
              <TouchableOpacity onPress={onAddCategory} style={styles.addButton}>
                <IconSymbol name="plus" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Subtitle */}
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>
                {categories.length} von 13 Präventionsbereichen aktiviert
              </Text>
            </View>

            {/* Categories Grid */}
            <ScrollView style={styles.gridContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.grid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.gridItem}
                    onPress={() => onCategoryPress(category)}
                  >
                    <LinearGradient
                      colors={[category.color, `${category.color}CC`, `${category.color}99`]}
                      style={styles.categoryGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      {/* Progress Badge */}
                      <View style={styles.progressBadge}>
                        <Text style={styles.progressText}>{category.progress}%</Text>
                      </View>

                      {/* Icon */}
                      <Text style={styles.categoryIcon}>{category.icon}</Text>

                      {/* Title */}
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      
                      {/* Description */}
                      <Text style={styles.categoryDescription}>{category.description}</Text>

                      {/* Achievement Icon for high progress */}
                      {category.progress >= 70 && (
                        <View style={styles.achievementIcon}>
                          <Text style={styles.achievementEmoji}>🎯</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                ))}

                {/* Add Category Card */}
                <Pressable style={styles.addCategoryCard} onPress={onAddCategory}>
                  <View style={styles.addCategoryContent}>
                    <Text style={styles.addCategoryIcon}>➕</Text>
                    <Text style={styles.addCategoryText}>Weitere{'\n'}Kategorie{'\n'}hinzufügen</Text>
                  </View>
                </Pressable>
              </View>
            </ScrollView>

            {/* Footer Info */}
            <View style={styles.footerInfo}>
              <Text style={styles.footerText}>
                💡 Tippe auf einen Bereich um deine Big Wins zu bearbeiten
              </Text>
            </View>
          </SafeAreaView>
        </BlurView>
      </View>
    </Modal>
  );
};

export default CategoryGridModal;

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
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
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
  gridContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridItem: {
    width: (width - 60) / 2, // 2 Spalten mit Abstand
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
    padding: 16,
    minHeight: 140,
    position: 'relative',
  },
  progressBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text.dark,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
  achievementIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 12,
  },
  addCategoryCard: {
    width: (width - 60) / 2,
    minHeight: 140,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    marginBottom: 16,
  },
  addCategoryContent: {
    alignItems: 'center',
  },
  addCategoryIcon: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 8,
  },
  addCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 16,
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