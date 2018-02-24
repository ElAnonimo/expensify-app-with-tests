import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should set up default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
	expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
	const initState = {
		text: '',
		sortBy: 'amount',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
	const state = filtersReducer(initState, { type: 'SORT_BY_DATE' });
	expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
	const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'abcdef' });
	expect(state.text).toBe('abcdef');
});

test('should set start date', () => {
	const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: 12345 });
	expect(state.startDate).toBe(12345);
});

test('should set end date', () => {
	const endDate = moment();
	const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: endDate });
	expect(state.endDate).toEqual(endDate);
});
