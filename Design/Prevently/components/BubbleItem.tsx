import React, { useEffect, useRef } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions,
  View,
  Animated
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export interface BubbleData {
  id: number;
  title: string;
  color: string;
  textColor?: string;
  size: 'large' | 'medium' | 'small';
  position: { x: number; y: number };
}

interface BubbleItemProps {
  bubble: BubbleData;
  onPress: (bubble: BubbleData) => void;
}

const getBubbleSize = (size: 'large' | 'medium' | 'small') => {
  switch (size) {
    case 'large':
      return { width: 140, height: 140 };
    case 'medium':
      return { width: 110, height: 110 };
    case 'small':
      return { width: 100, height: 100 };
  }
};

const BubbleItem: React.FC<BubbleItemProps> = ({ bubble, onPress }) => {
  const bubbleSize = getBubbleSize(bubble.size);
  
  // Animierte Werte für die Schwebeanimation
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Verschiedene Animationsparameter basierend auf der Bubble-ID für Vielfalt
    const animationSeed = bubble.id;
    const baseSpeed = 3000 + (animationSeed * 500); // 3-8 Sekunden
    const xRange = 15 + (animationSeed % 3) * 5; // 15-25px Bewegung
    const yRange = 20 + (animationSeed % 4) * 5; // 20-35px Bewegung
    
    // X-Achse Animation (horizontales Schweben)
    const animateX = () => {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: xRange,
          duration: baseSpeed,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -xRange,
          duration: baseSpeed * 1.2,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: baseSpeed * 0.8,
          useNativeDriver: true,
        }),
      ]).start(() => animateX());
    };
    
    // Y-Achse Animation (vertikales Schweben)
    const animateY = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -yRange,
          duration: baseSpeed * 0.7,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: yRange,
          duration: baseSpeed * 1.3,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: baseSpeed,
          useNativeDriver: true,
        }),
      ]).start(() => animateY());
    };
    
    // Sanfte Skalierung für lebendigen Effekt
    const animateScale = () => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.02,
          duration: baseSpeed * 1.5,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.98,
          duration: baseSpeed * 1.2,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: baseSpeed,
          useNativeDriver: true,
        }),
      ]).start(() => animateScale());
    };
    
    // Starte Animationen mit leichten Verzögerungen für natürlichere Bewegung
    setTimeout(() => animateX(), animationSeed * 100);
    setTimeout(() => animateY(), animationSeed * 150);
    setTimeout(() => animateScale(), animationSeed * 200);
  }, [bubble.id, translateX, translateY, scale]);
  
  return (
    <Animated.View
      style={[
        styles.bubbleContainer,
        {
          position: 'absolute',
          left: bubble.position.x * (width - bubbleSize.width),
          top: bubble.position.y * (height * 0.7),
          width: bubbleSize.width,
          height: bubbleSize.height,
          transform: [
            { translateX },
            { translateY },
            { scale }
          ],
        }
      ]}
    >
      <TouchableOpacity
        style={[bubbleSize]}
        onPress={() => onPress(bubble)}
        activeOpacity={0.9}
      >
        <BlurView 
          intensity={40} 
          tint="light"
          style={[styles.glassContainer, bubbleSize]}
        >
          <LinearGradient
            colors={[
              `${bubble.color}FF`,
              `${bubble.color}F0`,
              `${bubble.color}E0`
            ]}
            style={[styles.colorGradient, bubbleSize]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.4)',
                'rgba(255, 255, 255, 0.2)',
                'rgba(255, 255, 255, 0.0)'
              ]}
              style={[styles.topReflection, bubbleSize]}
            />
            
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.0)'
              ]}
              style={[styles.topHighlight, bubbleSize]}
            />
            
            <View style={styles.textContainer}>
              <Text style={[
                styles.bubbleTitle, 
                { 
                  fontSize: bubble.size === 'large' ? 16 : bubble.size === 'medium' ? 14 : 13,
                  color: bubble.textColor || '#2D3436'
                }
              ]}>
                {bubble.title}
              </Text>
            </View>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.28,
    shadowRadius: 26,
    elevation: 20,
  },
  glassContainer: {
    borderRadius: 1000,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  colorGradient: {
    borderRadius: 1000,
    flex: 1,
    position: 'relative',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  topReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderRadius: 1000,
    opacity: 0.8,
  },
  topHighlight: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    height: '25%',
    borderRadius: 1000,
    opacity: 0.9,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  bubbleTitle: {
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default BubbleItem; 