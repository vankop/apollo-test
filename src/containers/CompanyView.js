import React, {PureComponent, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';
import {connectAdvanced} from 'react-redux';
import shallowEqual from 'shallow-equal/objects';

import {setCompany} from '../store/company';

import DepartmentRow from './DepartmentRow';
import EmployeeRow from './EmployeeRow';

const companyQuery = gql`
    query Company($id: Int!) {
        get_department(id: $id) {
              id,
              name,
              employees {
                id,
                name
              },
              departments {
                id,
                name
              }
        }
    }
`;

class CompanyView extends PureComponent {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        company: PropTypes.object,
        setCompany: PropTypes.func
    };

    componentWillUpdate(nextProps) {
        if (nextProps.company && nextProps.setCompany && nextProps.company != this.props.company) {
            nextProps.setCompany(nextProps.company.name)
        }
    }

    render() {

        if (this.props.loading) {
            return <div>Loading...</div>
        }

        return (
            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        this.props.company.departments.map(department =>
                            <DepartmentRow key={`department_${department.id}`} department={department}/>)
                    }
                    {
                        this.props.company.employees.map(employee =>
                            <EmployeeRow key={`employee_${employee.id}`} employee={employee}/>)
                    }
                </TableBody>
            </Table>
        )
    }
}

const CompanyViewWithData = graphql(companyQuery, {
    options: {variables: {id: -1}},
    props: ({ownProps, data: {get_department, loading, refetch}}) => ({
        loading,
        company: get_department,
        refetch,
    })
})(CompanyView);

export default connectAdvanced(dispatch => {
    let result = {};
    const dispatchSetCompany = name => dispatch(setCompany(name));
    return (nextState, nextOwnProps) => {
        const newResult = {
            ...nextOwnProps,
            setCompany: dispatchSetCompany
        };

        if (!shallowEqual(newResult, result)) {
            result = newResult
        }

        return result
    }
})(CompanyViewWithData)
