import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';

interface Deal {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  description: string;
  why: string;
  features: string[];
  expiresIn?: string;
  isPopular?: boolean;
  affiliateLink: string;
  discountCode?: string;
  discountText?: string;
}

interface ProductCardProps {
  deal: Deal;
  onPress: (deal: Deal) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ deal, onPress }) => {
  // Dynamische Gradient-Farben je nach Kategorie wie in den Tiles
  const getGradientColors = (baseColor: string): [string, string, ...string[]] => {
    const colorMap: { [key: string]: [string, string, ...string[]] } = {
      '#4CAF50': ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'], // Grün
      '#2196F3': ['#2196F3', '#42A5F5', '#64B5F6', '#90CAF9'], // Blau
      '#FF9800': ['#FF9800', '#FFB74D', '#FFCC02', '#FFE082'], // Orange
      '#9C27B0': ['#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8'], // Lila
      '#F44336': ['#F44336', '#EF5350', '#E57373', '#FFAB91'], // Rot
      '#795548': ['#795548', '#8D6E63', '#A1887F', '#BCAAA4'], // Braun
      '#E91E63': ['#E91E63', '#F06292', '#F48FB1', '#F8BBD9'], // Pink
    }
    return colorMap[baseColor] || [baseColor, baseColor + 'CC', baseColor + '99', baseColor + '66']
  }

  return (
    <TouchableOpacity 
      style={[styles.card, { 
        shadowColor: deal.categoryColor,
        shadowOpacity: 0.25,
      }]}
      onPress={() => onPress(deal)}
      activeOpacity={0.92}
    >
      <LinearGradient
        colors={getGradientColors(deal.categoryColor)}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Floating Background Elements wie in Tiles */}
        <View style={[styles.floatingBg1, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} />
        <View style={[styles.floatingBg2, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
        
        {deal.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>🔥 Bestseller</Text>
          </View>
        )}
        
        {/* Header mit Image und Category Badge */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: deal.image }} style={styles.image} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>{deal.categoryIcon}</Text>
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          <Text style={styles.title}>{deal.title}</Text>
          <Text style={styles.subtitle}>{deal.subtitle}</Text>
          
          <Text style={styles.why}>{deal.why}</Text>

          {deal.discountText && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                ✨ {deal.discountText}
              </Text>
            </View>
          )}
        </View>

        {/* Achievement Icon für beliebte Produkte */}
        {deal.isPopular && (
          <View style={styles.achievementIcon}>
            <Text style={styles.achievementEmoji}>⭐</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 320,
  },
  floatingBg1: {
    position: 'absolute',
    top: -30,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    zIndex: 1,
  },
  floatingBg2: {
    position: 'absolute',
    bottom: -50,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    zIndex: 1,
  },
  popularBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    zIndex: 25,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  popularText: {
    fontSize: 13,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
    margin: 20,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f8f8',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  categoryIcon: {
    fontSize: 22,
  },
  content: {
    padding: 24,
    paddingTop: 8,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  why: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 20,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  discountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  discountText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.text.dark,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  achievementIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 25,
  },
  achievementEmoji: {
    fontSize: 18,
  },
}); 