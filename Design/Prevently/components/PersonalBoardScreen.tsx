import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Sidebar from './Sidebar';
import { IconSymbol } from './ui/IconSymbol';
import Colors from '../constants/Colors';

interface CategoryData {
  id: number;
  title: string;
  color: string;
  textColor: string;
  activeBigWins: number;
  totalBigWins: number;
  isActive: boolean;
}

// Beispiel-Daten für aktive Kategorien
const activeCategoriesData: CategoryData[] = [
  {
    id: 1,
    title: 'Ernährung & Stoffwechsel',
    color: Colors.health.nutrition.bubble,
    textColor: Colors.health.nutrition.text,
    activeBigWins: 3,
    totalBigWins: 5,
    isActive: true
  },
  {
    id: 2,
    title: 'Bewegung & Fitness',
    color: Colors.health.fitness.bubble,
    textColor: Colors.health.fitness.text,
    activeBigWins: 4,
    totalBigWins: 6,
    isActive: true
  },
  {
    id: 3,
    title: 'Schlaf & Erholung',
    color: Colors.health.sleep.bubble,
    textColor: Colors.health.sleep.text,
    activeBigWins: 2,
    totalBigWins: 5,
    isActive: true
  },
];

// Radial Progress Circle Component
const RadialProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressCircle}>
        <LinearGradient
          colors={[
            progress < 30 ? '#FF6B6B' : progress < 70 ? '#FFA726' : '#4CAF50',
            progress < 30 ? '#FF8E8E' : progress < 70 ? '#FFB74D' : '#66BB6A'
          ]}
          style={styles.progressGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.progressInner}>
            <Text style={styles.progressText}>{progress}%</Text>
            <Text style={styles.progressLabel}>Prävention</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

// Category Card Component
const CategoryCard: React.FC<{ category: CategoryData; onPress: (category: CategoryData) => void }> = ({ 
  category, 
  onPress 
}) => {
  const progressPercentage = (category.activeBigWins / category.totalBigWins) * 100;

  return (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[
          `${category.color}F0`,
          `${category.color}E0`,
          `${category.color}D0`
        ]}
        style={styles.categoryGradient}
      >
        <View style={styles.categoryContent}>
          <Text style={[styles.categoryTitle, { color: category.textColor }]}>
            {category.title}
          </Text>
          
          <View style={styles.progressInfo}>
            <Text style={[styles.progressStats, { color: category.textColor }]}>
              {category.activeBigWins}/{category.totalBigWins} Big Wins aktiv
            </Text>
            
            <View style={styles.miniProgressBar}>
              <View 
                style={[
                  styles.miniProgressFill, 
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: category.textColor 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function PersonalBoardScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  // Beispiel Präventionsscore - später aus State/Context
  const preventionScore = 72;
  const lastImprovement = "+5 Punkte am 15.12.2024";

  const handleCategoryPress = (category: CategoryData) => {
    console.log(`Category pressed: ${category.title}`);
    // Hier später Navigation zu Big Wins Screen
  };

  const handleAddCategory = () => {
    console.log('Add category pressed');
    // Hier später Navigation zu Kategorie-Auswahl
  };

  const openSidebar = () => setSidebarVisible(true);
  const closeSidebar = () => setSidebarVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header mit Sidebar Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.menuButton}>
          <IconSymbol name="line.3.horizontal" size={24} color={Colors.text.dark} />
        </TouchableOpacity>
        
        <Text style={styles.screenTitle}>Personal Board</Text>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Präventionsscore Section */}
        <View style={styles.scoreSection}>
          <RadialProgress progress={preventionScore} />
          <Text style={styles.lastImprovement}>{lastImprovement}</Text>
        </View>

        {/* Aktive Kategorien Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deine aktiven Bereiche</Text>
            <Text style={styles.sectionSubtitle}>
              {activeCategoriesData.length} von 13 Kategorien aktiv
            </Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
            style={styles.categoriesContainer}
          >
            {activeCategoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={handleCategoryPress}
              />
            ))}
            
            {/* Add Category Card */}
            <TouchableOpacity 
              style={styles.addCategoryCard}
              onPress={handleAddCategory}
              activeOpacity={0.8}
            >
              <View style={styles.addCategoryContent}>
                <IconSymbol name="plus.circle" size={32} color={Colors.primary} />
                <Text style={styles.addCategoryText}>Kategorie hinzufügen</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Motivational Section */}
        <View style={styles.motivationSection}>
          <Text style={styles.motivationTitle}>🎯 Dein Präventions-Fortschritt</Text>
          <Text style={styles.motivationText}>
            Großartig! Du hast bereits {activeCategoriesData.length} Gesundheitsbereiche aktiviert. 
            Jede kleine Verbesserung bringt dich näher zu einem gesünderen Leben.
          </Text>
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} onClose={closeSidebar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  screenTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Präventionsscore Styles
  scoreSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    padding: 8,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.dark,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginTop: 2,
  },
  lastImprovement: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Kategorien Section
  categoriesSection: {
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoriesScroll: {
    paddingRight: 20,
  },

  // Category Card Styles
  categoryCard: {
    width: 200,
    height: 120,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  progressInfo: {
    marginTop: 8,
  },
  progressStats: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  miniProgressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Add Category Card
  addCategoryCard: {
    width: 160,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  addCategoryContent: {
    alignItems: 'center',
  },
  addCategoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 8,
    textAlign: 'center',
  },

  // Motivation Section
  motivationSection: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
}); 