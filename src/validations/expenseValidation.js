export const validateExpense = (expense) => {
  const errors = {};

  if (!expense.title || expense.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (expense.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  }

  if (!expense.amount || isNaN(expense.amount)) {
    errors.amount = 'Amount must be a number';
  } else if (Number(expense.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!expense.category || expense.category.trim() === '') {
    errors.category = 'Category is required';
  }

  if (!expense.date || isNaN(Date.parse(expense.date))) {
    errors.date = 'Valid date is required';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};