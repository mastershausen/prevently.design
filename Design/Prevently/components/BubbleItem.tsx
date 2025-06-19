import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions,
  View
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
  
  return (
    <TouchableOpacity
      style={[
        styles.bubbleContainer,
        {
          position: 'absolute',
          left: bubble.position.x * (width - bubbleSize.width),
          top: bubble.position.y * (height * 0.7),
          width: bubbleSize.width,
          height: bubbleSize.height,
        }
      ]}
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
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  glassContainer: {
    borderRadius: 1000,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  colorGradient: {
    borderRadius: 1000,
    flex: 1,
    position: 'relative',
  },
  topReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 1000,
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
  },
});

export default BubbleItem; 