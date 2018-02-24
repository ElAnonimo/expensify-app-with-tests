import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from '../../actions/filters';
import moment from 'moment';

test('should generate setStartDate action object', () => {
	const action = setStartDate(moment(5));
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(5)
	});
});

test('should generate setEndDate action object', () => {
	const action = setEndDate(moment(7));
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(7)
	});
});

test('should generate setTextFilter action object with provided value', () => {
	const text = 'test filter';
	const action = setTextFilter(text);
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text
	});
});

test('should generate setTextFilter action object with defaults', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	});
});

test('should generate sortByAmount action object', () => {
	expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should generate sortByDate action object', () => {
	expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});
