import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render ExpenseSummary with single expense Ok', () => {
	const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={10} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with multiple expenses Ok', () => {
	const wrapper = shallow(<ExpenseSummary expenseCount={5} expensesTotal={150} />);
	expect(wrapper).toMatchSnapshot();
});
