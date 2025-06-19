/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/**
 * Prevently - Gesundheits-App Farbpalette
 * Bunte, lebendige Farben für verschiedene Gesundheitsbereiche
 */

export const Colors = {
  // Hauptfarben
  primary: '#2ECC71',        
  primaryDark: '#27AE60',    
  primaryLight: '#58D68D',   
  
  // Sekundäre Farben
  secondary: '#48C9B0',      
  secondaryLight: '#73C6B6', 
  accent: '#A8E6CF',         
  
  // Moderne, harmonische Gesundheits-Farben - weniger Farbfamilien, mehr Kohärenz
  health: {
    nutrition: {
      bubble: '#81C784',     // Sanftes Grün (statt Cyan)
      text: '#2E7D32'        // Dunkles Grün für Text
    },
    fitness: {
      bubble: '#80DEEA',     // Sanftes Cyan
      text: '#00838F'        // Dunkles Cyan für Text
    },
    sleep: {
      bubble: '#A5D6A7',     // Helles Grün (beruhigend)
      text: '#388E3C'        // Mittleres Grün für Text
    },
    skin: {
      bubble: '#4FC3F7',     // Mittleres Cyan
      text: '#0288D1'        // Mittleres Blau für Text
    },
    dental: {
      bubble: '#90CAF9',     // Sanftes Blau
      text: '#1976D2'        // Kräftiges Blau für Text
    },
    digestion: {
      bubble: '#66BB6A',     // Mittleres Grün
      text: '#2E7D32'        // Dunkles Grün für Text
    },
    hormones: {
      bubble: '#29B6F6',     // Lebendiges Cyan
      text: '#0277BD'        // Dunkles Blau für Text
    },
    immune: {
      bubble: '#4CAF50',     // Kräftiges Grün
      text: '#1B5E20'        // Sehr dunkles Grün für Text
    },
    mental: {
      bubble: '#26C6DA',     // Türkis (zwischen Blau und Grün)
      text: '#00838F'        // Dunkles Cyan für Text
    },
    prevention: {
      bubble: '#42A5F5',     // Mittleres Blau
      text: '#1565C0'        // Dunkles Blau für Text
    }
  },
  
  // UI-Farben
  background: '#FFFFFF',
  surface: '#F8F9FA',
  
  // Text-Farben
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    light: '#B2BEC3',
    dark: '#2D3436'
  },
  
  // Glas-Effekt Farben
  glassWhite: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.25)',
  
  // Hintergrund-Gradienten
  gradients: {
    main: ['#FFFFFF', '#F8F9FA'] as const,
    sidebar: ['rgba(46, 204, 113, 0.4)', 'rgba(39, 174, 96, 0.4)', 'rgba(129, 199, 132, 0.3)'] as const,
    bubble: ['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)'] as const,
  },
  
  // Status-Farben
  success: '#00B894',
  warning: '#FDCB6E',
  error: '#E17055',
  info: '#74B9FF',
  
  // Neutrale Farben
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#F8F9FA',
    medium: '#6C757D',
    dark: '#343A40',
  },
  
  // Transparenzen
  overlay: 'rgba(0, 0, 0, 0.5)',
  glassWhiteLight: 'rgba(255, 255, 255, 0.1)',
  
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
