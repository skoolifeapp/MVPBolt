import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Crown, Check, ArrowLeft, Star, Calendar, FileText, ChartBar as BarChart3, Shield, Zap, Users, ArrowRight } from 'lucide-react-native';
import { useFonts } from 'expo-font';
import {
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import {
  Inter_400Regular,
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { useRouter } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function SubscriptionScreen() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Manrope-Bold': Manrope_700Bold,
    'Inter-Regular': Inter_400Regular,
  });

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const features = [
    {
      icon: <Calendar size={20} color="#FFD840" strokeWidth={2} />,
      title: 'Planning avancé',
      description: 'Synchronisation Google Calendar et rappels intelligents'
    },
    {
      icon: <FileText size={20} color="#FFD840" strokeWidth={2} />,
      title: 'Stockage illimité',
      description: 'Sauvegardez tous vos documents sans limite'
    },
    {
      icon: <BarChart3 size={20} color="#FFD840" strokeWidth={2} />,
      title: 'Analyses détaillées',
      description: 'Statistiques avancées sur vos performances'
    },
    {
      icon: <Shield size={20} color="#FFD840" strokeWidth={2} />,
      title: 'Sauvegarde cloud',
      description: 'Vos données protégées et synchronisées'
    },
    {
      icon: <Zap size={20} color="#FFD840" strokeWidth={2} />,
      title: 'Fonctionnalités premium',
      description: 'Accès à toutes les nouveautés en avant-première'
    },
    {
      icon: <Users size={20} color="#FFD840" strokeWidth={2} />,
      title: 'Support prioritaire',
      description: 'Assistance dédiée et réponse rapide'
    }
  ];

  const handleSubscribe = () => {
    setIsLoading(true);
    
    // Simulation du processus de paiement
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Bienvenue dans Skoolife+ ! 🎉',
        `Votre compte a été créé et vous êtes maintenant abonné à Skoolife+ ${selectedPlan === 'monthly' ? 'mensuel' : 'annuel'} !`,
        [
          {
            text: 'Découvrir l\'application',
            onPress: () => router.replace('/(tabs)/home'),
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.crownContainer}>
            <Crown size={48} color="#FFD840" strokeWidth={2} />
          </View>
          <Text style={styles.heroTitle}>Skoolife+</Text>
          <Text style={styles.heroSubtitle}>Rejoignez la communauté Skoolife</Text>
        </View>

        {/* Pricing Plans */}
        <View style={styles.pricingSection}>
          <Text style={styles.pricingTitle}>Choisissez votre formule</Text>
          
          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.selectedPlan
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>Mensuel</Text>
                <Text style={styles.planPrice}>2,99 €<Text style={styles.planPeriod}>/mois</Text></Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedPlan === 'monthly' && styles.radioButtonSelected
              ]}>
                {selectedPlan === 'monthly' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Yearly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'yearly' && styles.selectedPlan
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>Le plus populaire</Text>
            </View>
            <View style={styles.planHeader}>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>Annuel</Text>
                <Text style={styles.planPrice}>29,99 €<Text style={styles.planPeriod}>/an</Text></Text>
                <Text style={styles.monthlyEquivalent}>Soit 2,50 €/mois • Économisez 17%</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedPlan === 'yearly' && styles.radioButtonSelected
              ]}>
                {selectedPlan === 'yearly' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Ce qui est inclus</Text>
          
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                {feature.icon}
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <Check size={20} color="#10B981" strokeWidth={2} />
            </View>
          ))}
        </View>

        {/* Subscribe Button */}
        <View style={styles.subscribeSection}>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handleSubscribe}
            disabled={isLoading}
          >
            <Text style={styles.subscribeButtonText}>
              {isLoading ? 'Création en cours...' : `Commencer l'essai gratuit`}
            </Text>
            {!isLoading && <ArrowRight size={20} color="#2E2E2E" strokeWidth={2} />}
          </TouchableOpacity>

          <Text style={styles.subscribeNote}>
            Votre compte sera créé automatiquement • Essai gratuit de 30 jours
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            En créant un compte, vous acceptez nos{' '}
            <Text style={styles.linkText}>Conditions d'utilisation</Text>
            {' '}et notre{' '}
            <Text style={styles.linkText}>Politique de confidentialité</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  crownContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#FFF7ED',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#2E2E2E',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  pricingSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  pricingTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2E2E2E',
    textAlign: 'center',
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  selectedPlan: {
    borderColor: '#FFD840',
    backgroundColor: '#FFFBEB',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#FFD840',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    color: '#2E2E2E',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
    color: '#2E2E2E',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2E2E2E',
  },
  planPeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  monthlyEquivalent: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FFD840',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD840',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2E2E2E',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  featureIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF7ED',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#2E2E2E',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  subscribeSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD840',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  subscribeButtonDisabled: {
    opacity: 0.7,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#2E2E2E',
  },
  subscribeNote: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#FFD840',
    fontWeight: '600',
  },
});