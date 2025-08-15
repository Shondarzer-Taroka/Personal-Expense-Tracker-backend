// // src/controller/expenseController.js
import Expense from '../models/Expense.js';
import { validateExpense } from '../validations/expenseValidation.js';

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total,
      data: expenses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Public
export const addExpense = async (req, res) => {
  const { errors, valid } = validateExpense(req.body);

  if (!valid) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update expense
// @route   PATCH /api/expenses/:id
// @access  Public
export const updateExpense = async (req, res) => {
  const { errors, valid } = validateExpense(req.body);

  if (!valid) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};