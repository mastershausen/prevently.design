import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface Expert {
  id: string;
  name: string;
  image: string;
  description: string;
  detailedDescription: string;
  specialties: string[];
  experience: string;
  contactLink: string;
}

interface ExpertCardProps {
  expert: Expert;
  onContact: (expert: Expert) => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onContact }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.expertCard}>
      <View style={styles.expertHeader}>
        <Image source={{ uri: expert.image }} style={styles.expertImage} />
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{expert.name}</Text>
          <Text style={styles.expertDescription}>{expert.description}</Text>
        </View>
        <TouchableOpacity 
          onPress={toggleExpanded}
          style={styles.expertInfoButton}
        >
          <IconSymbol 
            name="info.circle" 
            size={20} 
            color={Colors.primary} 
          />
        </TouchableOpacity>
      </View>

      {/* Expanded Expert Info */}
      {isExpanded && (
        <View style={styles.expertExpanded}>
          <Text style={styles.expertDetailDescription}>{expert.detailedDescription}</Text>
          
          <View style={styles.expertSpecialties}>
            <Text style={styles.expertSpecialtiesTitle}>Schwerpunkte:</Text>
            {expert.specialties.map((specialty, index) => (
              <Text key={index} style={styles.specialtyTag}>• {specialty}</Text>
            ))}
          </View>
          
          <Text style={styles.expertExperience}>{expert.experience}</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.expertContact}
        onPress={() => onContact(expert)}
      >
        <Text style={styles.expertContactText}>Jetzt buchen</Text>
        <IconSymbol name="arrow.right" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ExpertCard;

const styles = StyleSheet.create({
  expertCard: {
    flexDirection: 'column',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  expertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  expertDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  expertInfoButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  expertExpanded: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 122, 255, 0.1)',
  },
  expertDetailDescription: {
    fontSize: 15,
    color: Colors.text.dark,
    lineHeight: 22,
    marginBottom: 12,
  },
  expertSpecialties: {
    marginBottom: 12,
  },
  expertSpecialtiesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.dark,
    marginBottom: 6,
  },
  specialtyTag: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 2,
  },
  expertExperience: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  expertContact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  expertContactText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginRight: 6,
  },
}); 