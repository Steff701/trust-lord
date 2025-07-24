# Trust Lord

> Smart, transparent lease management for East Africa

## Overview

Trust Lord is a blockchain-backed mobile app that brings transparency and accountability to property rental across East Africa. Tenants and landlords can easily manage leases, track rent payments, and generate immutable proof of payment—whether rent is paid via mobile money, cash, or crypto.

## Features
- Mobile app for tenants and landlords (React Native Expo)
- Lease setup with automatic proof generation
- Mobile money and Bitnob-powered crypto-to-fiat rent payments
- IPFS-stored, immutable proof of payment
- QR-based lease binding for ease of onboarding
- Firebase backend with Firestore + Functions
- Solidity smart contracts for lease and payment hash anchoring

## Tech Stack
| Layer        | Tech                         |
|--------------|------------------------------|
| Frontend     | React Native (Expo) + Tamagui |
| Icons        | Lucide React Native          |
| Backend      | Firebase (Auth, Firestore, Functions, Storage) |
| Blockchain   | Solidity (Ethereum/EVM chain), IPFS for docs |
| Payments     | Bitnob API (crypto > UGX)    |

## How it Works
1. **Landlord Setup:**
- Adds property and lease terms via the app.
- Generates a QR code that represents the lease offer.

2. **Tenant Onboarding:**
- Scans QR code to auto-fill lease.
- Confirms lease terms, signs digitally.

3. **Rent Payments:**
- Pay via mobile money or crypto (Bitnob integration).
- Proof of payment generated and stored immutably.

4. **Lease Records:**
- Smart contract logs key hashes of lease and payment records.
- Full details stored on Firebase + IPFS for long-term access.

## Setup
```bash
npm install
npx expo start
```

## Project Structure
```
trustlord/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── onboarding.tsx
│   │   └── login.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   └── (tenant)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── payments.tsx
│   │       ├── scan-lease.tsx
│   │       └── support.tsx
│   │   └── (landlord)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── add-property.tsx
│   │       ├── generate-qr.tsx
│   │       └── tenants.tsx
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   └── index.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── QRScanner.tsx
│   ├── QRGenerator.tsx
│   ├── PropertyCard.tsx
│   ├── LeaseSummaryCard.tsx
│   └── AuthGuard.tsx
├── lib/
│   ├── firebase.ts
│   ├── auth.ts
│   └── types.ts
├── constants/
│   └── colours.ts
├── app.json
├── package.json
└── tamagui.config.ts

## License
MIT

---
Built with ♥ for Kampala, by a team that believes every tenant deserves dignity and every landlord deserves clarity.

