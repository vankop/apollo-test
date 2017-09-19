import React, {Component, PropTypes} from 'react';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default function EmployeeRow({employee}) {
    return (
        <TableRow>
            <TableRowColumn>{employee.id}</TableRowColumn>
            <TableRowColumn>{employee.name}</TableRowColumn>
        </TableRow>
    )
}

EmployeeRow.propTypes = {
    employee: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string
    }).isRequired
};