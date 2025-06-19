import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  Platform,
  TouchableOpacity,
  Animated
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
  const titleFloatAnim = useRef(new Animated.Value(0)).current;
  const titleScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Schwebeanimation für den Titel
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(titleFloatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(titleFloatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Pulsierende Skalierung
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(titleScaleAnim, {
          toValue: 1.02,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(titleScaleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    floatAnimation.start();
    scaleAnimation.start();

    return () => {
      floatAnimation.stop();
      scaleAnimation.stop();
    };
  }, [titleFloatAnim, titleScaleAnim]);

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
        {/* Erste Zeile: Chevron, Titel mittig, Spacer */}
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={openSidebar} style={styles.chevronButton}>
            <IconSymbol name="chevron.left" size={20} color={Colors.text.dark} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Animated.View
              style={[
                styles.titleWrapper,
                {
                  transform: [
                    {
                      translateY: titleFloatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -3],
                      }),
                    },
                    {
                      scale: titleScaleAnim,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.headerTitle}>Prevently</Text>
            </Animated.View>
          </View>
          
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Zweite Zeile: Untertitel zentriert */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.headerSubtitle}>Krankheiten vermeiden, statt sie zu heilen.</Text>
        </View>
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
    paddingBottom: 10,
    flexDirection: 'column',
    zIndex: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    minHeight: 40,
  },
  chevronButton: {
    padding: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    marginBottom: 8,
    // Nur minimaler Schatten um den Text-Bereich
    shadowColor: '#1A5D5D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  headerSpacer: {
    width: 36,
  },
  bubblesContainer: {
    flex: 1,
    position: 'relative',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1A5D5D',
    textAlign: 'center',
    letterSpacing: 1.2,
    // Eleganter Multi-Layer Schatten-Effekt
    textShadowColor: 'rgba(26, 93, 93, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    // iOS-spezifische Schatten für Tiefe
    shadowColor: '#1A5D5D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    // Subtiler Glanz-Effekt
    textDecorationColor: 'rgba(26, 93, 93, 0.1)',
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
  },
}); 