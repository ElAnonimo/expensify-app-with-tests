import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpensesVisible from '../selectors/expenses';
import numeral from 'numeral';

export const ExpenseSummary = (props) => {
	const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';

	return (
		<div>Showing {props.expenseCount} visible {expenseWord} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}</div>
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpensesVisible(state.expenses, state.filters);

	return {
		expenseCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses)
	}
};

export default connect(mapStateToProps)(ExpenseSummary);
