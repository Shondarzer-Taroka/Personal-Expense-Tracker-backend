// //  src/routes/expenseRoutes.js
import express from 'express';
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expenseController.js';

const router = express.Router();

router.route('/')
  .get(getExpenses)
  .post(addExpense);

router.route('/:id')
  .patch(updateExpense)
  .delete(deleteExpense);

export default router;