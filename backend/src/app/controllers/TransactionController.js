const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
  try {
    const { amount, description } = req.body;


    if (!amount || !description) {
      return res.status(400).json({ message: 'Amount and description are required.' });
    }

  
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        description,
      },
    });

  
    return res.status(201).json({
      message: 'Transaction created successfully.',
      transaction,
    });
  } catch (error) {
    console.error('Error creating transaction:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
};

module.exports = { createTransaction };
