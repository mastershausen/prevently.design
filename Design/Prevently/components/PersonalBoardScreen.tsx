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
import Tile, { CategoryData } from './Tile';
import MotivationCard from './MotivationCard';

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

// Premium Radial Progress Circle Component
const PremiumRadialProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <View style={styles.progressSection}>
      {/* Prevently Branding */}
      <View style={styles.brandingContainer}>
        <Text style={styles.brandName}>Prevently</Text>
        <Text style={styles.brandTagline}>Krankheiten vermeiden, statt sie zu heilen</Text>
      </View>

      {/* Score Introduction */}
      <Text style={styles.scoreIntroduction}>Dein Präventionsscore zeigt dir, wie gut du dich um deine Gesundheit kümmerst</Text>

      {/* Enhanced Progress Circle */}
      <View style={styles.progressContainer}>
        <View style={styles.progressCircleOuter}>
          <LinearGradient
            colors={[
              progress < 30 ? '#FF6B6B' : progress < 70 ? '#FFA726' : '#4CAF50',
              progress < 30 ? '#FF8E8E' : progress < 70 ? '#FFB74D' : '#66BB6A',
              progress < 30 ? '#FFAAAA' : progress < 70 ? '#FFC374' : '#81C784'
            ]}
            style={styles.progressGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.progressInner}>
              <Text style={styles.progressNumber}>{progress}</Text>
              <Text style={styles.progressPercent}>%</Text>
              <Text style={styles.progressLabel}>Prävention</Text>
            </View>
          </LinearGradient>
        </View>
        
        {/* Progress Ring Animation Placeholder */}
        <View style={styles.progressRing} />
      </View>

      {/* Achievement Text */}
      <View style={styles.achievementContainer}>
        <Text style={styles.achievementText}>🎉 Ausgezeichnet!</Text>
        <Text style={styles.lastImprovement}>Zuletzt verbessert: +5 Punkte am 15.12.2024</Text>
      </View>
    </View>
  );
};

export default function PersonalBoardScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  // Beispiel Präventionsscore - später aus State/Context
  const preventionScore = 72;

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
      
      {/* Floating Sidebar Button */}
      <TouchableOpacity onPress={openSidebar} style={styles.floatingMenuButton}>
        <IconSymbol name="line.3.horizontal" size={24} color={Colors.text.dark} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Premium Präventionsscore Section */}
        <PremiumRadialProgress progress={preventionScore} />

        {/* Aktive Kategorien Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deine aktiven Bereiche</Text>
            <Text style={styles.sectionSubtitle}>
              {activeCategoriesData.length} von 13 Kategorien aktiviert • Du bist auf einem super Weg! 💪
            </Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
            style={styles.categoriesContainer}
          >
            {activeCategoriesData.map((category) => (
              <Tile
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
                <Text style={styles.addCategoryText}>Weitere Kategorie aktivieren</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Motivation Card */}
        <MotivationCard activeCategoriesCount={activeCategoriesData.length} />
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
  floatingMenuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 100,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Premium Progress Section
  progressSection: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  scoreIntroduction: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    maxWidth: 280,
    fontWeight: '500',
  },
  progressContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  progressCircleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 84,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  progressNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text.dark,
    lineHeight: 40,
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.secondary,
    position: 'absolute',
    top: 35,
    right: 25,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginTop: -4,
    letterSpacing: 0.5,
  },
  progressRing: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 2,
    borderColor: 'rgba(76, 175, 80, 0.2)',
    borderStyle: 'dashed',
  },
  achievementContainer: {
    alignItems: 'center',
  },
  achievementText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.dark,
    marginBottom: 8,
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
    backgroundColor: Colors.white,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text.dark,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    fontWeight: '500',
    lineHeight: 20,
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoriesScroll: {
    paddingRight: 20,
  },

  // Add Category Card
  addCategoryCard: {
    width: 180,
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
    lineHeight: 18,
  },
}); 