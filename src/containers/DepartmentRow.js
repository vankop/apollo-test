import React, {Component, PropTypes} from 'react';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default function DepartmentRow({department}) {
    return (
        <TableRow>
            <TableRowColumn>{department.id}</TableRowColumn>
            <TableRowColumn>{department.name}</TableRowColumn>
        </TableRow>
    )
}

DepartmentRow.propTypes = {
    department: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string
    }).isRequired
};