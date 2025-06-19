import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export interface BubbleData {
  id: number;
  title: string;
  color: string;
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
      return { width: 85, height: 85 };
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
      activeOpacity={0.8}
    >
      <BlurView 
        intensity={15} 
        tint="light"
        style={[styles.glassContainer, bubbleSize]}
      >
        <LinearGradient
          colors={[
            `${bubble.color}40`,
            `${bubble.color}20`,
            `${bubble.color}10`
          ]}
          style={[styles.gradientOverlay, bubbleSize]}
        >
          <Text style={[
            styles.bubbleTitle, 
            { fontSize: bubble.size === 'large' ? 16 : bubble.size === 'medium' ? 14 : 12 }
          ]}>
            {bubble.title}
          </Text>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    zIndex: 1,
  },
  glassContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientOverlay: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  bubbleTitle: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default BubbleItem; 