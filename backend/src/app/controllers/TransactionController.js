const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TransactionController {
  checkDescription = async (req, res) => {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    try {
      const transaction = await prisma.transaction.findFirst({
        where: { description: description },
      });

      if (transaction) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking description:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  createTransaction = async (req, res) => {
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

}

module.exports = new TransactionController();
