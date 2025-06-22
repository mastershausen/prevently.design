import React from 'react';
import { 
  View,
  Text, 
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

interface MotivationCardProps {
  activeCategoriesCount: number;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ activeCategoriesCount }) => {
  return (
    <View style={styles.motivationSection}>
      <Text style={styles.motivationTitle}>🎯 Dein Präventions-Fortschritt</Text>
      <Text style={styles.motivationText}>
        Großartig! Du hast bereits {activeCategoriesCount} Gesundheitsbereiche aktiviert. 
        Jede kleine Verbesserung bringt dich näher zu einem gesünderen Leben.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  motivationSection: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});

export default MotivationCard; 