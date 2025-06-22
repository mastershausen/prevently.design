import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Tile from './Tile';

const { width, height } = Dimensions.get('window');

interface CategoryData {
  id: string;
  title: string;
  icon: string;
  color: string;
  progress: number;
  description: string;
}

interface ExpandableBottomSheetProps {
  categories: CategoryData[];
  activeCategoriesCount: number;
  onCategoryPress: (category: CategoryData) => void;
  onAddCategory: () => void;
}

const ExpandableBottomSheet: React.FC<ExpandableBottomSheetProps> = ({
  categories,
  activeCategoriesCount,
  onCategoryPress,
  onAddCategory
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(280)).current; // Start mit höherer minimaler Höhe

  const toggleExpanded = () => {
    const toValue = isExpanded ? 280 : height * 0.75; // Von 280px zu 75% des Bildschirms
    
    Animated.spring(animatedHeight, {
      toValue,
      useNativeDriver: false, // Wichtig: false für height Animation
      tension: 80,
      friction: 10,
    }).start();
    
    setIsExpanded(!isExpanded);
  };

  const renderCarouselView = () => (
    <View style={styles.carouselContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <Tile
            key={category.id}
            id={category.id}
            title={category.title}
            icon={category.icon}
            progress={category.progress}
            description={category.description}
            color={category.color}
            onPress={() => onCategoryPress(category)}
          />
        ))}
        
        {/* Add Category Card */}
        <Pressable style={styles.addCategoryCard} onPress={onAddCategory}>
          <View style={styles.addCategoryContent}>
            <Text style={{ fontSize: 32, color: Colors.primary }}>➕</Text>
            <Text style={styles.addCategoryText}>Weitere{'\n'}Kategorie{'\n'}hinzufügen</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );

  const renderGridView = () => (
    <View style={styles.gridContainer}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.gridScroll}>
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
          <Pressable style={styles.gridAddCard} onPress={onAddCategory}>
            <View style={styles.addCategoryContent}>
              <Text style={styles.addCategoryIcon}>➕</Text>
              <Text style={styles.gridAddText}>Weitere{'\n'}Kategorie{'\n'}hinzufügen</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          height: animatedHeight,
        }
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.sectionTitle}>Deine aktiven Bereiche</Text>
            <Text style={styles.sectionSubtitle}>
              {activeCategoriesCount} von 13 Kategorien aktiviert • Du bist auf einem super Weg! 💪
            </Text>
          </View>
          <TouchableOpacity onPress={toggleExpanded} style={styles.expandButton}>
            <IconSymbol 
              name={isExpanded ? "arrow.down" : "square.grid.2x2"} 
              size={22} 
              color={Colors.primary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content - nur im erweiterten Zustand scrollbar */}
      <View style={styles.contentContainer}>
        {isExpanded ? renderGridView() : renderCarouselView()}
      </View>
    </Animated.View>
  );
};

export default ExpandableBottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 0,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text.dark,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '600',
    lineHeight: 20,
  },
  expandButton: {
    padding: 0,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },

  // Carousel View
  carouselContainer: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  categoriesScroll: {
    paddingRight: 20,
  },
  addCategoryCard: {
    width: 180,
    height: 140,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addCategoryContent: {
    alignItems: 'center',
  },
  addCategoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.3,
  },

  // Grid View
  gridContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gridScroll: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridItem: {
    width: (width - 60) / 2,
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
  gridAddCard: {
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
  addCategoryIcon: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 8,
  },
  gridAddText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 16,
  },
  contentContainer: {
    flex: 1,
  },
}); 