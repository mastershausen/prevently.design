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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ExpertCard from './ExpertCard';
import BigWinsCard from './BigWinsCard';

const { width } = Dimensions.get('window');

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

interface BigWinsScreenProps {
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  categoryColor: string;
  progress: number;
  onBack: () => void;
}

const BigWinsScreen: React.FC<BigWinsScreenProps> = ({
  categoryId,
  categoryTitle,
  categoryIcon,
  categoryColor,
  progress,
  onBack
}) => {
  const [actionStatuses, setActionStatuses] = useState<Record<string, string>>({});

  // Big Wins Daten pro Kategorie
  const getBigWins = (categoryId: string): BigWinAction[] => {
    const winsData = {
      nutrition: [
        {
          id: '1',
          title: 'Täglich 2-3 Portionen Gemüse zum Mittagessen',
          description: 'Einfache Regel: Füge zu jeder Hauptmahlzeit mindestens eine Portion Gemüse hinzu.',
          infoDetails: {
            whatIs: 'Bewusste Integration von Gemüse in die Hauptmahlzeiten, besonders mittags.',
            whyUseful: 'Liefert wichtige Vitamine, Mineralien und Ballaststoffe. Reduziert Risiko für Herz-Kreislauf-Erkrankungen um bis zu 20%.',
            howToImplement: 'Starte mit gefrorenem Gemüse (einfach), füge Salat zu Sandwiches hinzu, bereite Gemüse-Snacks vor.',
            affiliateLink: 'https://example.com/gemuese-supplements'
          }
        },
        {
          id: '2',
          title: 'Omega-3 täglich (Fisch/Nüsse/Supplement)',
          description: 'Mindestens 2x pro Woche fetter Fisch oder täglich eine Handvoll Walnüsse.',
          infoDetails: {
            whatIs: 'Versorgung mit essentiellen Omega-3-Fettsäuren über Nahrung oder Nahrungsergänzung.',
            whyUseful: 'Unterstützt Gehirnfunktion, reduziert Entzündungen, schützt das Herz.',
            howToImplement: 'Lachs, Makrele, Sardinen 2x/Woche oder täglich 6-8 Walnüsse oder hochwertiges Omega-3-Öl.',
          }
        },
        {
          id: '3',
          title: 'Intermittierendes Fasten (16:8)',
          description: '16 Stunden fasten, 8 Stunden Essfenster - z.B. von 12-20 Uhr essen.',
          infoDetails: {
            whatIs: 'Zeitlich begrenztes Essen in einem 8-Stunden-Fenster pro Tag.',
            whyUseful: 'Verbessert Insulinsensitivität, kann beim Abnehmen helfen, fördert Zellreparatur (Autophagie).',
            howToImplement: 'Beginne mit 12:12, steigere langsam. Trinke viel Wasser, ungesüßten Tee oder Kaffee während der Fastenzeit.',
          }
        },
        {
          id: '4',
          title: 'Zuckerkonsum halbieren',
          description: 'Bewusst weniger Zucker: keine Softdrinks, weniger Süßigkeiten, versteckten Zucker meiden.',
          infoDetails: {
            whatIs: 'Reduzierung von zugesetztem Zucker in der täglichen Ernährung.',
            whyUseful: 'Reduziert Diabetes-Risiko, verbessert Energielevel, gut für Zähne und Gewichtsmanagement.',
            howToImplement: 'Ersetze Softdrinks durch Wasser mit Zitrone, lese Zutatenlisten, nutze natürliche Süßstoffe wie Stevia.',
          }
        },
        {
          id: '5',
          title: 'Täglich 2-3 Liter Wasser trinken',
          description: 'Ausreichend Flüssigkeit für optimale Körperfunktionen.',
          infoDetails: {
            whatIs: 'Bewusste Hydration mit mindestens 2-3 Litern Wasser täglich.',
            whyUseful: 'Unterstützt alle Körperfunktionen, verbessert Hautbild, hilft bei Konzentration und Energie.',
            howToImplement: 'Große Wasserflasche bereithalten, Apps zur Erinnerung nutzen, mit Zitrone oder Gurke würzen.',
          }
        }
      ],
      fitness: [
        {
          id: '1',
          title: 'Täglich 8.000-10.000 Schritte',
          description: 'Mehr Bewegung im Alltag durch bewusstes Gehen.',
          infoDetails: {
            whatIs: 'Tägliche Bewegung durch Gehen als Basis für körperliche Fitness.',
            whyUseful: 'Stärkt Herz-Kreislauf-System, verbessert Stimmung, reduziert Diabetes-Risiko.',
            howToImplement: 'Treppe statt Aufzug, zu Fuß einkaufen, Spaziergänge in der Mittagspause, Smartphone-Tracker nutzen.',
          }
        },
        {
          id: '2',
          title: '2-3x pro Woche Krafttraining',
          description: 'Gezieltes Muskeltraining für Kraft und Körperhaltung.',
          infoDetails: {
            whatIs: 'Regelmäßiges Training mit Gewichten oder Körpergewicht für Muskelaufbau.',
            whyUseful: 'Erhält Muskelmasse, stärkt Knochen, verbessert Stoffwechsel, verhindert Rückenschmerzen.',
            howToImplement: 'Fitnessstudio, Heimtraining mit Kurzhanteln, Bodyweight-Übungen wie Liegestütze und Kniebeugen.',
          }
        },
        {
          id: '3',
          title: 'Stretching/Mobility täglich 10 Minuten',
          description: 'Tägliche Beweglichkeitsübungen für bessere Körperhaltung.',
          infoDetails: {
            whatIs: 'Kurze tägliche Dehnungs- und Beweglichkeitsroutine.',
            whyUseful: 'Verhindert Verspannungen, verbessert Haltung, reduziert Verletzungsrisiko.',
            howToImplement: 'YouTube-Videos folgen, Yoga-Apps nutzen, einfache Büro-Stretches in den Tag einbauen.',
          }
        }
      ],
      sleep: [
        {
          id: '1',
          title: 'Feste Schlafenszeit (± 30 Minuten)',
          description: 'Jeden Tag zur gleichen Zeit ins Bett und aufstehen.',
          infoDetails: {
            whatIs: 'Regelmäßiger Schlaf-Wach-Rhythmus mit festen Zeiten.',
            whyUseful: 'Verbessert Schlafqualität, stärkt innere Uhr, mehr Energie am Tag.',
            howToImplement: 'Wecker für Schlafenszeit stellen, auch am Wochenende ähnliche Zeiten, langsam umstellen (15 Min pro Tag).',
          }
        },
        {
          id: '2',
          title: 'Keine Bildschirme 1 Stunde vor dem Schlafen',
          description: 'Digital Detox für besseren Schlaf.',
          infoDetails: {
            whatIs: 'Verzicht auf Handy, TV und Computer mindestens 1 Stunde vor der Schlafenszeit.',
            whyUseful: 'Blaues Licht stört Melatonin-Produktion. Besseres Einschlafen und tieferer Schlaf.',
            howToImplement: 'Handy in anderen Raum laden, Blaulichtfilter nutzen, Buch lesen oder meditieren stattdessen.',
          }
        },
        {
          id: '3',
          title: 'Kühles, dunkles Schlafzimmer (16-19°C)',
          description: 'Optimale Schlafumgebung schaffen.',
          infoDetails: {
            whatIs: 'Kontrolle über Temperatur und Lichtquellen im Schlafzimmer.',
            whyUseful: 'Körpertemperatur sinkt natürlich beim Einschlafen. Dunkelheit fördert Melatonin-Produktion.',
            howToImplement: 'Verdunkelungsvorhänge, Heizung runterdrehen, Augenmaske und Ohrstöpsel als Alternative.',
          }
        }
      ]
    };
    
    return winsData[categoryId as keyof typeof winsData] || [];
  };

  // Experten Daten
  const getExperts = (categoryId: string): Expert[] => {
    const expertsData = {
      nutrition: [
        { 
          id: '1', 
          name: 'Dr. Sarah Weber', 
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face', 
          description: 'Ernährungsärztin', 
          detailedDescription: 'Dr. Sarah Weber ist spezialisiert auf präventive Ernährungsmedizin und hilft Menschen dabei, durch bewusste Ernährung chronische Krankheiten zu verhindern. Sie kombiniert neueste wissenschaftliche Erkenntnisse mit praktischen Alltagstipps.',
          specialties: ['Anti-Aging-Ernährung', 'Diabetes-Prävention', 'Darmgesundheit'],
          experience: '12 Jahre klinische Erfahrung',
          contactLink: '@dr.sarah.nutrition' 
        },
        { 
          id: '2', 
          name: 'Max Müller', 
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 
          description: 'Food Coach', 
          detailedDescription: 'Max hat über 1000 Menschen dabei geholfen, ihre Essgewohnheiten nachhaltig zu verändern. Sein Fokus liegt auf einfachen, alltagstauglichen Lösungen ohne Verzicht oder komplizierte Diäten.',
          specialties: ['Meal Prep', 'Gewichtsmanagement', 'Intuitive Ernährung'],
          experience: '8 Jahre Coaching-Erfahrung',
          contactLink: '@max.healthy.coach' 
        },
      ],
      fitness: [
        { 
          id: '1', 
          name: 'Lisa Kraft', 
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', 
          description: 'Personal Trainerin', 
          detailedDescription: 'Lisa entwickelt individuelle Trainingspläne für Menschen, die wenig Zeit haben aber maximale Ergebnisse wollen. Ihre Spezialität sind effektive 20-30 Minuten Workouts für Zuhause.',
          specialties: ['HIIT-Training', 'Kraftaufbau', 'Rücken-Fitness'],
          experience: '10 Jahre Personal Training',
          contactLink: '@lisa.kraft.fitness' 
        },
        { 
          id: '2', 
          name: 'Tom Athletik', 
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 
          description: 'Bewegungstherapeut', 
          detailedDescription: 'Tom hilft Menschen mit Verspannungen, Rückenschmerzen und Bewegungseinschränkungen. Er zeigt einfache Übungen, die sich perfekt in den Büroalltag integrieren lassen.',
          specialties: ['Haltungskorrektur', 'Schmerztherapie', 'Mobility Training'],
          experience: '15 Jahre therapeutische Erfahrung',
          contactLink: '@tom.movement' 
        },
      ],
      sleep: [
        { 
          id: '1', 
          name: 'Dr. Michael Schlaf', 
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face', 
          description: 'Schlafmediziner', 
          detailedDescription: 'Dr. Schlaf ist einer der führenden Experten für Schlafoptimierung in Deutschland. Er hat bereits hunderten von Patienten zu besserem Schlaf verholfen - ohne Medikamente, nur durch natürliche Methoden.',
          specialties: ['Schlafoptimierung', 'Insomnie-Behandlung', 'Schlafhygiene'],
          experience: '18 Jahre Schlafmedizin',
          contactLink: '@dr.schlaf.experte' 
        },
      ]
    };
    
    return expertsData[categoryId as keyof typeof expertsData] || [];
  };

  // Problembewusstsein-Text pro Kategorie
  const getProblemAwarenessText = (categoryId: string): { title: string; text: string } => {
    const awarenessData = {
      nutrition: {
        title: "Warum Ernährung deine wichtigste Gesundheitsentscheidung ist",
        text: "Über 80% aller chronischen Krankheiten entstehen durch falsche Ernährung. Diabetes, Herz-Kreislauf-Erkrankungen, sogar viele Krebsarten sind vermeidbar. Die gute Nachricht: Mit den richtigen Gewohnheiten kannst du dein Krankheitsrisiko drastisch senken und gleichzeitig mehr Energie, bessere Laune und ein stärkeres Immunsystem bekommen."
      },
      fitness: {
        title: "Bewegungsmangel ist das neue Rauchen",
        text: "Sitzen ist tödlicher als Rauchen - das sagen Wissenschaftler heute. Mangelnde Bewegung verursacht mehr Todesfälle als Zigaretten. Schon 30 Minuten Bewegung täglich reduzieren dein Risiko für Herzinfarkt um 40%, für Diabetes um 50% und für Depression um 30%. Dein Körper ist dafür gemacht, sich zu bewegen."
      },
      sleep: {
        title: "Schlechter Schlaf macht krank, alt und dick",
        text: "Weniger als 7 Stunden Schlaf pro Nacht verdoppeln dein Risiko für Diabetes, Herzerkrankungen und Depression. Schlechter Schlaf lässt dich schneller altern, schwächt dein Immunsystem und macht dick. Dabei ist gesunder Schlaf eine der einfachsten und wirksamsten Gesundheitsmaßnahmen überhaupt."
      }
    };
    
    return awarenessData[categoryId as keyof typeof awarenessData] || {
      title: "Warum dieser Bereich so wichtig ist",
      text: "Präventive Gesundheitsmaßnahmen in diesem Bereich können dein Leben dramatisch verbessern und Krankheiten verhindern."
    };
  };

  const bigWins = getBigWins(categoryId);
  const experts = getExperts(categoryId);
  const awarenessContent = getProblemAwarenessText(categoryId);

  const handleStatusChange = (actionId: string, status: string) => {
    setActionStatuses(prev => ({
      ...prev,
      [actionId]: status
    }));
    // Auto-Save: Hier würde die sofortige Speicherung passieren
    console.log(`Auto-saving: ${actionId} = ${status}`);
  };

  const handleExpertContact = (expert: Expert) => {
    console.log(`Kontakt zu ${expert.name}: ${expert.contactLink}`);
    // Hier würde die Kontaktaufnahme passieren
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={Colors.text.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Big Wins</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Hero Section */}
        <LinearGradient
          colors={[categoryColor, `${categoryColor}CC`, `${categoryColor}99`]}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroIcon}>{categoryIcon}</Text>
            <Text style={styles.heroTitle}>{categoryTitle}</Text>
            <Text style={styles.heroSubtitle}>
              Die wichtigsten Maßnahmen für deinen Erfolg. Wähle aus, was für dich passt.
            </Text>
          </View>
        </LinearGradient>

        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>{awarenessContent.title}</Text>
          <Text style={styles.introText}>
            {awarenessContent.text}
          </Text>
        </View>

        {/* Big Wins List */}
        <View style={styles.winsSection}>
          {bigWins.map((action, index) => (
            <BigWinsCard
              key={action.id}
              action={action}
              onStatusChange={handleStatusChange}
              initialStatus={actionStatuses[action.id]}
            />
          ))}
        </View>

        {/* Experts Section */}
        <View style={styles.expertsSection}>
          <Text style={styles.expertsTitle}>Kostenloses Expertengespräch buchen</Text>
          <Text style={styles.expertsSubtitle}>
            Mit Code PREVENTLY sicherst du dir ein kostenloses Erstgespräch
          </Text>
          
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} onContact={() => handleExpertContact(expert)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BigWinsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text.dark,
    marginLeft: 16,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {
    padding: 24,
    margin: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Intro Section
  introSection: {
    padding: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 22,
  },

  // Wins Section
  winsSection: {
    padding: 20,
  },

  // Experts Section
  expertsSection: {
    padding: 20,
  },
  expertsTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  expertsSubtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 20,
  },
}); 