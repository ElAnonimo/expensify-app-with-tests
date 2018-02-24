import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense', () => {
	const expense = {
		description: 'wrtwef',
		note: 'k.;,kp.',
		amount: 7,
		createdAt: 5
	};
	const wrapper = shallow(<ExpenseForm expense={expense} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
	wrapper.find('form').simulate('submit', { preventDefault: () => {} });
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(0).simulate('change', { target: { value: 'abcdef'} });
	expect(wrapper.state('description')).toBe('abcdef');
});

test('should set note on textarea change', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('textarea').simulate('change', { target: { value: 'abcdef'} });
	expect(wrapper.state('note')).toBe('abcdef');
});

test('should set amount if valid data', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', { target: { value: '12345'} });
	expect(wrapper.state('amount')).toBe('12345');
});

test('should not set amount if invalid data', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(1).simulate('change', { target: { value: 'test data 12.345'} });
	expect(wrapper.state('amount')).not.toBe('test data 12.345');
	expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', { preventDefault: () => {} });
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		createdAt: expenses[0].createdAt,
		note: expenses[0].note,
	});
});

test('should set new date on date change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const now = moment();
	wrapper.find('SingleDatePicker').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus', () => {
	const wrapper = shallow(<ExpenseForm />);
	const focused = true;
	wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused);
});
