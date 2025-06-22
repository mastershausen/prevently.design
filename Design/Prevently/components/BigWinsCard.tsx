import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface BigWinAction {
  id: string;
  title: string;
  description: string;
  infoDetails: {
    whatIs: string;
    whyUseful: string;
    howToImplement: string;
    affiliateLink?: string;
  };
  status?: 'implementing' | 'want_to' | 'not_relevant' | null;
}

interface BigWinsCardProps {
  action: BigWinAction;
  onStatusChange: (actionId: string, status: string) => void;
  initialStatus?: string;
}

const BigWinsCard: React.FC<BigWinsCardProps> = ({ action, onStatusChange, initialStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus || '');

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    onStatusChange(action.id, status);
  };

  return (
    <View style={styles.actionCard}>
      {/* Action Header */}
      <View style={styles.actionHeader}>
        <View style={styles.actionTitleRow}>
          <Text style={styles.actionTitle}>{action.title}</Text>
          <TouchableOpacity 
            onPress={toggleExpanded}
            style={styles.infoButton}
          >
            <IconSymbol 
              name="info.circle" 
              size={20} 
              color={Colors.primary} 
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.actionDescription}>{action.description}</Text>
      </View>

      {/* Expanded Info */}
      {isExpanded && (
        <View style={styles.infoExpanded}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Was ist das?</Text>
            <Text style={styles.infoText}>{action.infoDetails.whatIs}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Warum sinnvoll?</Text>
            <Text style={styles.infoText}>{action.infoDetails.whyUseful}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Wie umsetzen?</Text>
            <Text style={styles.infoText}>{action.infoDetails.howToImplement}</Text>
          </View>
          {action.infoDetails.affiliateLink && (
            <TouchableOpacity style={styles.affiliateButton}>
              <Text style={styles.affiliateButtonText}>Empfohlene Produkte ansehen</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Status Selection */}
      <View style={styles.statusSection}>
        <Text style={styles.statusLabel}>Wie stehst du zu dieser Maßnahme?</Text>
        <View style={styles.statusButtons}>
          {[
            { key: 'implementing', label: 'Setze ich schon um', color: '#4CAF50' },
            { key: 'want_to', label: 'Will ich umsetzen', color: Colors.primary },
            { key: 'not_relevant', label: 'Nicht relevant', color: '#FF6B6B' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.statusButton,
                currentStatus === option.key && { 
                  backgroundColor: option.color,
                  borderColor: option.color 
                }
              ]}
              onPress={() => handleStatusChange(option.key)}
            >
              <Text style={[
                styles.statusButtonText,
                currentStatus === option.key && { color: 'white' }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BigWinsCard;

const styles = StyleSheet.create({
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
  },
  actionHeader: {
    marginBottom: 12,
  },
  actionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text.dark,
    marginRight: 8,
    flex: 1,
  },
  infoButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  actionDescription: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
    marginTop: 8,
  },
  infoExpanded: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 122, 255, 0.1)',
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
  },
  affiliateButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  affiliateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  statusSection: {
    marginTop: 16,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  statusButton: {
    padding: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.2)',
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.dark,
    textAlign: 'center',
  },
}); 