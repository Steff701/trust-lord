**Project Overview Document**

**Project Name:** Trust Lord

**Tagline:** Real Rent. Real Trust. Real Transparency.

**Purpose:**
To build a blockchain-backed property rental system tailored for the East African rental ecosystem. The platform provides tenants and landlords with an immutable and transparent record of lease agreements and rental payments while keeping the experience local and familiar. Rent payments can be made via mobile money or crypto (converted automatically into UGX via Bitnob). The blockchain component is used solely for transparency, not speculation — users don’t need wallets or crypto knowledge to use the app.

---

**Core Objectives:**
1. Replace paper and verbal lease agreements with immutable digital records.
2. Provide verifiable, tamper-proof proof-of-payment documents.
3. Allow rent payment through familiar local channels (MTN, Airtel) or crypto (via Bitnob API).
4. Ensure transparency and trust without exposing users to blockchain complexity.
5. Guarantee that once a lease or receipt is recorded, it cannot be altered.

---

**Target Users:**
- **Landlords** who manage units and need a better way to store and prove lease/payment records.
- **Tenants** who want assurance that their lease is legitimate and payments are verifiable.
- **Tech-savvy renters** who prefer paying rent in crypto but require the landlord to receive UGX directly.

---

**How It Works (Flow Summary):**
1. **Landlord** creates a lease on the mobile app.
2. **Tenant** signs it digitally.
3. Lease metadata (e.g., tenant name, property, duration, monthly amount) is stored on-chain, along with a document hash; the full lease PDF is pinned to IPFS.
4. When a **payment** is made:
   - Via **Mobile Money**: Tenant pays; landlord confirms receipt and creates a proof entry.
   - Via **Crypto**: Tenant pays in BTC/USDT via Bitnob; landlord receives UGX; proof is auto-generated.
5. A tamper-proof **receipt** is issued and stored (hash on-chain, document on IPFS).
6. Tenant and landlord can view, but not modify, any previous leases or receipts.

---

**Tech Stack:**

**Frontend:**
- TypeScript

**Backend:**
- Firebase (Authentication, Firestore for non-sensitive data, Realtime updates)
- Go microservices for smart contract interactions or IPFS orchestration

**Blockchain Layer:**
- Solidity smart contracts on EVM-compatible chain (e.g. Polygon testnet)
- Contracts:
  - `LeaseRegistry.sol` → Stores lease metadata + IPFS hash
  - `ReceiptRegistry.sol` → Stores payment receipts

**Storage:**
- IPFS (Pinata or Web3.storage) for lease and receipt documents

**Payments:**
- MTN/Airtel APIs for mobile money tracking
- Bitnob API for crypto payments and automatic UGX payout to landlord

---

**Key Components:**

**1. Smart Contracts**
- Immutable, append-only registries for:
  - Lease metadata
  - Payment receipt logs
  - Ownership access control per landlord

**2. IPFS Document Management**
- All sensitive documents (leases, receipts) are rendered as PDFs, stored on IPFS.
- A content hash is saved in the smart contract to verify document authenticity.

**3. Firebase Backend**
- Used for quick and secure auth (email/password, phone)
- Handles syncing of app UI, notifications, tenant/landlord management
- Manages access tokens for IPFS + Bitnob

**4. App UI**
- Two main roles: Tenant and Landlord
- Screens for:
  - Lease management
  - Payment input (crypto or mobile money)
  - Receipt viewing
  - Profile management

---

**Security Notes:**
- Smart contracts will be kept minimal and heavily tested.
- All documents are rendered off-chain to ensure UI consistency.
- Firebase handles user auth securely.
- No private keys or wallets are ever exposed to users.

---

**Why Bitnob Integration Matters:**
- It bridges crypto-to-UGX payments seamlessly.
- Allows crypto-native tenants to engage with traditional landlords.
- Automatically settles payments without user dealing with exchanges.

---

**Limitations / Not in Scope:**
- No rent escrow or dispute resolution (yet)
- Not a property listing platform
- No direct enforcement of lease terms

---

**Next Steps:**
- Finalise smart contracts for lease and receipt recording
- Complete Bitnob API integration and test conversion pipeline
- Design and connect React Native UI to Firebase backend
- Conduct user testing with at least 1 simulated landlord/tenant pair

---

**Summary:**
LandLords on Chain is not a crypto app pretending to be real estate. It's a real estate tool — with transparency and verification powered by blockchain. Our users stay local, get UGX, and don’t need to understand crypto. The trust layer is decentralised; the experience remains familiar.

