
/**
 * Service for interacting with the Bitnob API for crypto-to-fiat payments.
 * This service abstracts the underlying API calls for initiating and checking payment statuses.
 * API keys and endpoints are handled by the backend (Cloud Functions).
 */
import { BitnobPaymentRequest, BitnobPaymentResponse, BitnobPaymentData } from 'types/api';

// These will typically be fetched from a secure config or environment variables.
// For this implementation, they are constants representing the production environment.
const BITNOB_API_BASE_URL = 'https://api.bitnob.co/api/v1';
const LANDLORD_BITNOB_WALLET_ID = 'wallet-uuid-for-landlord-ugx-payouts'; // Our Example wallet ID

// This function would be part of a larger API client module.
// It's simplified here for clarity.
async function postToBackend<T>(endpoint: string, body: any): Promise<T> {
    // this will use fetch to POST to our backend,
    // which then securely communicates with the Bitnob API.
    // Example: const response = await fetch(`/api/payments${endpoint}`, { ... });
    // The backend would handle authentication and error mapping.
    console.log(`[BACKEND CALL] POST /api/payments${endpoint}`, body);
    
    // The following is a representative response from the backend for demonstration.
    if (endpoint === '/initiate') {
        const { request } = body;
        const exchangeRate = request.cryptoCurrency === 'BTC' ? 120_000_000 : 3_800;
        const cryptoAmount = request.amount / exchangeRate;

        return {
            success: true,
            data: {
                paymentId: `pay_${Date.now()}`,
                reference: request.reference,
                amount: request.amount,
                cryptoAmount: parseFloat(cryptoAmount.toFixed(8)),
                currency: request.currency,
                cryptoCurrency: request.cryptoCurrency,
                exchangeRate: exchangeRate,
                status: 'pending',
                walletAddress: LANDLORD_BITNOB_WALLET_ID,
                qrCode: `bitcoin:${LANDLORD_BITNOB_WALLET_ID}?amount=${cryptoAmount}`,
                paymentUrl: `${BITNOB_API_BASE_URL}/payments/hosted/${Date.now()}`,
                expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
                createdAt: new Date().toISOString(),
            },
        } as T;
    }
    throw new Error('Unknown endpoint');
}

async function getFromBackend<T>(endpoint: string): Promise<T> {
    console.log(`[BACKEND CALL] GET /api/payments${endpoint}`);
    if (endpoint.startsWith('/status/')) {
         return {
            success: true,
            data: {
                paymentId: endpoint.replace('/status/', ''),
                status: 'completed',
            },
        } as T;
    }
    throw new Error('Unknown endpoint');
}


export const bitnobService = {
  /**
   * Initiates a crypto payment request through the Bitnob API.
   * The backend Cloud Function will securely call Bitnob with the appropriate credentials.
   *
   * @param request - The payment request details.
   * @returns A promise that resolves with the Bitnob payment data.
   */
  initiatePayment: async (request: BitnobPaymentRequest): Promise<BitnobPaymentResponse> => {
    console.log('Bitnob Service: Initiating payment...', request);
    try {
      const response = await postToBackend<BitnobPaymentResponse>('/initiate', { request });
      console.log('Bitnob Service: Payment initiated successfully.', response.data);
      return response;
    } catch (error: any) {
      console.error('Bitnob Service: Error initiating payment:', error);
      return {
        success: false,
        error: {
          code: 'BITNOB_API_ERROR',
          message: error.message || 'An unknown error occurred with the Bitnob API.',
        },
      };
    }
  },

  /**
   * Retrieves the status of a specific payment from the Bitnob API.
   * This will be called by a backend service, which is triggered by a webhook.
   *
   * @param paymentId - The unique ID of the payment to check.
   * @returns A promise that resolves with the latest payment data.
   */
  getPaymentStatus: async (paymentId: string): Promise<BitnobPaymentResponse> => {
    console.log(`Bitnob Service: Getting status for paymentId: ${paymentId}`);
    try {
      const response = await getFromBackend<BitnobPaymentResponse>(`/status/${paymentId}`);
      console.log(`Bitnob Service: Payment ${paymentId} status is now ${response.data?.status}.`);
      return response;
    } catch (error: any) {
      console.error(`Bitnob Service: Error getting payment status for ${paymentId}:`, error);
      return {
        success: false,
        error: {
          code: 'BITNOB_API_ERROR',
          message: `Failed to get status for payment ${paymentId}.`,
        },
      };
    }
  },
};
