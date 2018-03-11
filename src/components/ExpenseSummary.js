import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpensesVisible from '../selectors/expenses';
import numeral from 'numeral';

export const ExpenseSummary = (props) => {
	const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';

	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">
					Showing <span>{props.expenseCount}</span> visible {expenseWord} totalling <span>{numeral(props.expensesTotal / 100).format('$0,0.00')}</span>
				</h1>
				<div className="page-header__actions">
					<Link className="button" to="/create">Add expense</Link>
				</div>
			</div>
		</div>
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
