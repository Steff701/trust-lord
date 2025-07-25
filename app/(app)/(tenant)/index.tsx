import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  RefreshControl,
  Alert,
  Linking,
  StyleSheet,
  View as RNView,
} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Button,
  Card,
  H1,
  H3,
  H4,
  Paragraph,
  Separator,
  Progress,
  View,
  Spinner,
} from 'tamagui';
import {
  Home,
  Calendar,
  CreditCard,
  Phone,
  FileText,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin, Badge,
} from '@tamagui/lucide-icons';

interface LeaseData {
  propertyName: string;
  address: string;
  monthlyRent: number;
  currency: string;
  leaseStartDate: Date;
  leaseEndDate: Date;
  landlordName: string;
  landlordPhone: string;
}

interface PaymentStatus {
  lastPaymentDate: Date | null;
  lastPaymentAmount: number;
  nextDueDate: Date;
  paymentStatus: 'paid' | 'due' | 'overdue';
  daysUntilDue: number;
}

interface TenantData {
  lease: LeaseData;
  paymentStatus: PaymentStatus;
}

const formatCurrency = (amount: number, currency: string = 'UGX'): string => {
  return `${currency} ${amount.toLocaleString()}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays > 0) return `Due in ${diffDays} days`;
  if (diffDays === -1) return '1 day overdue';
  return `${Math.abs(diffDays)} days overdue`;
};

const mockTenantData: TenantData = {
  lease: {
    propertyName: "Sunrise Apartments - Unit 4B",
    address: "Kololo, Kampala",
    monthlyRent: 800000,
    currency: "UGX",
    leaseStartDate: new Date('2024-01-01'),
    leaseEndDate: new Date('2024-12-31'),
    landlordName: "James Mukasa",
    landlordPhone: "+256700123456"
  },
  paymentStatus: {
    lastPaymentDate: new Date('2024-06-01'),
    lastPaymentAmount: 800000,
    nextDueDate: new Date('2024-07-25'),
    paymentStatus: 'due',
    daysUntilDue: 1
  }
};

const StatusBadge: React.FC<{ status: PaymentStatus['paymentStatus'] }> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'paid':
        return { icon: CheckCircle, text: 'Paid' };
      case 'due':
        return { icon: Clock, text: 'Due Soon' };
      case 'overdue':
        return { icon: AlertTriangle, text: 'Overdue' };
      default:
        return { icon: Clock, text: 'Unknown' };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <Badge style={[styles.badge,
      status === 'paid' ? styles.badgePaid :
        status === 'due' ? styles.badgeDue :
          styles.badgeOverdue
    ]}>
      <XStack alignItems="center" gap={8}>
        <IconComponent size={14} color={
          status === 'paid' ? '#22C55E' :
            status === 'due' ? '#F6AD55' : '#EF4444'
        } />
        <Text style={[styles.badgeText,
          status === 'paid' ? styles.badgeTextPaid :
            status === 'due' ? styles.badgeTextDue :
              styles.badgeTextOverdue
        ]}>
          {config.text}
        </Text>
      </XStack>
    </Badge>
  );
};

const LeaseSummaryCard: React.FC<{ lease: LeaseData }> = ({ lease }) => (
  <Card style={styles.card}>
    <YStack gap={12}>
      <XStack alignItems="center" gap={12}>
        <Home size={24} color="#3B82F6" />
        <H3 style={styles.leaseTitle}>{lease.propertyName}</H3>
      </XStack>

      <XStack alignItems="center" gap={8}>
        <MapPin size={16} color="#6B7280" />
        <Text style={styles.leaseAddress}>{lease.address}</Text>
      </XStack>

      <Separator style={styles.separator} />

      <XStack justifyContent="space-between" alignItems="center">
        <YStack gap={4}>
          <Text style={styles.paymentText}>Monthly Rent</Text>
          <H4 style={styles.leaseRent}>
            {formatCurrency(lease.monthlyRent, lease.currency)}
          </H4>
        </YStack>

        <YStack gap={4} alignItems="flex-end">
          <Text style={styles.paymentText}>Lease Period</Text>
          <Text style={styles.leasePeriod}>
            {formatDate(lease.leaseStartDate)} - {formatDate(lease.leaseEndDate)}
          </Text>
        </YStack>
      </XStack>

      <Separator style={styles.separator} />

      <XStack alignItems="center" gap={8}>
        <Phone size={16} color="#6B7280" />
        <Text style={styles.landlordLabel}>Landlord: </Text>
        <Text style={styles.leaseLandlord}>{lease.landlordName}</Text>
      </XStack>
    </YStack>
  </Card>
);

const PaymentStatusCard: React.FC<{ paymentStatus: PaymentStatus }> = ({ paymentStatus }) => {
  const progressValue = paymentStatus.paymentStatus === 'paid' ? 100 :
    paymentStatus.paymentStatus === 'overdue' ? 0 : 50;

  return (
    <Card style={styles.card}>
      <YStack gap={12}>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap={12}>
            <CreditCard size={24} color="#3B82F6" />
            <H3 style={styles.paymentTitle}>Payment Status</H3>
          </XStack>
          <StatusBadge status={paymentStatus.paymentStatus} />
        </XStack>

        <Progress value={progressValue} style={styles.progressBar}>
          <Progress.Indicator
            animation="bouncy"
            style={
              paymentStatus.paymentStatus === 'paid' ? styles.progressIndicatorPaid :
                paymentStatus.paymentStatus === 'overdue' ? styles.progressIndicatorOverdue :
                  styles.progressIndicatorDue
            }
          />
        </Progress>

        <XStack justifyContent="space-between">
          <YStack gap={4}>
            <Text style={styles.paymentText}>Last Payment</Text>
            <Text style={styles.paymentValue}>
              {paymentStatus.lastPaymentDate ? formatDate(paymentStatus.lastPaymentDate) : 'No payments yet'}
            </Text>
            {paymentStatus.lastPaymentDate && (
              <Text style={styles.paymentText}>
                {formatCurrency(paymentStatus.lastPaymentAmount)}
              </Text>
            )}
          </YStack>

          <YStack gap={4} alignItems="flex-end">
            <Text style={styles.paymentText}>Next Due</Text>
            <Text style={styles.paymentValue}>
              {formatDate(paymentStatus.nextDueDate)}
            </Text>
            <Text style={
              paymentStatus.paymentStatus === 'overdue' ?
                styles.paymentOverdueText :
                styles.paymentDueText
            }>
              {getRelativeDate(paymentStatus.nextDueDate)}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </Card>
  );
};

const QuickActionsSection: React.FC<{ paymentStatus: PaymentStatus; onAction: (action: string) => void }> = ({ paymentStatus, onAction }) => {
  const getPayButtonStyle = () => {
    if (paymentStatus.paymentStatus === 'overdue') return styles.actionButtonOverdue;
    if (paymentStatus.paymentStatus === 'due') return styles.actionButtonDue;
    return styles.actionButton;
  };

  return (
    <Card style={styles.card}>
      <YStack gap={16}>
        <H3 style={styles.paymentTitle}>Quick Actions</H3>

        <Button
          style={[styles.actionButton, getPayButtonStyle()]}
          onPress={() => onAction('pay-rent')}
          icon={<CreditCard size={20} color="#FFFFFF" />}
        >
          <Text style={styles.actionButtonText}>
            Pay Rent - {formatCurrency(800000)}
          </Text>
        </Button>

        <XStack gap={12}>
          <Button
            style={styles.secondaryButton}
            onPress={() => onAction('payment-history')}
            icon={<Calendar size={16} color="#3B82F6" />}
          >
            <Text style={styles.secondaryButtonText}>History</Text>
          </Button>

          <Button
            style={styles.secondaryButton}
            onPress={() => onAction('contact-landlord')}
            icon={<Phone size={16} color="#3B82F6" />}
          >
            <Text style={styles.secondaryButtonText}>Contact</Text>
          </Button>
        </XStack>

        <Button
          style={styles.leaseButton}
          onPress={() => onAction('view-lease')}
          icon={<FileText size={16} color="#6B7280" />}
        >
          <Text style={styles.leaseButtonText}>View Lease Document</Text>
        </Button>
      </YStack>
    </Card>
  );
};

const AlertBanner: React.FC<{ paymentStatus: PaymentStatus }> = ({ paymentStatus }) => {
  if (paymentStatus.paymentStatus === 'paid') return null;

  const isOverdue = paymentStatus.paymentStatus === 'overdue';
  const isDueSoon = paymentStatus.daysUntilDue <= 3 && paymentStatus.paymentStatus === 'due';

  if (!isOverdue && !isDueSoon) return null;

  return (
    <Card style={[styles.alertCard, isOverdue ? styles.alertCardOverdue : styles.alertCardDue]}>
      <XStack alignItems="center" gap={12}>
        <AlertTriangle size={20} color={isOverdue ? '#EF4444' : '#F6AD55'} />
        <YStack flex={1}>
          <Text style={[styles.alertText, isOverdue ? {} : styles.alertTextDue]}>
            {isOverdue ? 'Payment Overdue!' : 'Payment Due Soon'}
          </Text>
          <Text style={[styles.alertSubText, isOverdue ? {} : styles.alertSubTextDue]}>
            {isOverdue
              ? `Your rent payment is ${Math.abs(paymentStatus.daysUntilDue)} days overdue`
              : `Your rent payment is due ${getRelativeDate(paymentStatus.nextDueDate).toLowerCase()}`
            }
          </Text>
        </YStack>
      </XStack>
    </Card>
  );
};

// Main Component
const TenantHomeScreen: React.FC = () => {
  const [tenantData, setTenantData] = useState<TenantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTenantData(mockTenantData);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTenantData(mockTenantData);
    setRefreshing(false);
  };

  const handleAction = async (action: string) => {
    switch (action) {
      case 'pay-rent':
        Alert.alert(
          'Pay Rent',
          'Choose your payment method:',
          [
            { text: 'Mobile Money', onPress: () => console.log('Mobile Money selected') },
            { text: 'Crypto (Bitnob)', onPress: () => console.log('Crypto selected') },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        break;
      case 'contact-landlord':
        if (tenantData?.lease.landlordPhone) {
          const phoneUrl = `tel:${tenantData.lease.landlordPhone}`;
          const canOpen = await Linking.canOpenURL(phoneUrl);
          if (canOpen) {
            Linking.openURL(phoneUrl);
          }
        }
        break;
      case 'payment-history':
        console.log('Navigate to payment history');
        break;
      case 'view-lease':
        console.log('Navigate to lease document');
        break;
    }
  };

  if (loading) {
    return (
      <YStack style={styles.loadingContainer}>
        <Spinner size="large" color="#3B82F6" />
        <Text style={styles.paymentText}>
          Loading your lease information...
        </Text>
      </YStack>
    );
  }

  if (!tenantData) {
    return (
      <YStack style={styles.errorContainer}>
        <AlertTriangle size={48} color="#EF4444" />
        <H3 style={styles.errorText}>
          Unable to load lease data
        </H3>
        <Paragraph style={styles.errorSubText}>
          Please check your connection and try again
        </Paragraph>
        <Button
          style={styles.retryButton}
          onPress={() => window.location.reload()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Button>
      </YStack>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <YStack style={styles.scrollContent}>
        {/* Header */}
        <XStack style={styles.headerContainer}>
          <H1 style={styles.headerText}>My Lease</H1>
          <Button
            style={styles.bellButton}
            icon={<Bell size={20} color="#6B7280" />}
          />
        </XStack>

        <AlertBanner paymentStatus={tenantData.paymentStatus} />

        <LeaseSummaryCard lease={tenantData.lease} />

        <PaymentStatusCard paymentStatus={tenantData.paymentStatus} />

        <QuickActionsSection
          paymentStatus={tenantData.paymentStatus}
          onAction={handleAction}
        />

        <RNView style={styles.spacer} />
      </YStack>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
    minHeight: '100%',
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  headerText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 28,
  },
  bellButton: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 9999,
    padding: 8,
  },
  alertCard: {
    padding: 12,
    backgroundColor: '#FFF1F0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  alertCardDue: {
    backgroundColor: '#FFF4E5',
    borderColor: '#F6AD55',
  },
  alertCardOverdue: {
    backgroundColor: '#FFF1F0',
    borderColor: '#EF4444',
  },
  alertText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 16,
  },
  alertTextDue: {
    color: '#F6AD55',
  },
  alertSubText: {
    color: '#EF4444',
    fontSize: 14,
  },
  alertSubTextDue: {
    color: '#F6AD55',
  },
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  badgePaid: {
    backgroundColor: '#E7F6EC',
    borderColor: '#22C55E',
  },
  badgeDue: {
    backgroundColor: '#FFF4E5',
    borderColor: '#F6AD55',
  },
  badgeOverdue: {
    backgroundColor: '#FFF1F0',
    borderColor: '#EF4444',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badgeTextPaid: {
    color: '#22C55E',
  },
  badgeTextDue: {
    color: '#F6AD55',
  },
  badgeTextOverdue: {
    color: '#EF4444',
  },
  leaseTitle: {
    color: '#000000',
    fontSize: 20,
    flex: 1,
  },
  leaseAddress: {
    color: '#6B7280',
    fontSize: 14,
  },
  leaseRent: {
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: 18,
  },
  leasePeriod: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  leaseLandlord: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  landlordLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  paymentTitle: {
    color: '#000000',
    fontSize: 20,
  },
  progressBar: {
    backgroundColor: '#E5E7EB',
  },
  progressIndicatorPaid: {
    backgroundColor: '#22C55E',
  },
  progressIndicatorDue: {
    backgroundColor: '#F6AD55',
  },
  progressIndicatorOverdue: {
    backgroundColor: '#EF4444',
  },
  paymentText: {
    color: '#6B7280',
    fontSize: 14,
  },
  paymentValue: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentDueText: {
    color: '#F6AD55',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentOverdueText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
  },
  actionButtonOverdue: {
    backgroundColor: '#EF4444',
  },
  actionButtonDue: {
    backgroundColor: '#F6AD55',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 14,
  },
  leaseButton: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 8,
  },
  leaseButtonText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
  },
  errorSubText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  spacer: {
    height: 16,
  },
});

export default TenantHomeScreen;