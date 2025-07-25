import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Vibration,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Dimensions
} from 'react-native';
import {
  Camera,
  X,
  Flashlight,
  ArrowLeft,
  Home,
  Calendar,
  DollarSign,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  Edit3
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { localApi } from 'services/localApi';
import { bitnobService } from 'services/bitnob';

interface QRLeaseData {
  leaseId: string;
  landlordId: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  unitNumber?: string;
  monthlyRent: number;
  currency: string;
  securityDeposit: number;
  leaseStartDate: string;
  leaseDuration: number;
  landlordName: string;
  landlordPhone: string;
  timestamp: number;
  signature: string;
}

type ScanError =
  | 'PERMISSION_DENIED'
  | 'CAMERA_UNAVAILABLE'
  | 'INVALID_QR_CODE'
  | 'EXPIRED_QR_CODE'
  | 'NETWORK_ERROR'
  | 'LEASE_ALREADY_TAKEN';

interface ScanLeaseState {
  hasPermission: boolean | null;
  isScanning: boolean;
  isFlashOn: boolean;
  scannedData: string | null;
  parsedLeaseData: QRLeaseData | null;
  showPreview: boolean;
  isLoading: boolean;
  error: ScanError | null;
  termsAccepted: boolean;
  isSubmitting: boolean;
  showManualEntry: boolean;
  manualCode: string;
  showPaymentMethodSelection: boolean;
}

const { width, height } = Dimensions.get('window');

const mockQRData: QRLeaseData = {
  leaseId: "lease_001",
  landlordId: "landlord_123",
  propertyId: "prop_456",
  propertyName: "Sunrise Apartments",
  propertyAddress: "123 Kampala Road, Central Division, Kampala",
  unitNumber: "2A",
  monthlyRent: 800000,
  currency: "UGX",
  securityDeposit: 800000,
  leaseStartDate: "2025-08-01",
  leaseDuration: 12,
  landlordName: "John Mukasa",
  landlordPhone: "+256 700 123 456",
  timestamp: Date.now(),
  signature: "abc123def456"
};

const QRScanner: React.FC<{
  onScanSuccess: (data: string) => void;
  onScanError: (error: Error) => void;
  isActive: boolean;
  showGuides?: boolean;
  isFlashOn: boolean;
}> = ({ onScanSuccess, onScanError, isActive, showGuides = true, isFlashOn }) => {
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      const animate = () => {
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          })
        ]).start(() => animate());
      };
      animate();
    }
  }, [isActive, scanLineAnim]);

  // Mock QR detection for demo
  const handleMockScan = () => {
    if (isActive) {
      setTimeout(() => {
        onScanSuccess(JSON.stringify(mockQRData));
      }, 1000);
    }
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  return (
    <View style={styles.scannerContainer}>
      {/* Mock Camera View */}
      <TouchableOpacity
        style={styles.mockCamera}
        onPress={handleMockScan}
        activeOpacity={0.8}
      >
        <Text style={styles.mockCameraText}>📷</Text>
        <Text style={styles.mockCameraSubtext}>Tap to simulate QR scan</Text>
      </TouchableOpacity>

      {showGuides && (
        <View style={styles.scanningGuides}>
          {/* Corner guides */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Animated scanning line */}
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY: scanLineTranslateY }] }
            ]}
          />
        </View>
      )}
    </View>
  );
};

