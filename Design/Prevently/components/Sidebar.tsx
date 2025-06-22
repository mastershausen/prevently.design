import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  onMenuItemPress: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, onClose, onMenuItemPress }) => {
  const handleMenuItemPress = (item: string) => {
    onMenuItemPress(item);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.sidebarOverlay}>
        <BlurView intensity={20} tint="dark" style={styles.sidebarBlur}>
          <LinearGradient
            colors={[
              'rgba(248, 250, 255, 0.98)',
              'rgba(255, 255, 255, 0.95)',
              'rgba(248, 250, 255, 0.92)',
              'rgba(255, 255, 255, 0.90)'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sidebar}
          >
            {/* Floating Background Elements */}
            <View style={styles.floatingElement1} />
            <View style={styles.floatingElement2} />
            <View style={styles.floatingElement3} />
            
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Prevently</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <IconSymbol name="xmark" size={24} color={Colors.text.dark} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => handleMenuItemPress('Deals')}
              >
                <View style={styles.menuItemIcon}>
                  <IconSymbol name="tag" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.menuItemText}>Deals</Text>
                <IconSymbol name="chevron.right" size={16} color={Colors.text.secondary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => handleMenuItemPress('Einstellungen')}
              >
                <View style={styles.menuItemIcon}>
                  <IconSymbol name="gear" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.menuItemText}>Einstellungen</Text>
                <IconSymbol name="chevron.right" size={16} color={Colors.text.secondary} />
              </TouchableOpacity>
            </ScrollView>
            
            {/* Footer with App Version */}
            <View style={styles.sidebarFooter}>
              <Text style={styles.footerText}>Version 1.0.0</Text>
              <Text style={styles.footerSubtext}>Deine Gesundheit im Fokus</Text>
            </View>
          </LinearGradient>
        </BlurView>
        
        <TouchableOpacity 
          style={styles.sidebarBackground} 
          activeOpacity={1} 
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sidebarBackground: {
    flex: 1,
  },
  sidebarBlur: {
    width: 300,
  },
  sidebar: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Floating Background Elements
  floatingElement1: {
    position: 'absolute',
    top: 100,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    zIndex: 1,
  },
  floatingElement2: {
    position: 'absolute',
    top: 250,
    right: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 122, 255, 0.06)',
    zIndex: 1,
  },
  floatingElement3: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 122, 255, 0.04)',
    zIndex: 1,
  },
  
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 122, 255, 0.15)',
    zIndex: 10,
  },
  sidebarTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 122, 255, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  sidebarContent: {
    flex: 1,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.12)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.dark,
    flex: 1,
  },
  sidebarFooter: {
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 122, 255, 0.15)',
    alignItems: 'center',
    zIndex: 10,
  },
  footerText: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: Colors.text.secondary,
    fontStyle: 'italic',
    opacity: 0.8,
  },
}); 