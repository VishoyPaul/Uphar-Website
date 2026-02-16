const { submitform } = require('./submitform.service');

const connectformsubmit = async (req, res) => {
  try {
    
    const result = await submitform(req.body);
    
    res.status(201).json({ message: "we contact you with in 24 hours", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={ connectformsubmit };