import { localApi } from './localApi';
import { BitnobPaymentRequest, BitnobPaymentResponse, BitnobPaymentData, BitnobPaymentStatus } from 'types/api';

// --- Simulation Constants ---
const BITNOB_SIM_STATE_KEY = 'bitnob_sim_state';
const EXCHANGE_RATE_BTC_UGX = 120_000_000; // 1 BTC = 120,000,000 UGX (example rate)
const EXCHANGE_RATE_USDT_UGX = 3_800; // 1 USDT = 3,800 UGX (example rate)

// Mock addresses
const MOCK_LANDLORD_BITNOB_ADDRESS = 'bitnob_landlord_ugx_wallet_address';
const MOCK_TENANT_CRYPTO_ADDRESS = 'mock_tenant_btc_wallet_address'; // This is where the tenant's crypto would come from

interface BitnobSimState {
  firstAttemptFailed: boolean;
  currentPayment?: BitnobPaymentData;
}

// --- Helper to get/set simulation state ---
async function getSimState(): Promise<BitnobSimState> {
  const state = await localApi.getItem(BITNOB_SIM_STATE_KEY);
  return state || { firstAttemptFailed: false };
}

async function setSimState(state: BitnobSimState): Promise<void> {
  await localApi.setItem(BITNOB_SIM_STATE_KEY, state);
}

// --- Bitnob Service Simulation ---
export const bitnobService = {
  /**
   * Simulates initiating a payment through Bitnob.
   * On the first call, it will intentionally fail. Subsequent calls will succeed.
   */
  initiatePayment: async (request: BitnobPaymentRequest): Promise<BitnobPaymentResponse> => {
    console.log('Bitnob Simulation: Initiating payment...', request);
    const simState = await getSimState();

    // Intentional failure on first attempt
    if (!simState.firstAttemptFailed) {
      console.log('Bitnob Simulation: First attempt, intentionally failing.');
      await setSimState({ ...simState, firstAttemptFailed: true });
      return {
        success: false,
        error: {
          code: 'SIM_FAILURE',
          message: 'Simulated network error or temporary Bitnob issue. Please try again.',
        },
      };
    }

    // Subsequent attempts succeed
    const exchangeRate = request.cryptoCurrency === 'BTC' ? EXCHANGE_RATE_BTC_UGX : EXCHANGE_RATE_USDT_UGX;
    const cryptoAmount = request.amount / exchangeRate; // Convert UGX to crypto

    const paymentData: BitnobPaymentData = {
      paymentId: `sim_pay_${Date.now()}`,
      reference: request.reference,
      amount: request.amount,
      cryptoAmount: parseFloat(cryptoAmount.toFixed(8)), // Keep reasonable precision
      currency: request.currency,
      cryptoCurrency: request.cryptoCurrency,
      exchangeRate: exchangeRate,
      status: 'pending', // Payment is initiated, but not yet completed
      walletAddress: MOCK_LANDLORD_BITNOB_ADDRESS, // Landlord's receiving address
      qrCode: 'mock_qr_code_data', // Placeholder
      paymentUrl: `https://bitnob.com/simulated-payment/${Date.now()}`, // Placeholder
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Expires in 30 mins
      createdAt: new Date().toISOString(),
    };

    await setSimState({ ...simState, currentPayment: paymentData });

    console.log('Bitnob Simulation: Payment initiated successfully.', paymentData);
    return {
      success: true,
      data: paymentData,
    };
  },

  /**
   * Simulates getting the status of a Bitnob payment.
   * For simplicity, payments initiated successfully will eventually become 'completed'.
   */
  getPaymentStatus: async (paymentId: string): Promise<BitnobPaymentResponse> => {
    console.log(`Bitnob Simulation: Getting status for paymentId: ${paymentId}`);
    const simState = await getSimState();

    if (simState.currentPayment && simState.currentPayment.paymentId === paymentId) {
      // Simulate completion after a short delay or on subsequent check
      if (simState.currentPayment.status === 'pending') {
        // In a real scenario, this would be a webhook or a more complex state machine
        // For simulation, we'll just mark it completed if checked again.
        simState.currentPayment.status = 'completed';
        await setSimState(simState);
        console.log(`Bitnob Simulation: Payment ${paymentId} is now completed.`);
      }
      return {
        success: true,
        data: simState.currentPayment,
      };
    }

    return {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Payment not found in simulation.',
      },
    };
  },

  // Helper to reset simulation state (for testing/development)
  _resetSimState: async (): Promise<void> => {
    console.log('Bitnob Simulation: Resetting state.');
    await localApi.removeItem(BITNOB_SIM_STATE_KEY);
  },
};