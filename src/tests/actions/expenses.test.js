import { addExpense, startAddExpense, editExpense, removeExpense } from '../../actions/expenses';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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

/* test('should set up addExpense action object with provided values', () => {
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
}); */

test('should set up addExpense action object with provided values', () => {
	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[0]
	});
});

const createMockStore = configureMockStore([thunk]);

test('should add expense to database and store', (done) => {
	const store = createMockStore({});

	const expenseData = {
		description: 'mouse',
		amount: 3000,
		note: 'a mouse',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({});

	const defaultExpense = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	};

	store.dispatch(startAddExpense()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpense
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpense);
		done();
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
