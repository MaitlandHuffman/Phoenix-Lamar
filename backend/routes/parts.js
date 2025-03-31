const express = require('express');
const router = express.Router();
const db = require('../config/firebase');

router.get('/search', async (req, res) => {
  const query = req.query.query?.trim();
  const results = [];

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  try {
    // Match based on progressive part number substrings
    const partSnap = await db.collection('parts')
      .where('partNumberKeywords', 'array-contains', cleanQuery)
      .get();

    partSnap.forEach(doc => results.push(doc.data()));

    // Also do a keyword description match
    const descSnap = await db.collection('parts')
      .where('descriptionKeywords', 'array-contains', cleanQuery)
      .get();

    descSnap.forEach(doc => {
      const part = doc.data();
      const exists = results.some(r =>
        r.partNumber === part.partNumber && r.supplier?.name === part.supplier?.name
      );
      if (!exists) results.push(part);
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
