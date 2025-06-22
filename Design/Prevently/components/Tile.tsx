import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface TileProps {
  id: string;
  title: string;
  icon: string;
  progress: number;
  description: string;
  color: string;
  onPress?: () => void;
}

const Tile: React.FC<TileProps> = ({ title, icon, progress, description, color, onPress }) => {
  // Dynamische Gradient-Farben je nach Kategorie
  const getGradientColors = (baseColor: string): [string, string, ...string[]] => {
    const colorMap: { [key: string]: [string, string, ...string[]] } = {
      '#4CAF50': ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'], // Grün
      '#2196F3': ['#2196F3', '#42A5F5', '#64B5F6', '#90CAF9'], // Blau
      '#FF9800': ['#FF9800', '#FFB74D', '#FFCC02', '#FFE082'], // Orange
      '#9C27B0': ['#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8'], // Lila
      '#F44336': ['#F44336', '#EF5350', '#E57373', '#FFAB91'], // Rot
      '#795548': ['#795548', '#8D6E63', '#A1887F', '#BCAAA4'], // Braun
    }
    return colorMap[baseColor] || [baseColor, baseColor, baseColor, baseColor]
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={getGradientColors(color)}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Schwebende Hintergrund-Elemente */}
        <View style={[styles.floatingBg1, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} />
        <View style={[styles.floatingBg2, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
        
        {/* Header mit Icon */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Progress Bar - am Ende, damit sie nicht über anderen Elementen liegt */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Floating Achievement Icon */}
        {progress >= 70 && (
          <View style={styles.achievementIcon}>
            <Text style={styles.achievementEmoji}>🎯</Text>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 140,
    marginRight: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.15,
  },
  gradient: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Schwebende Hintergrund-Elemente
  floatingBg1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 1,
  },
  floatingBg2: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 1,
  },

  // Header - Position: oben (0-52px)
  header: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    fontSize: 24,
    fontWeight: '600',
  },
  progressBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 0.5,
  },

  // Content - Position: Mitte (60-100px)
  content: {
    position: 'absolute',
    top: 68,
    left: 16,
    right: 16,
    height: 50,
    zIndex: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
    lineHeight: 18,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: 0.2,
  },

  // Progress Bar - Position: ganz unten (124-130px)
  progressContainer: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    height: 6,
    zIndex: 3,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 3,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },

  // Floating Achievement
  achievementIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 215, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 15,
  },
  achievementEmoji: {
    fontSize: 14,
  },
});

export default Tile; 