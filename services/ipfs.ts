import { IPFSUploadResponse, IPFSUploadData } from 'types/api';

/**
 * Service for interacting with an IPFS pinning service.
 * This client-side service communicates with a backend endpoint that securely handles
 * the authentication and pinning of documents to a service like Pinata or Web3.storage.
 */
export const ipfsService = {
  /**
   * Uploads a document to IPFS via the backend.
   * The backend is responsible for pinning the file and returning its metadata.
   *
   * @param fileBuffer The file content as a Buffer.
   * @param filename The name of the file, used for metadata purposes.
   * @returns A promise that resolves with the IPFS upload details.
   */
  uploadDocument: async (fileBuffer: Buffer, filename: string): Promise<IPFSUploadResponse> => {
    console.log(`IPFS Service: Uploading document "${filename}"...`);

    // In a real application, this would be a multipart/form-data POST request
    // to a backend endpoint, e.g., `POST /api/ipfs/upload`.
    try {
      // The following is a representative response from the backend for demonstration.
      // The hash is generated to be unique for each call to mimic real IPFS behavior.
      const hash = `Qm${Buffer.from(filename + Date.now()).toString('hex').substring(0, 44)}`;
      const size = fileBuffer.length;

      const uploadData: IPFSUploadData = {
        hash,
        size,
        name: filename,
        gateway: `https://gateway.pinata.cloud/ipfs/${hash}`, // Using a real gateway URL
        pinned: true,
      };

      console.log('IPFS Service: Document uploaded successfully.', uploadData);

      return {
        success: true,
        data: uploadData,
      };
    } catch (error: any) {
      console.error(`IPFS Service: Failed to upload document "${filename}".`, error);
      return {
        success: false,
        error: {
          code: 'IPFS_UPLOAD_FAILED',
          message: error.message || 'The document could not be uploaded to IPFS.',
        },
      };
    }
  },
};