const LeasePreviewCard: React.FC<{
  leaseData: QRLeaseData;
  onAccept: () => void;
  onReject: () => void;
  isLoading?: boolean;
  termsAccepted: boolean;
  onTermsToggle: () => void;
}> = ({ leaseData, onAccept, onReject, isLoading, termsAccepted, onTermsToggle }) => {
  const formatCurrency = (amount: number) => {
    return `${leaseData.currency} ${amount.toLocaleString()}`;
  };

  const getLeaseEndDate = () => {
    const startDate = new Date(leaseData.leaseStartDate);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + leaseData.leaseDuration);
    return endDate.toLocaleDateString();
  };

  const getTotalMoveinCost = () => {
    return leaseData.monthlyRent + leaseData.securityDeposit;
  };

  return (
    <ScrollView style={styles.previewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.previewCard}>
        {/* Property Header */}
        <View style={styles.propertyHeader}>
          <Home size={24} color="#2E7D32" />
          <View style={styles.propertyHeaderText}>
            <Text style={styles.propertyName}>{leaseData.propertyName}</Text>
            {leaseData.unitNumber && (
              <Text style={styles.unitNumber}>Unit {leaseData.unitNumber}</Text>
            )}
          </View>
        </View>

        {/* Address */}
        <View style={styles.detailRow}>
          <MapPin size={20} color="#666" />
          <Text style={styles.detailText}>{leaseData.propertyAddress}</Text>
        </View>

        {/* Financial Details */}
        <View style={styles.financialSection}>
          <Text style={styles.sectionTitle}>Financial Details</Text>

          <View style={styles.financialRow}>
            <Text style={styles.financialLabel}>Monthly Rent:</Text>
            <Text style={styles.financialAmount}>{formatCurrency(leaseData.monthlyRent)}</Text>
          </View>

          <View style={styles.financialRow}>
            <Text style={styles.financialLabel}>Security Deposit:</Text>
            <Text style={styles.financialAmount}>{formatCurrency(leaseData.securityDeposit)}</Text>
          </View>

          <View style={[styles.financialRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Move-in Cost:</Text>
            <Text style={styles.totalAmount}>{formatCurrency(getTotalMoveinCost())}</Text>
          </View>
        </View>

        {/* Lease Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.sectionTitle}>Lease Terms</Text>

          <View style={styles.termRow}>
            <Calendar size={20} color="#666" />
            <View style={styles.termDetails}>
              <Text style={styles.termLabel}>Start Date:</Text>
              <Text style={styles.termValue}>
                {new Date(leaseData.leaseStartDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.termRow}>
            <Calendar size={20} color="#666" />
            <View style={styles.termDetails}>
              <Text style={styles.termLabel}>End Date:</Text>
              <Text style={styles.termValue}>{getLeaseEndDate()}</Text>
            </View>
          </View>

          <View style={styles.termRow}>
            <Calendar size={20} color="#666" />
            <View style={styles.termDetails}>
              <Text style={styles.termLabel}>Duration:</Text>
              <Text style={styles.termValue}>{leaseData.leaseDuration} months</Text>
            </View>
          </View>
        </View>

        {/* Landlord Information */}
        <View style={styles.landlordSection}>
          <Text style={styles.sectionTitle}>Landlord Information</Text>

          <View style={styles.landlordRow}>
            <Text style={styles.landlordName}>{leaseData.landlordName}</Text>
          </View>

          <TouchableOpacity style={styles.phoneRow}>
            <Phone size={20} color="#2E7D32" />
            <Text style={styles.phoneNumber}>{leaseData.landlordPhone}</Text>
          </TouchableOpacity>
        </View>

        {/* Terms Acceptance */}
        <TouchableOpacity
          style={styles.termsAcceptance}
          onPress={onTermsToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: termsAccepted }}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && <CheckCircle size={16} color="#fff" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the lease terms and conditions stated above
          </Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={onReject}
            disabled={isLoading}
          >
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.acceptButton,
              (!termsAccepted || isLoading) && styles.acceptButtonDisabled
            ]}
            onPress={onAccept}
            disabled={!termsAccepted || isLoading}
          >
            <Text style={styles.acceptButtonText}>
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const ManualEntryModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  code: string;
  onCodeChange: (code: string) => void;
}> = ({ visible, onClose, onSubmit, code, onCodeChange }) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Enter QR Code</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.modalContent}>
          <Text style={styles.modalDescription}>
            If you can't scan the QR code, enter the code manually below:
          </Text>

          <TextInput
            style={styles.codeInput}
            value={code}
            onChangeText={onCodeChange}
            placeholder="Enter QR code data"
            multiline
            numberOfLines={4}
            autoFocus
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              !code.trim() && styles.submitButtonDisabled
            ]}
            onPress={() => onSubmit(code)}
            disabled={!code.trim()}
          >
            <Text style={styles.submitButtonText}>Submit Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const PaymentMethodSelectionModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSelectMethod: (method: 'mobile_money' | 'crypto') => void;
}> = ({ visible, onClose, onSelectMethod }) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select Payment Method</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.modalContent}>
          <Text style={styles.modalDescription}>
            Choose how you'd like to make your first rent payment.
          </Text>

          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => onSelectMethod('mobile_money')}
          >
            <Text style={styles.paymentMethodButtonText}>Mobile Money (MTN, Airtel)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => onSelectMethod('crypto')}
          >
            <Text style={styles.paymentMethodButtonText}>Crypto (Bitnob)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ScanLeaseScreen: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState<ScanLeaseState>({
    hasPermission: null,
    isScanning: true,
    isFlashOn: false,
    scannedData: null,
    parsedLeaseData: null,
    showPreview: false,
    isLoading: false,
    error: null,
    termsAccepted: false,
    isSubmitting: false,
    showManualEntry: false,
    manualCode: '',
  });

  useEffect(() => {
    requestCameraPermission().then(r => {});
  }, []);

  const requestCameraPermission = async () => {
    // Mock permission grant for demo
    setTimeout(() => {
      setState(prev => ({ ...prev, hasPermission: true }));
    }, 500);
  };

  const parseQRData = (rawData: string): QRLeaseData => {
    try {
      const data = JSON.parse(rawData);

      // Validate required fields
      const requiredFields = [
        'leaseId', 'landlordId', 'propertyId', 'propertyName',
        'propertyAddress', 'monthlyRent', 'currency', 'securityDeposit',
        'leaseStartDate', 'leaseDuration', 'landlordName', 'landlordPhone'
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Check if QR is expired (24 hours)
      const hoursSinceGeneration = (Date.now() - data.timestamp) / (1000 * 60 * 60);
      if (hoursSinceGeneration > 24) {
        throw new Error('EXPIRED_QR_CODE');
      }

      return data;
    } catch (error) {
      throw new Error('INVALID_QR_CODE');
    }
  };

  const handleScanSuccess = (data: string) => {
    try {
      Vibration.vibrate(200);
      setState(prev => ({ ...prev, isLoading: true, scannedData: data }));

      setTimeout(() => {
        try {
          const parsedData = parseQRData(data);
          setState(prev => ({
            ...prev,
            parsedLeaseData: parsedData,
            showPreview: true,
            isScanning: false,
            isLoading: false,
            error: null
          }));
        } catch (error) {
          setState(prev => ({
            ...prev,
            error: error.message as ScanError,
            isLoading: false
          }));
        }
      }, 1000);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'INVALID_QR_CODE',
        isLoading: false
      }));
    }
  };

  const handleScanError = (error: Error) => {
    setState(prev => ({
      ...prev,
      error: 'CAMERA_UNAVAILABLE',
      isLoading: false
    }));
  };

  const handleLeaseAccept = async () => {
    setState(prev => ({ ...prev, showPaymentMethodSelection: true }));
  };

  const handlePaymentMethodSelection = async (method: 'mobile_money' | 'crypto') => {
    setState(prev => ({ ...prev, isSubmitting: true, showPaymentMethodSelection: false }));

    if (!state.parsedLeaseData) {
      Alert.alert('Error', 'Lease data not available.');
      setState(prev => ({ ...prev, isSubmitting: false }));
      return;
    }

    const leaseDataToSave = {
      lease: {
        ...state.parsedLeaseData,
        leaseStartDate: state.parsedLeaseData.leaseStartDate,
        leaseEndDate: new Date(new Date(state.parsedLeaseData.leaseStartDate).setMonth(new Date(state.parsedLeaseData.leaseStartDate).getMonth() + state.parsedLeaseData.leaseDuration)).toISOString().split('T')[0],
      },
      paymentStatus: {
        lastPaymentDate: null,
        lastPaymentAmount: 0,
        nextDueDate: new Date(state.parsedLeaseData.leaseStartDate).toISOString().split('T')[0],
        paymentStatus: 'due',
        daysUntilDue: 0,
      },
    };

    if (method === 'crypto') {
      try {
        const bitnobResponse = await bitnobService.initiatePayment({
          amount: state.parsedLeaseData.monthlyRent,
          currency: state.parsedLeaseData.currency as 'UGX',
          cryptoCurrency: 'BTC', // Assuming BTC for now, could be dynamic
          customerEmail: 'tenant@example.com', // Mock email
          customerPhone: state.parsedLeaseData.landlordPhone, // Using landlord phone as mock tenant phone
          reference: `lease_${state.parsedLeaseData.leaseId}_${Date.now()}`,
          description: `Rent payment for ${state.parsedLeaseData.propertyName}`,
        });

        if (bitnobResponse.success) {
          await localApi.saveTenantLease(leaseDataToSave);
          Alert.alert(
            'Lease Accepted & Payment Initiated',
            `Your lease agreement has been created successfully! Proceeding with crypto payment. Payment ID: ${bitnobResponse.data?.paymentId}`,
            [{ text: 'OK', onPress: () => {
              router.replace({
                pathname: '/(app)/(tenant)/payments',
                params: { paymentMethod: method, leaseId: state.parsedLeaseData?.leaseId, bitnobPaymentId: bitnobResponse.data?.paymentId }
              });
            } }]
          );
        } else {
          Alert.alert('Payment Initiation Failed', bitnobResponse.error?.message || 'An unknown error occurred.');
        }
      } catch (error) {
        console.error('Error initiating Bitnob payment:', error);
        Alert.alert('Payment Error', 'Failed to initiate crypto payment. Please try again.');
      }
    } else if (method === 'mobile_money') {
      // Simulate mobile money payment initiation
      await new Promise(resolve => setTimeout(resolve, 1500));
      await localApi.saveTenantLease(leaseDataToSave);
      Alert.alert(
        'Lease Accepted & Payment Initiated',
        `Your lease agreement has been created successfully! Proceeding with mobile money payment.`,
        [{ text: 'OK', onPress: () => {
          router.replace({
            pathname: '/(app)/(tenant)/payments',
            params: { paymentMethod: method, leaseId: state.parsedLeaseData?.leaseId }
          });
        } }]
      );
    }
    setState(prev => ({ ...prev, isSubmitting: false }));
  };

  const handleLeaseReject = () => {
    setState(prev => ({
      ...prev,
      showPreview: false,
      isScanning: true,
      parsedLeaseData: null,
      scannedData: null,
      termsAccepted: false,
      error: null
    }));
  };

  const toggleFlash = () => {
    setState(prev => ({ ...prev, isFlashOn: !prev.isFlashOn }));
  };

  const toggleTerms = () => {
    setState(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
  };

  const handleManualSubmit = (code: string) => {
    setState(prev => ({ ...prev, showManualEntry: false, manualCode: '' }));
    handleScanSuccess(code);
  };

  const getErrorMessage = (error: ScanError) => {
    switch (error) {
      case 'PERMISSION_DENIED':
        return 'Camera permission is required to scan QR codes';
      case 'CAMERA_UNAVAILABLE':
        return 'Camera is not available on this device';
      case 'INVALID_QR_CODE':
        return 'Invalid QR code. Please check and try again';
      case 'EXPIRED_QR_CODE':
        return 'This QR code has expired. Please get a new one from your landlord';
      case 'LEASE_ALREADY_TAKEN':
        return 'This lease offer is no longer available';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection and try again';
      default:
        return 'An unexpected error occurred';
    }
  };

  if (state.hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!state.hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <AlertCircle size={48} color="#f44336" />
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionText}>
          Trust Lord needs camera access to scan QR codes. Please enable camera permission in your device settings.
        </Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={requestCameraPermission}
        >
          <Text style={styles.settingsButtonText}>Retry Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          {state.showPreview ? (
            <ArrowLeft size={24} color="#e5e5e5" />
          ) : (
            <X size={24} color="#e5e5e5" />
          )}
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {state.showPreview ? 'Review Lease' : 'Scan Lease QR'}
        </Text>

        {!state.showPreview && (
          <TouchableOpacity onPress={toggleFlash}>
            <Flashlight size={24} color={state.isFlashOn ? '#00d4aa' : '#e5e5e5'} />
          </TouchableOpacity>
        )}

        {state.showPreview && <View style={{ width: 24 }} />}
      </View>

      {/* Content */}
      {state.showPreview && state.parsedLeaseData ? (
        <LeasePreviewCard
          leaseData={state.parsedLeaseData}
          onAccept={handleLeaseAccept}
          onReject={handleLeaseReject}
          isLoading={state.isSubmitting}
          termsAccepted={state.termsAccepted}
          onTermsToggle={toggleTerms}
        />
      ) : (
        <View style={styles.scannerWrapper}>
          {state.isLoading ? (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingText}>Processing QR code...</Text>
            </View>
          ) : (
            <>
              <QRScanner
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
                isActive={state.isScanning && !state.error}
                isFlashOn={state.isFlashOn}
              />

              <Text style={styles.instructionText}>
                Point camera at QR code from your landlord
              </Text>

              {state.error && (
                <View style={styles.errorContainer}>
                  <AlertCircle size={20} color="#f44336" />
                  <Text style={styles.errorText}>
                    {getErrorMessage(state.error)}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.manualEntryButton}
                onPress={() => setState(prev => ({
                  ...prev,
                  showManualEntry: true,
                  error: null
                }))}
              >
                <Edit3 size={20} color="#00d4aa" />
                <Text style={styles.manualEntryText}>Enter Code Manually</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      <ManualEntryModal
        visible={state.showManualEntry}
        onClose={() => setState(prev => ({ ...prev, showManualEntry: false }))}
        onSubmit={handleManualSubmit}
        code={state.manualCode}
        onCodeChange={(code) => setState(prev => ({ ...prev, manualCode: code }))}
      />

      <PaymentMethodSelectionModal
        visible={state.showPaymentMethodSelection}
        onClose={() => setState(prev => ({ ...prev, showPaymentMethodSelection: false }))}
        onSelectMethod={handlePaymentMethodSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0', // Light border
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000', // Dark text
  },
  scannerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scannerContainer: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  mockCamera: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF', // Light background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E0', // Light border
  },
  mockCameraText: {
    fontSize: 48,
    marginBottom: 10,
    color: '#000000', // Dark text
  },
  mockCameraSubtext: {
    fontSize: 14,
    color: '#6B7280', // Muted text
    textAlign: 'center',
  },
  scanningGuides: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#F6AD55', // Accent color
    borderWidth: 3,
  },
  topLeft: {
    top: 20,
    left: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 20,
    right: 20,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#F6AD55', // Accent color
    top: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#6B7280', // Muted text
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF', // Light background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E0', // Light border
    marginTop: 20,
  },
  manualEntryText: {
    fontSize: 16,
    color: '#3B82F6', // Info color
    marginLeft: 8,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background
  },
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280', // Muted text
    marginTop: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background
    padding: 40,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Dark text
    marginTop: 20,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280', // Muted text
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  settingsButton: {
    backgroundColor: '#F6AD55', // Accent color
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  settingsButtonText: {
    color: '#FFFFFF', // Light text
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F0', // Light error background
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
    borderColor: '#EF4444', // Error color
    borderWidth: 1,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444', // Error color
    marginLeft: 8,
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background
  },
  previewCard: {
    margin: 20,
    backgroundColor: '#FFFFFF', // Light background
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#CBD5E0', // Light border
    borderWidth: 1,
  },
  propertyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  propertyHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Dark text
  },
  unitNumber: {
    fontSize: 14,
    color: '#6B7280', // Muted text
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#000000', // Dark text
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000', // Dark text
    marginBottom: 12,
  },
  financialSection: {
    backgroundColor: '#F8F9FA', // Light background
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#E5E7EB', // Light border
    borderWidth: 1,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: '#6B7280', // Muted text
  },
  financialAmount: {
    fontSize: 14,
    color: '#000000', // Dark text
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // Light border
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000', // Dark text
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6', // Info color
  },
  termsSection: {
    marginBottom: 20,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  termDetails: {
    marginLeft: 12,
    flex: 1,
  },
  termLabel: {
    fontSize: 14,
    color: '#6B7280', // Muted text
  },
  termValue: {
    fontSize: 16,
    color: '#000000', // Dark text
    fontWeight: '500',
    marginTop: 2,
  },
  landlordSection: {
    marginBottom: 24,
  },
  landlordRow: {
    marginBottom: 8,
  },
  landlordName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000', // Dark text
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#3B82F6', // Info color
    marginLeft: 8,
    fontWeight: '500',
  },
  termsAcceptance: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#F8F9FA', // Light background
    borderRadius: 8,
    borderColor: '#E5E7EB', // Light border
    borderWidth: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#CBD5E0', // Light border
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#F6AD55', // Accent color
    borderColor: '#F6AD55', // Accent color
  },
  termsText: {
    fontSize: 14,
    color: '#000000', // Dark text
    flex: 1,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Light background
    borderWidth: 1,
    borderColor: '#CBD5E0', // Light border
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    color: '#6B7280', // Muted text
    fontWeight: '500',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#F6AD55', // Accent color
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#E5E7EB', // Light disabled background
  },
  acceptButtonText: {
    fontSize: 16,
    color: '#FFFFFF', // Light text
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0', // Light border
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000', // Dark text
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280', // Muted text
    lineHeight: 24,
    marginBottom: 24,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#CBD5E0', // Light border
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 24,
    minHeight: 120,
    color: '#000000', // Dark text
    backgroundColor: '#FFFFFF', // Light background
  },
  submitButton: {
    backgroundColor: '#F6AD55', // Accent color
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E7EB', // Light disabled background
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF', // Light text
    fontWeight: '600',
  },
  paymentMethodButton: {
    backgroundColor: '#F6AD55',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentMethodButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ScanLeaseScreen;