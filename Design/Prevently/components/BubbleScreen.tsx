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
import Colors from '../constants/Colors';

const bubbleData: BubbleData[] = [
  {
    id: 1,
    title: 'Ernährung &\nSupplemente',
    color: Colors.health.nutrition.bubble,
    textColor: Colors.health.nutrition.text,
    size: 'large',
    position: { x: 0.15, y: 0.12 }
  },
  {
    id: 2,
    title: 'Bewegung &\nFitness',
    color: Colors.health.fitness.bubble,
    textColor: Colors.health.fitness.text,
    size: 'medium',
    position: { x: 0.65, y: 0.08 }
  },
  {
    id: 3,
    title: 'Schlaf &\nErholung',
    color: Colors.health.sleep.bubble,
    textColor: Colors.health.sleep.text,
    size: 'medium',
    position: { x: 0.25, y: 0.35 }
  },
  {
    id: 4,
    title: 'Haut &\nHaare',
    color: Colors.health.skin.bubble,
    textColor: Colors.health.skin.text,
    size: 'small',
    position: { x: 0.75, y: 0.32 }
  },
  {
    id: 5,
    title: 'Zahn-\ngesundheit',
    color: Colors.health.dental.bubble,
    textColor: Colors.health.dental.text,
    size: 'small',
    position: { x: 0.05, y: 0.58 }
  },
  {
    id: 6,
    title: 'Darm &\nVerdauung',
    color: Colors.health.digestion.bubble,
    textColor: Colors.health.digestion.text,
    size: 'medium',
    position: { x: 0.45, y: 0.52 }
  },
  {
    id: 7,
    title: 'Hormone &\nStoffwechsel',
    color: Colors.health.hormones.bubble,
    textColor: Colors.health.hormones.text,
    size: 'small',
    position: { x: 0.8, y: 0.58 }
  },
  {
    id: 8,
    title: 'Immunsystem &\nInfekte',
    color: Colors.health.immune.bubble,
    textColor: Colors.health.immune.text,
    size: 'medium',
    position: { x: 0.15, y: 0.78 }
  },
  {
    id: 9,
    title: 'Psyche &\nStressbewältigung',
    color: Colors.health.mental.bubble,
    textColor: Colors.health.mental.text,
    size: 'large',
    position: { x: 0.55, y: 0.75 }
  },
  {
    id: 10,
    title: 'Krebsvorsorge &\nCheck-ups',
    color: Colors.health.prevention.bubble,
    textColor: Colors.health.prevention.text,
    size: 'small',
    position: { x: 0.35, y: 0.95 }
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
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openSidebar} style={styles.chevronButton}>
          <IconSymbol name="chevron.left" size={20} color={Colors.text.dark} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Prevently</Text>
          <Text style={styles.headerSubtitle}>Krankheiten vermeiden, statt sie zu heilen.</Text>
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
      
      {/* Sidebar */}
      <Sidebar isVisible={sidebarVisible} onClose={closeSidebar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  chevronButton: {
    padding: 8,
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A5D5D',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
  },
  headerSpacer: {
    width: 36,
  },
  bubblesContainer: {
    flex: 1,
    position: 'relative',
  },
}); 