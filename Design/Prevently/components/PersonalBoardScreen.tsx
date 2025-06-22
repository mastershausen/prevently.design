import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Tile from './Tile';
import MotivationCard from './MotivationCard';

// Premium Radial Progress Circle Component
const PremiumRadialProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <View style={styles.progressSection}>
      {/* Prevently Branding */}
      <View style={styles.brandingContainer}>
        <Text style={styles.brandName}>Prevently</Text>
        <Text style={styles.brandTagline}>Krankheiten vermeiden, statt sie zu heilen</Text>
      </View>

      {/* Motivierender Call-to-Action statt langweiliger Erklärung */}
      <Text style={styles.motivationalText}>
        🚀 Du rockst deine Gesundheit! Dein Präventionsscore beträgt
      </Text>

      {/* Enhanced Progress Circle */}
      <View style={styles.progressContainer}>
        {/* Floating Background Elements */}
        <View style={styles.floatingElement1} />
        <View style={styles.floatingElement2} />
        <View style={styles.floatingElement3} />
        
        <View style={styles.progressCircleOuter}>
          <LinearGradient
            colors={[
              progress < 30 ? '#FF6B6B' : progress < 70 ? '#FF9800' : '#4CAF50',
              progress < 30 ? '#FF8A80' : progress < 70 ? '#FFB74D' : '#66BB6A',
              progress < 30 ? '#FFCDD2' : progress < 70 ? '#FFE0B2' : '#A5D6A7',
              progress < 30 ? '#FFEBEE' : progress < 70 ? '#FFF3E0' : '#E8F5E8'
            ]}
            style={styles.progressGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.progressInner}>
              <View style={styles.scoreContainer}>
                <Text style={styles.progressNumber}>{progress}</Text>
              </View>
              
              {/* Floating Score Icon */}
              <View style={styles.floatingScoreIcon}>
                <Text style={styles.scoreEmoji}>⭐</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Multiple Progress Rings */}
        <View style={styles.progressRing1} />
        <View style={styles.progressRing2} />
      </View>

      {/* Enhanced Achievement Text */}
      <View style={styles.achievementContainer}>
        <View style={styles.achievementBadge}>
          <Text style={styles.achievementIcon}>🏆</Text>
          <Text style={styles.achievementText}>Top Performer!</Text>
        </View>
        <Text style={styles.lastImprovement}>Zuletzt verbessert: +5 Punkte am 15.12.2024</Text>
      </View>
    </View>
  );
};

const PersonalBoardScreen: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const preventionScore = 72;
  const activeCategoriesCount = 3; // Anzahl der aktiven Kategorien

  // Handlers
  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleAddCategory = () => {
    console.log('Add category pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Floating Sidebar Button */}
      <TouchableOpacity onPress={handleMenuPress} style={styles.floatingMenuButton}>
        <IconSymbol name="line.3.horizontal" size={24} color={Colors.text.dark} />
      </TouchableOpacity>

      <View style={styles.mainContent}>
        {/* Premium Präventionsscore Section */}
        <PremiumRadialProgress progress={preventionScore} />

        {/* Aktive Kategorien Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deine aktiven Bereiche</Text>
            <Text style={styles.sectionSubtitle}>
              {activeCategoriesCount} von 13 Kategorien aktiviert • Du bist auf einem super Weg! 💪
            </Text>
          </View>

          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              <Tile
                id="nutrition"
                title="Ernährung & Stoffwechsel"
                icon="🥗"
                progress={85}
                description="Ausgewogene Ernährung"
                color="#4CAF50"
                onPress={() => console.log('Ernährung pressed')}
              />
              <Tile
                id="fitness"
                title="Bewegung & Fitness"
                icon="🏃‍♂️"
                progress={72}
                description="Regelmäßige Aktivität"
                color="#2196F3"
                onPress={() => console.log('Fitness pressed')}
              />
              <Tile
                id="sleep"
                title="Schlaf & Erholung"
                icon="😴"
                progress={68}
                description="Erholsamer Schlaf"
                color="#FF9800"
                onPress={() => console.log('Schlaf pressed')}
              />
              
              {/* Add Category Card */}
              <Pressable style={styles.addCategoryCard} onPress={handleAddCategory}>
                <View style={styles.addCategoryContent}>
                  <Text style={{ fontSize: 32, color: Colors.primary }}>➕</Text>
                  <Text style={styles.addCategoryText}>Weitere{'\n'}Kategorie{'\n'}hinzufügen</Text>
                </View>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Weiß statt bläulich
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
  mainContent: {
    flex: 1,
    backgroundColor: Colors.white, // Explizit weiß setzen
  },
  
  // Premium Progress Section mit lebendigem Hintergrund
  progressSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 50, // Mehr Platz unten für besseren Übergang
    // Lebendiger Gradient-Hintergrund
    backgroundColor: '#F8FAFF',
    position: 'relative',
    overflow: 'hidden',
    flex: 0, // Nimmt nur den benötigten Platz ein
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 10,
  },
  brandName: {
    fontSize: 30,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 122, 255, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandTagline: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
  motivationalText: {
    fontSize: 16,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 320,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  progressContainer: {
    position: 'relative',
    marginBottom: 20,
    zIndex: 5,
  },
  progressCircleOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    // Zusätzlicher Glow-Effekt
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  progressGradient: {
    flex: 1,
    borderRadius: 92,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  scoreContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressNumber: {
    fontSize: 46,
    fontWeight: '900',
    color: Colors.text.dark,
    lineHeight: 52,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  progressPercent: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.secondary,
    marginLeft: 2,
    marginTop: -10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.secondary,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  // Schwebende Hintergrund-Elemente
  floatingElement1: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    zIndex: 1,
  },
  floatingElement2: {
    position: 'absolute',
    top: 40,
    right: -40,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    zIndex: 1,
  },
  floatingElement3: {
    position: 'absolute',
    bottom: -30,
    left: 60,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 152, 0, 0.08)',
    zIndex: 1,
  },
  floatingScoreIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  scoreEmoji: {
    fontSize: 18,
  },
  progressRing1: {
    position: 'absolute',
    top: -8,
    left: -8,
    width: 216,
    height: 216,
    borderRadius: 108,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.15)',
    borderStyle: 'dashed',
    zIndex: 2,
  },
  progressRing2: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
    borderStyle: 'solid',
    zIndex: 1,
  },
  achievementContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  achievementBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  lastImprovement: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.8,
    marginBottom: 8,
  },

  // Kategorien Section mit besserem Hintergrund
  categoriesSection: {
    flex: 1, // Nimmt den gesamten verfügbaren Platz ein
    paddingBottom: 30, // Besserer Abstand vom unteren Rand
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -40, // Stärker negativ um progressSection zu überdecken
    paddingTop: 24, // Reduziert von 32
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12, // Reduziert von 16
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text.dark,
    marginBottom: 4, // Reduziert von 6
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '600',
    lineHeight: 20,
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingBottom: 20, // Weniger Platz unter den Tiles
  },
  categoriesScroll: {
    paddingRight: 20,
    backgroundColor: 'transparent', // Kein grauer Hintergrund zwischen Tiles
  },

  // Verbesserte Add Category Card
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
}); 