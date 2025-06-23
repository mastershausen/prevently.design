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

const { width } = Dimensions.get('window');

interface Deal {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  expiresIn: string;
  isPopular?: boolean;
  affiliateLink: string;
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
      originalPrice: 49.99,
      discountedPrice: 29.99,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
      category: 'nutrition',
      categoryIcon: '🥗',
      categoryColor: '#4CAF50',
      description: 'Premium Omega-3 aus nachhaltigem Fischfang mit optimaler EPA/DHA-Ratio',
      features: ['1000mg EPA/DHA', 'Laborgeprüft', '90 Kapseln', 'Nachhaltig'],
      rating: 4.8,
      reviews: 1247,
      expiresIn: '2 Tage',
      isPopular: true,
      affiliateLink: 'https://example.com/omega3'
    },
    {
      id: '2',
      title: 'Fitness Tracker Pro',
      subtitle: 'Schlaf & Herzfrequenz Monitoring',
      originalPrice: 199.99,
      discountedPrice: 149.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=200&h=200&fit=crop',
      category: 'fitness',
      categoryIcon: '🏃‍♂️',
      categoryColor: '#2196F3',
      description: 'Smartwatch mit fortschrittlichem Gesundheits-Monitoring',
      features: ['Schlafanalyse', 'HRV-Messung', '7 Tage Akku', 'Wasserdicht'],
      rating: 4.6,
      reviews: 892,
      expiresIn: '5 Tage',
      affiliateLink: 'https://example.com/fitness-tracker'
    },
    {
      id: '3',
      title: 'Blue Light Brille',
      subtitle: 'Besserer Schlaf durch Blaulichtfilter',
      originalPrice: 79.99,
      discountedPrice: 39.99,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop',
      category: 'sleep',
      categoryIcon: '😴',
      categoryColor: '#FF9800',
      description: 'Stilvolle Brille mit 99% Blaulichtfilter für besseren Schlaf',
      features: ['99% Blaulichtfilter', 'Entspiegelt', 'Leichtes Design', '30 Tage Rückgabe'],
      rating: 4.7,
      reviews: 634,
      expiresIn: '1 Tag',
      affiliateLink: 'https://example.com/blue-light-glasses'
    },
    {
      id: '4',
      title: 'Vitamin D3 + K2 Tropfen',
      subtitle: 'Hochdosiert für starke Knochen',
      originalPrice: 34.99,
      discountedPrice: 24.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop',
      category: 'nutrition',
      categoryIcon: '🥗',
      categoryColor: '#4CAF50',
      description: 'Optimale Vitamin D3 + K2 Kombination in praktischer Tropfenform',
      features: ['2000 IE D3', '75µg K2 MK7', '50ml Flasche', 'Vegan'],
      rating: 4.9,
      reviews: 1891,
      expiresIn: '3 Tage',
      affiliateLink: 'https://example.com/vitamin-d3-k2'
    },
    {
      id: '5',
      title: 'Meditation Kissen Set',
      subtitle: 'Ergonomisch für längere Sessions',
      originalPrice: 89.99,
      discountedPrice: 59.99,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      category: 'mental',
      categoryIcon: '🧠',
      categoryColor: '#9C27B0',
      description: 'Premium Meditationskissen für optimale Sitzhaltung',
      features: ['Ergonomisch', 'Bio-Baumwolle', 'Waschbar', 'Inkl. Matte'],
      rating: 4.5,
      reviews: 423,
      expiresIn: '4 Tage',
      affiliateLink: 'https://example.com/meditation-cushion'
    }
  ];

  const categories = [
    { id: 'all', name: 'Alle', icon: '🎯', color: '#666' },
    { id: 'nutrition', name: 'Ernährung', icon: '🥗', color: '#4CAF50' },
    { id: 'fitness', name: 'Fitness', icon: '🏃‍♂️', color: '#2196F3' },
    { id: 'sleep', name: 'Schlaf', icon: '😴', color: '#FF9800' },
    { id: 'mental', name: 'Mental', icon: '🧠', color: '#9C27B0' },
  ];

  const filteredDeals = selectedCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === selectedCategory);

  const handleDealPress = (deal: Deal) => {
    console.log(`Deal ausgewählt: ${deal.title}`);
    // Hier würde normalerweise der Affiliate-Link geöffnet werden
  };

  const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => (
    <TouchableOpacity 
      style={styles.dealCard}
      onPress={() => handleDealPress(deal)}
      activeOpacity={0.95}
    >
      {deal.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>🔥 Bestseller</Text>
        </View>
      )}
      
      <View style={styles.dealImageContainer}>
        <Image source={{ uri: deal.image }} style={styles.dealImage} />
        <View style={[styles.categoryBadge, { backgroundColor: deal.categoryColor }]}>
          <Text style={styles.categoryIcon}>{deal.categoryIcon}</Text>
        </View>
      </View>

      <View style={styles.dealContent}>
        <View style={styles.dealHeader}>
          <Text style={styles.dealTitle}>{deal.title}</Text>
          <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {deal.rating}</Text>
          <Text style={styles.reviews}>({deal.reviews} Bewertungen)</Text>
        </View>

        <Text style={styles.dealDescription}>{deal.description}</Text>

        <View style={styles.featuresContainer}>
          {deal.features.slice(0, 2).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>€{deal.originalPrice.toFixed(2)}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{deal.discount}%</Text>
            </View>
          </View>
          <Text style={styles.discountedPrice}>€{deal.discountedPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.dealFooter}>
          <Text style={styles.expiresText}>⏰ Noch {deal.expiresIn}</Text>
          <LinearGradient
            colors={[deal.categoryColor, `${deal.categoryColor}CC`]}
            style={styles.buyButton}
          >
            <Text style={styles.buyButtonText}>Jetzt sichern</Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            <DealCard key={deal.id} deal={deal} />
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
  dealCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  dealImageContainer: {
    height: 140,
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
  },
  dealContent: {
    padding: 16,
  },
  dealHeader: {
    marginBottom: 8,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.dark,
    marginBottom: 2,
  },
  dealSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.dark,
    marginRight: 8,
  },
  reviews: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  dealDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.text.secondary,
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiresText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  buyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  bottomSpacer: {
    height: 20,
  },
}); 