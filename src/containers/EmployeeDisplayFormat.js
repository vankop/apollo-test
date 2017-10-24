import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Checkbox} from 'material-ui';

const styles = {
	checkbox: {
		marginBottom: 16,
	},
};

export class EmployeeDisplayFormat extends React.Component {

	static displayNameFormats = {
		firstSecond: 'FIRST_SECOND',
		secondFirst: 'SECOND_FIRST'
	};

	static propTypes = {
		loading: PropTypes.bool,
		displayNameFormat: PropTypes.oneOf([
			EmployeeDisplayFormat.displayNameFormats.firstSecond,
			EmployeeDisplayFormat.displayNameFormats.secondFirst
		]),
		onChange: PropTypes.func
	};

	constructor() {
		super();

		this.checkHandler = this.checkHandler.bind(this)
	}

	checkHandler() {
		if (this.props.onChange) {
			this.props.onChange(
				this.isFirstSecond()
				? EmployeeDisplayFormat.displayNameFormats.secondFirst
				: EmployeeDisplayFormat.displayNameFormats.firstSecond
			)
		}
	}

	isFirstSecond() {
		return this.props.displayNameFormat === EmployeeDisplayFormat.displayNameFormats.firstSecond
	}

	render() {
		if (this.props.loading) {
			return <div>Loading...</div>
		}

		return (
			<Checkbox
				label={this.props.displayNameFormat}
				checked={this.isFirstSecond()}
				onCheck={this.checkHandler}
				style={styles.checkbox}
			/>
		)
	}
}

const withQuery = graphql(gql`
	query AppConfig {
		appConfig {
			employee {
				displayNameFormat
			}
		}
	}`, {
	props: ({ownProps, data: {loading, appConfig}}) => {
		let result = {...ownProps, loading};

		if (appConfig) {
			result.displayNameFormat = appConfig.employee.displayNameFormat
		}

		return result
	}
});

const withMutation = graphql(gql`
	mutation EmployeeDisplayFormat($displayNameFormat: DisplayNameFormat!) {
		appConfig {
			employee(displayNameFormat: $displayNameFormat) {
				displayNameFormat
			}
		}
	}`, {
		props: ({ownProps, mutate}) => ({
			...ownProps,
			onChange: displayNameFormat => mutate({
				variables: {
					displayNameFormat
				}
			})
		})
	}
);

export default withQuery(withMutation(EmployeeDisplayFormat));