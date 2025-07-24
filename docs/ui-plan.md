# Trust Lord - App Development Document

## Objective
Design a clean, minimal, intuitive mobile app using **React Native Expo** focused on:
- Tenants managing rent and lease records.
- Landlords managing their properties and leases.
- Seamless QR-based onboarding and document access.

## Stack
- **Framework**: React Native (with Expo)
- **Router**: Expo Router
- **State**: React Native Firebase (Firestore, Auth, Storage)
- **UI Kit**: Tamagui (for performance & cross-platform)
- **Icons**: Lucide React (From Tamagui)
- **Language**: TypeScript

## Key Principles
- **No bloat.**
- **Simple UI.**
- **Tech-minimalist approach.**
- **Built for users with low tech exposure.**

---

## Core Roles
### Tenant:
- View lease
- View payment proofs
- Pay rent (mobile money or Bitnob/crypto)
- Contact landlord

### Landlord:
- Add property
- Generate lease QR code
- View lease records
- Register manual payments
- Upload payment proof (auto or manual)

---

## Core Flows & UI Components

### 1. Onboarding (Both Roles)
- [ ] Splash screen
- [ ] Choose role: `Tenant` or `Landlord`
- [ ] Firebase Auth (Phone number verification)

### 2. Tenant Flow
- [ ] **Scan Lease QR Code**
    - Uses camera to scan landlord’s QR
    - Auto-populate lease info
- [ ] **Home Screen**
    - Lease summary (address, rent, start/end date)
    - Last payment status (timestamped)
- [ ] **Payments Screen**
    - Pay rent via Mobile Money or Bitnob
    - Show receipts (IPFS-viewable)
- [ ] **Support/Contact**
    - Simple chat view or contact details

### 3. House owner Flow
- [ ] **Dashboard Screen**
    - Overview: Properties count, Active tenants
- [ ] **Add Property Flow**
    - Property name
    - Address
    - Rent amount
    - Lease duration
    - Upload docs (optional)
    - [Generate QR]
- [ ] **QR Page**
    - Download or show QR code for tenant
- [ ] **Tenants List Screen**
    - Per-property list of tenants
    - Tap to view lease, upload payment
- [ ] **Register Payment**
    - Add payment date
    - Upload proof (PDF/image)
    - Automatically pinned to IPFS

---

## Component Inventory
- QRCode Scanner (Tenant)
- QRCode Generator (Landlord)
- PropertyCard
- LeaseSummaryCard
- PaymentProofViewer
- FirebaseUploader (with IPFS pin integration)
- AuthGuard

---

## Next Steps (for UI Build Only)
1. Setup Expo + Tamagui boilerplate
2. Implement Auth flow (mock data for now)
3. Layout static screens:
    - Onboarding
    - Home
    - Add Property
    - QR Generator
    - Payments
4. Integrate navigation with Expo Router
5. Componentise major UI elements
6. Add mock lease data + static proof files

---

## Considerations
- Minimal taps to complete key actions
- QR Codes eliminate typing
- Show meaningful info at a glance
- No complex settings or profiles
- Tamagui ensures responsive, styled layouts with minimal config

---

