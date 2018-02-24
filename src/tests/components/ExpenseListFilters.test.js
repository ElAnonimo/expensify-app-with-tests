import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(<ExpenseListFilters
		filters={filters}
		setTextFilter={setTextFilter}
		sortByDate={sortByDate}
		sortByAmount={sortByAmount}
		setStartDate={setStartDate}
		setEndDate={setEndDate}
	/>);
});

test('should render ExpenseListFilters with alt filters', () => {
	wrapper.setProps({ filters: altFilters });
	expect(wrapper).toMatchSnapshot();
});

test('should handle text filter change', () => {
	wrapper.find('input').simulate('change', { target: { value: 'privet' } });
	expect(setTextFilter).toHaveBeenLastCalledWith('privet');
});

test('should sort by date', () => {
	wrapper.find('select').simulate('change', { target: { value: 'date' } });
	expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
	wrapper.find('select').simulate('change', { target: { value: 'amount' } });
	expect(sortByAmount).toHaveBeenCalled();
});

test('should set start and end dates', () => {
	wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate: 0, endDate: 1 });
	expect(setStartDate).toHaveBeenLastCalledWith(0);
	expect(setEndDate).toHaveBeenLastCalledWith(1);
});

test('should set focus', () => {
	wrapper.find('DateRangePicker').prop('onFocusChange')(true);
	expect(wrapper.state('calendarFocused')).toBe(true);
});
