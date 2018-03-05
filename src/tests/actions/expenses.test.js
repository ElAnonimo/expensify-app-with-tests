import { addExpense, startAddExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	database.ref('expenses').set(expensesData).then(() => done());
});

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

test('should set up expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch expenses from DB on app load', (done) => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});

test('should remove expense by id on firebase and store', (done) => {
	const store = createMockStore({});
	const id = expenses[0].id;
	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`expenses/${id}`).once('value');
		})
		.then((snapshot) => {
			expect(snapshot.val()).toEqual(null);
			expect(snapshot.val()).toBeFalsy();			// equal to the line above. null's considered falsy
			done();
		});
});
