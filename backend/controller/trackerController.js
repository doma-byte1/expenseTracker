const Expense = require("../model/expenseModel");

const getAllExpensesController = async (req, res) => {
      try {
        const userId = req.user.userId;
    
        const expenses = await Expense.find({ user: userId });
    
        res.status(200).json({ expenses });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

const createExpenseController = async (req, res) => {
      try {
        const { amount, category, description } = req.body;
        const userId = req.user.userId; 
        if(!amount || !category || !description) return res.json({message: 'fields are invalid'})
        const newExpense = new Expense({
          user: userId,
          amount,
          category,
          description,
        });
    
        await newExpense.save();
    
        res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
 }
 const getExpenseWithID = async (req, res) => {
      try {
        const userId = req.user.userId;
    
        const expense = await Expense.findOne({ _id: req.params.id, user: userId });
    
        if (!expense) {
          return res.status(404).json({ message: 'Expense not found' });
        }
    
        res.status(200).json({ expense });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
const updateExpenseWithID = async (req, res) => {
      try {
        const userId = req.user.userId;
    
        const expense = await Expense.findOne({ _id: req.params.id, user: userId });
    
        if (!expense) {
          return res.status(404).json({ message: 'Expense not found' });
        };
        expense.amount = req.body.amount;
        // expense.category = req.body.category;
        expense.description = req.body.description;
    
        await expense.save();
    
        res.json({ message: 'Expense updated successfully', expense });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
const deleteExpenseWithID =async (req, res) => {
      try {
        const userId = req.user.userId;
    
        const expense = await Expense.findOne({ _id: req.params.id, user: userId });
    
        if (!expense) {
          return res.status(404).json({ message: 'Expense not found' });
        }
    
        await expense.deleteOne();
    
        res.json({ message: 'Expense deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

module.exports = { getAllExpensesController, createExpenseController, getExpenseWithID, updateExpenseWithID, deleteExpenseWithID }