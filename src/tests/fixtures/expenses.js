import moment from 'moment';

export default [{
	id: '1',
	description: 'hiya',
	note: 'yeah',
	amount: 5,
	createdAt: 0
}, {
	id: '2',
	description: 'Quito',
	note: 'Ec',
	amount: 55,
	createdAt: moment(0).subtract(2, 'days').valueOf()
}, {
	id: '3',
	description: 'Otavalo',
	note: 'Ecuador',
	amount: 100,
	createdAt: moment(0).add(2, 'days').valueOf()
}];
