import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FilterTab from './FilterTab';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

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

interface DealsScreenProps {
  onBack: () => void;
}

const DealsScreen: React.FC<DealsScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const deals: Deal[] = [
    {
      id: '1',
      title: 'Premium Omega-3 Kapseln',
      subtitle: 'Hochdosiert & laborgeprüft',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
      category: 'supplements',
      categoryIcon: '💊',
      categoryColor: '#4CAF50',
      description: 'Premium Omega-3 aus nachhaltigem Fischfang mit optimaler EPA/DHA-Ratio',
      why: 'Reduziert Entzündungen und stärkt Herz & Gehirn',
      features: ['1000mg EPA/DHA', 'Laborgeprüft', '90 Kapseln', 'Nachhaltig'],
      expiresIn: '2 Tage',
      isPopular: true,
      affiliateLink: 'https://example.com/omega3',
      discountCode: 'PREVENTLY15',
      discountText: 'Exklusiv für Prevently: 15% Rabatt + kostenlose Beratung'
    },
    {
      id: '2',
      title: 'Fitness Tracker Pro',
      subtitle: 'Schlaf & Herzfrequenz Monitoring',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=200&h=200&fit=crop',
      category: 'tech',
      categoryIcon: '📱',
      categoryColor: '#FF9800',
      description: 'Smartwatch mit fortschrittlichem Gesundheits-Monitoring',
      why: 'Besserer Schlaf durch präzise HRV-Messung',
      features: ['Schlafanalyse', 'HRV-Messung', '7 Tage Akku', 'Wasserdicht'],
      expiresIn: '5 Tage',
      affiliateLink: 'https://example.com/fitness-tracker',
      discountText: 'Prevently-Vorteil: 60 Tage Rückgaberecht statt 30 Tage'
    },
    {
      id: '3',
      title: 'Blue Light Brille',
      subtitle: 'Besserer Schlaf durch Blaulichtfilter',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop',
      category: 'wellness',
      categoryIcon: '🧘‍♀️',
      categoryColor: '#9C27B0',
      description: 'Stilvolle Brille mit 99% Blaulichtfilter für besseren Schlaf',
      why: 'Schützt vor schädlichem Blaulicht & verbessert Schlafqualität',
      features: ['99% Blaulichtfilter', 'Entspiegelt', 'Leichtes Design', '30 Tage Rückgabe'],
      expiresIn: '1 Tag',
      affiliateLink: 'https://example.com/blue-light-glasses',
      discountCode: 'SLEEP20',
      discountText: 'Nur für Prevently: 20% Rabatt + gratis Schlafberatung'
    },
    {
      id: '4',
      title: 'Vitamin D3 + K2 Tropfen',
      subtitle: 'Hochdosiert für starke Knochen',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop',
      category: 'supplements',
      categoryIcon: '💊',
      categoryColor: '#4CAF50',
      description: 'Optimale Vitamin D3 + K2 Kombination in praktischer Tropfenform',
      why: 'Stärkt Immunsystem & Knochen - besonders im Winter',
      features: ['2000 IE D3', '75µg K2 MK7', '50ml Flasche', 'Vegan'],
      expiresIn: '3 Tage',
      affiliateLink: 'https://example.com/vitamin-d3-k2',
      discountText: 'Prevently-Bonus: Kostenloses Blutbild zur Kontrolle'
    },
    {
      id: '5',
      title: 'Elektrische Zahnbürste Pro',
      subtitle: 'Professionelle Zahnreinigung zuhause',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
      category: 'care',
      categoryIcon: '🧴',
      categoryColor: '#E91E63',
      description: 'Schallzahnbürste mit 5 Putzmodi und UV-Sterilisator',
      why: 'Entfernt 7x mehr Plaque als Handzahnbürste',
      features: ['40.000 Schwingungen/min', 'UV-Sterilisator', '4 Wochen Akku', '3 Bürstenköpfe'],
      expiresIn: '4 Tage',
      affiliateLink: 'https://example.com/electric-toothbrush',
      discountCode: 'DENTAL25',
      discountText: 'Prevently-Deal: 25% Rabatt + 6 Monate Garantie extra'
    },
    {
      id: '6',
      title: 'Luftreiniger HEPA Pro',
      subtitle: 'Saubere Luft für bessere Gesundheit',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
      category: 'home',
      categoryIcon: '🏠',
      categoryColor: '#795548',
      description: 'HEPA-Luftreiniger für Räume bis 50m² mit App-Steuerung',
      why: 'Filtert 99,97% aller Schadstoffe & Allergene aus der Luft',
      features: ['HEPA H13 Filter', 'App-Steuerung', 'Bis 50m²', 'Leise (25dB)'],
      expiresIn: '6 Tage',
      affiliateLink: 'https://example.com/air-purifier',
      discountText: 'Prevently-Service: Kostenlose Raumluft-Analyse inklusive'
    }
  ];

  const categories = [
    { id: 'all', name: 'Alle', icon: '🎯', color: '#666' },
    { id: 'supplements', name: 'Supplements', icon: '💊', color: '#4CAF50' },
    { id: 'fitness', name: 'Fitness', icon: '🏃‍♂️', color: '#2196F3' },
    { id: 'wellness', name: 'Wellness', icon: '🧘‍♀️', color: '#9C27B0' },
    { id: 'tech', name: 'Health Tech', icon: '📱', color: '#FF9800' },
    { id: 'care', name: 'Körperpflege', icon: '🧴', color: '#E91E63' },
    { id: 'home', name: 'Zuhause', icon: '🏠', color: '#795548' },
  ];

  const filteredDeals = selectedCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === selectedCategory);

  const handleDealPress = (deal: Deal) => {
    console.log(`Deal ausgewählt: ${deal.title}`);
    // Hier würde normalerweise der Affiliate-Link geöffnet werden
  };

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
            <Text style={styles.headerTitle}>🎯 Premium Deals</Text>
            <Text style={styles.headerSubtitle}>Exklusive Angebote für deine Gesundheit</Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <FilterTab
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Deals List */}
        <ScrollView 
          style={styles.dealsScroll}
          contentContainerStyle={styles.dealsContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredDeals.map((deal) => (
            <ProductCard 
              key={deal.id} 
              deal={deal} 
              onPress={handleDealPress}
            />
          ))}
          
          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DealsScreen;

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

  // Deals
  dealsScroll: {
    flex: 1,
  },
  dealsContainer: {
    paddingHorizontal: 20,
  },
  bottomSpacer: {
    height: 20,
  },
}); 