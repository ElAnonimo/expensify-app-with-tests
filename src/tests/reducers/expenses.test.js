import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = { type: 'REMOVE_EXPENSE', id: expenses[0].id };
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([ expenses[1], expenses[2] ]);
});

test('should add expense', () => {
	const state = expensesReducer(undefined, { type: 'ADD_EXPENSE', expense: expenses[0] });
	expect(state).toEqual([ expenses[0] ]);
});

test('should edit expense', () => {
	const updates = {
		id: '100',
		description: 'abc',
		note: 'def',
		amount: 5,
		createdAt: 0
	};
	const action = { type: 'EDIT_EXPENSE', id: expenses[0].id, updates: updates};
	const state = expensesReducer(expenses, action);
	expect(state[0]).toEqual(updates);
});

test('should set expense', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[0]]
	};

	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0]]);
});
