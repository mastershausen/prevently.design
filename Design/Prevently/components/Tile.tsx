import React from 'react';
import { 
  TouchableOpacity,
  Text, 
  StyleSheet, 
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface CategoryData {
  id: number;
  title: string;
  color: string;
  textColor: string;
  activeBigWins: number;
  totalBigWins: number;
  isActive: boolean;
}

interface TileProps {
  category: CategoryData;
  onPress: (category: CategoryData) => void;
}

const Tile: React.FC<TileProps> = ({ category, onPress }) => {
  const progressPercentage = (category.activeBigWins / category.totalBigWins) * 100;

  return (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[
          `${category.color}F0`,
          `${category.color}E0`,
          `${category.color}D0`
        ]}
        style={styles.categoryGradient}
      >
        <View style={styles.categoryContent}>
          <Text style={[styles.categoryTitle, { color: category.textColor }]}>
            {category.title}
          </Text>
          
          <View style={styles.progressInfo}>
            <Text style={[styles.progressStats, { color: category.textColor }]}>
              {category.activeBigWins}/{category.totalBigWins} Big Wins aktiv
            </Text>
            
            <View style={styles.miniProgressBar}>
              <View 
                style={[
                  styles.miniProgressFill, 
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: category.textColor 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 200,
    height: 120,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  progressInfo: {
    marginTop: 8,
  },
  progressStats: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  miniProgressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default Tile; 