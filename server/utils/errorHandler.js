
function errorHandler(err, res) {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
  
  module.exports = errorHandler;
  