import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import uuid from 'uuid';

test('should set up removeExpense action object', () => {
	const action = removeExpense({ id: '12345abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '12345abc'
	});
});

test('should edit an expense', () => {
	const action = editExpense('123abc', { prop1: 'abc', prop2: 12345 });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			prop1: 'abc',
			prop2: 12345
		}
	});
});

test('should set up addExpense action object with provided values', () => {
	const expenseData = {
		id: uuid(), description: "Mikki's good", note: 'Hi there', amount: 5, createdAt: 5
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
});

test('should set up addExpense action object with defaults', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '',
			note: '',
			amount: 0,
			createdAt: 0
		}
	});
});
