import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

test('should render EditExpensePage', () => {
	const wrapper = shallow(<EditExpensePage />);
	expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense()', () => {
	const editExpense = jest.fn();
	const history = { push: jest.fn() };
	const wrapper = shallow(<EditExpensePage expense={expenses[0]} editExpense={editExpense} history={history} />);
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
	expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense()', () => {
	const startRemoveExpense = jest.fn();
	const history = { push: jest.fn() };
	const wrapper = shallow(<EditExpensePage expense={expenses[0]} startRemoveExpense={startRemoveExpense} history={history} />);
	wrapper.find('button').simulate('click');
	expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
	expect(history.push).toHaveBeenLastCalledWith('/');
});
