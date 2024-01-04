const express = require('express');
const cors = require('cors');
const router = express.Router();
const {loginController, signupController} = require('../controller/authController.js')
const {getAllExpensesController, 
      createExpenseController, 
      deleteExpenseWithID, 
      updateExpenseWithID, 
      getExpenseWithID } = require('../controller/trackerController.js');
const authenticateToken = require('../middlewares/auth.js');
const User = require('../model/userModle.js');


 //auth routes unprotected
 router.post('/signup',signupController)
       .post('/login',loginController);

 
 //protected routes
 router.get('/getAllExpenses', authenticateToken, getAllExpensesController)
       .post('/createExpense', authenticateToken, createExpenseController)
       .get('/expense/:id', authenticateToken, getExpenseWithID)
       .put('/expenseUpdate/:id', authenticateToken, cors({ methods: 'PATCH' }), updateExpenseWithID)
       .delete('/expenseDelete/:id', authenticateToken, deleteExpenseWithID)

 router.post('/setBudget', authenticateToken, async (req, res) => {
      try {
        const { monthlyBudget } = req.body;
        const userId = req.user.userId; 
    
        if ( !typeof(monthlyBudget) == 'number' || monthlyBudget < 0) {
          return res.status(400).json({ message: 'Invalid monthly budget value' });
        }

        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { monthlyBudget } },
          { new: true }
        );
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json({ message: 'Monthly budget set successfully', user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
 router.get('/getBudget', authenticateToken,
      async (req, res) => {
            try {
              const userId = req.user.userId;
              
              const user = await User.findOne({ _id: userId });
          
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
          
              res.json({ monthlyBudget: user.monthlyBudget });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          }
 );
module.exports = router;