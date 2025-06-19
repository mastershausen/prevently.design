import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BubbleItem, { BubbleData } from './BubbleItem';
import Sidebar from './Sidebar';
import { IconSymbol } from './ui/IconSymbol';

const bubbleData: BubbleData[] = [
  {
    id: 1,
    title: 'Ernährung &\nSupplemente',
    color: '#FF6B6B',
    size: 'large',
    position: { x: 0.15, y: 0.12 }
  },
  {
    id: 2,
    title: 'Bewegung &\nFitness',
    color: '#4ECDC4',
    size: 'medium',
    position: { x: 0.65, y: 0.08 }
  },
  {
    id: 3,
    title: 'Schlaf &\nErholung',
    color: '#45B7D1',
    size: 'medium',
    position: { x: 0.25, y: 0.35 }
  },
  {
    id: 4,
    title: 'Haut &\nHaare',
    color: '#96CEB4',
    size: 'small',
    position: { x: 0.75, y: 0.32 }
  },
  {
    id: 5,
    title: 'Zahngesundheit',
    color: '#FECA57',
    size: 'small',
    position: { x: 0.1, y: 0.55 }
  },
  {
    id: 6,
    title: 'Darm &\nVerdauung',
    color: '#FF9FF3',
    size: 'medium',
    position: { x: 0.6, y: 0.55 }
  },
  {
    id: 7,
    title: 'Hormone &\nStoffwechsel',
    color: '#54A0FF',
    size: 'large',
    position: { x: 0.2, y: 0.75 }
  },
  {
    id: 8,
    title: 'Immunsystem\n& Infekte',
    color: '#5F27CD',
    size: 'small',
    position: { x: 0.75, y: 0.75 }
  },
  {
    id: 9,
    title: 'Psyche &\nStressbewältigung',
    color: '#00D2D3',
    size: 'medium',
    position: { x: 0.35, y: 0.92 }
  },
  {
    id: 10,
    title: 'Krebsvorsorge\n& Check-ups',
    color: '#FF6348',
    size: 'small',
    position: { x: 0.1, y: 0.05 }
  }
];

export default function BubbleScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleBubblePress = (bubble: BubbleData) => {
    console.log(`Bubble pressed: ${bubble.title}`);
    // Hier später Navigation zu Detail-Screen
  };

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Hintergrund Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.menuButton}>
          <IconSymbol name="line.3.horizontal" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Prevently</Text>
          <Text style={styles.headerSubtitle}>Deine Gesundheit im Fokus</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Bubbles Container */}
      <View style={styles.bubblesContainer}>
        {bubbleData.map((bubble) => (
          <BubbleItem
            key={bubble.id}
            bubble={bubble}
            onPress={handleBubblePress}
          />
        ))}
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Wähle einen Bereich aus</Text>
      </View>
      
      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} onClose={closeSidebar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  menuButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSpacer: {
    width: 48, // Same width as menuButton to center the title
  },
  bubblesContainer: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  footerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
}); 