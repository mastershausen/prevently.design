import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={Colors.text.dark} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>💙 Über Prevently</Text>
            <Text style={styles.headerSubtitle}>Unsere Mission für deine Gesundheit</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Mission Card */}
          <View style={styles.card}>
            <BlurView intensity={15} tint="light" style={styles.cardBlur}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.95)',
                  'rgba(255, 255, 255, 0.85)',
                  'rgba(248, 250, 255, 0.90)'
                ]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.floatingElement1, { backgroundColor: 'rgba(0, 122, 255, 0.08)' }]} />
                <View style={[styles.floatingElement2, { backgroundColor: 'rgba(76, 175, 80, 0.06)' }]} />
                
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>🎯</Text>
                  <Text style={styles.cardTitle}>Unsere Mission</Text>
                  <Text style={styles.cardText}>
                    "Krankheiten vermeiden, statt sie zu heilen"
                  </Text>
                  <Text style={styles.cardDescription}>
                    Deine Zeit ist zu wertvoll für Wartezimmer. Wir möchten, dass du ein Leben voller 
                    Energie führst. Mit wenigen einfachen Gewohnheiten lässt sich das erreichen. 
                    Dabei helfen wir dir auf einfache und bezahlbare Weise.
                  </Text>
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          {/* Philosophy Card */}
          <View style={styles.card}>
            <BlurView intensity={15} tint="light" style={styles.cardBlur}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.95)',
                  'rgba(255, 255, 255, 0.85)',
                  'rgba(248, 250, 255, 0.90)'
                ]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.floatingElement1, { backgroundColor: 'rgba(156, 39, 176, 0.08)' }]} />
                <View style={[styles.floatingElement2, { backgroundColor: 'rgba(0, 122, 255, 0.06)' }]} />
                
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>🌟</Text>
                  <Text style={styles.cardTitle}>Unsere Philosophie</Text>
                  <Text style={styles.cardText}>
                    "Gesund leben heißt auch das Leben zu genießen."
                  </Text>
                  <Text style={styles.cardDescription}>
                    Gesundheit entsteht durch Balance, nicht durch Verzicht. Die richtigen Grundlagen 
                    schaffen Raum für Spontaneität und Lebensfreude. Wir glauben daran, dass sich 
                    gesunde Entscheidungen gut anfühlen sollten.
                  </Text>
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          {/* Why Card */}
          <View style={styles.card}>
            <BlurView intensity={15} tint="light" style={styles.cardBlur}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.95)',
                  'rgba(255, 255, 255, 0.85)',
                  'rgba(248, 250, 255, 0.90)'
                ]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.floatingElement1, { backgroundColor: 'rgba(76, 175, 80, 0.08)' }]} />
                <View style={[styles.floatingElement2, { backgroundColor: 'rgba(255, 152, 0, 0.06)' }]} />
                
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>💎</Text>
                  <Text style={styles.cardTitle}>Warum weniger mehr ist</Text>
                  <Text style={styles.cardText}>
                    "Die wichtigsten 5% machen 95% des Unterschieds."
                  </Text>
                  <Text style={styles.cardDescription}>
                    Information gibt es genug. Was fehlt, ist Klarheit über das Wesentliche. Wir 
                    konzentrieren uns auf die wenigen Dinge, die den größten Unterschied machen. 
                    So bleibt Gesundheit einfach und umsetzbar.
                  </Text>
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          {/* Value Card */}
          <View style={styles.card}>
            <BlurView intensity={15} tint="light" style={styles.cardBlur}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0.95)',
                  'rgba(255, 255, 255, 0.85)',
                  'rgba(248, 250, 255, 0.90)'
                ]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.floatingElement1, { backgroundColor: 'rgba(255, 193, 7, 0.08)' }]} />
                <View style={[styles.floatingElement2, { backgroundColor: 'rgba(76, 175, 80, 0.06)' }]} />
                
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>✨</Text>
                  <Text style={styles.cardTitle}>Was du hier bekommst</Text>
                  <Text style={styles.cardText}>
                    "Ehrliche Empfehlungen. Faire Deals."
                  </Text>
                  <Text style={styles.cardDescription}>
                    Wir empfehlen nur, was wir selbst nutzen würden. Dazu verhandeln wir bessere 
                    Konditionen für unsere Community. Transparenz ist uns wichtiger als schnelle 
                    Verkäufe. Dein Vertrauen ist unser wichtigstes Gut.
                  </Text>
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8FAFF',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  cardBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  floatingElement1: {
    position: 'absolute',
    top: -20,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    zIndex: 1,
  },
  floatingElement2: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 1,
  },
  cardContent: {
    padding: 24,
    zIndex: 10,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text.dark,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  cardDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 20,
  },
}); 