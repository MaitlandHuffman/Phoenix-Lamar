const db = require('../config/firebase');

const parts = [
  {
    partNumber: 'CAP-10UF-16V',
    description: 'Capacitor, Ceramic, 10uF, 16V',
    descriptionKeywords: ['capacitor', 'ceramic', '10uf', '16v'],
    priceUSD: 0.12,
    quantityAvailable: 1000,
    supplier: {
      name: 'Digi-Key',
      website: 'https://www.digikey.com/product-detail/en/12345',
      logoURL: 'https://www.digikey.com/logo.png'
    },
    lastUpdated: new Date(),
    lastUpdatedBy: 'manualSeedScript'
  },
  {
    partNumber: 'RES-1KOHM',
    description: 'Resistor, 1k Ohm, 1/4W, ±1%',
    descriptionKeywords: ['resistor', '1kohm', '1k', '1%', 'quarterwatt'],
    priceUSD: 0.05,
    quantityAvailable: 5000,
    supplier: {
      name: 'Mouser',
      website: 'https://www.mouser.com/ProductDetail/67890',
      logoURL: 'https://www.mouser.com/logo.png'
    },
    lastUpdated: new Date(),
    lastUpdatedBy: 'manualSeedScript'
  },
  {
    partNumber: 'REG-LM317',
    description: 'Voltage Regulator, Adjustable, LM317',
    descriptionKeywords: ['regulator', 'lm317', 'voltage', 'adjustable'],
    priceUSD: 0.45,
    quantityAvailable: 800,
    supplier: {
      name: 'Arrow',
      website: 'https://www.arrow.com/products/lm317',
      logoURL: 'https://www.arrow.com/logo.png'
    },
    lastUpdated: new Date(),
    lastUpdatedBy: 'manualSeedScript'
  }
];

async function seedParts() {
  const partsRef = db.collection('parts');

  for (const part of parts) {
    // Normalize partNumberSearch field
    part.partNumberSearch = part.partNumber.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    try {
      await partsRef.add(part);
      console.log(`✅ Inserted: ${part.partNumber}`);
    } catch (err) {
      console.error(`❌ Failed to insert ${part.partNumber}:`, err);
    }
  }

  console.log('✅ All test parts seeded.');
}

seedParts();
