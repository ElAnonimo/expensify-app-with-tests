import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
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
	const startDate = moment(0).add(4, 'years');
	const endDate = moment(0).add(8, 'years');
	wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should set focus', () => {
	const calendarFocused = 'endDate';
	wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
