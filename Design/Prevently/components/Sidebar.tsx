import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './ui/IconSymbol';
import Colors from '../constants/Colors';

const { width, height } = Dimensions.get('window');

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: 1,
    title: 'Home',
    icon: 'house.fill' as const,
    route: '/',
  },
  {
    id: 2,
    title: 'Profil',
    icon: 'person.fill' as const,
    route: '/profile',
  },
  {
    id: 3,
    title: 'Gesundheits-Score',
    icon: 'chart.bar.fill' as const,
    route: '/score',
  },
  {
    id: 4,
    title: 'Favoriten',
    icon: 'heart.fill' as const,
    route: '/favorites',
  },
  {
    id: 5,
    title: 'Einstellungen',
    icon: 'gearshape.fill' as const,
    route: '/settings',
  },
  {
    id: 6,
    title: 'Premium',
    icon: 'star.fill' as const,
    route: '/premium',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const handleMenuPress = (route: string) => {
    console.log(`Navigate to: ${route}`);
    // Hier später Router-Navigation implementieren
    onClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <StatusBar barStyle="light-content" />
      
      {/* Backdrop */}
      <TouchableOpacity 
        style={styles.backdrop} 
        onPress={onClose}
        activeOpacity={1}
      />
      
      {/* Sidebar */}
      <View style={styles.sidebarContainer}>
        <BlurView intensity={20} tint="dark" style={styles.sidebarBlur}>
          <LinearGradient
            colors={Colors.gradients.sidebar}
            style={styles.sidebarGradient}
          >
            <SafeAreaView style={styles.sidebarContent}>
              {/* Header */}
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Prevently</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <IconSymbol name="xmark" size={24} color="white" />
                </TouchableOpacity>
              </View>
              
              {/* Menu Items */}
              <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => handleMenuPress(item.route)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuItemContent}>
                      <IconSymbol name={item.icon} size={22} color="white" />
                      <Text style={styles.menuItemText}>{item.title}</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={16} color="rgba(255, 255, 255, 0.6)" />
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Footer */}
              <View style={styles.sidebarFooter}>
                <Text style={styles.footerText}>Version 1.0.0</Text>
                <Text style={styles.footerSubtext}>Deine Gesundheit im Fokus</Text>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.8,
    maxWidth: 320,
  },
  sidebarBlur: {
    flex: 1,
  },
  sidebarGradient: {
    flex: 1,
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  sidebarFooter: {
    paddingBottom: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
});

export default Sidebar; 