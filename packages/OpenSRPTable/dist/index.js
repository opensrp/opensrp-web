'use strict';

const _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.OpenSRPTable = OpenSRPTable;

const _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

const React = _interopRequireWildcard(require('react'));

const _reactTable = require('react-table');

const _constants = require('./constants');

require('./index.css');

const defaultOpenSRPTableProps = {
    data: [],
    tableColumns: [
        {
            Header: _constants.PLEASE_DEFINE_SOME_COLUMNS,
            accessor: '',
        },
    ],
};

function OpenSRPTable() {
    const props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOpenSRPTableProps;
    const tableColumns = props.tableColumns,
        data = props.data;

    const _useTable = (0, _reactTable.useTable)(
            {
                columns: tableColumns,
                data: data,
            },
            _reactTable.useSortBy,
        ),
        getTableProps = _useTable.getTableProps,
        getTableBodyProps = _useTable.getTableBodyProps,
        headerGroups = _useTable.headerGroups,
        rows = _useTable.rows,
        prepareRow = _useTable.prepareRow;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'table',
            (0, _extends2['default'])({}, getTableProps(), {
                className: 'table react-table',
            }),
            React.createElement(
                'thead',
                null,
                headerGroups.map(function(headerGroup, idx) {
                    return React.createElement(
                        'tr',
                        (0, _extends2['default'])(
                            {
                                key: 'thead-tr-'.concat(idx),
                            },
                            headerGroup.getHeaderGroupProps(),
                        ),
                        headerGroup.headers.map(function(c, index) {
                            const column = c;
                            React.createElement(
                                'th',
                                (0, _extends2['default'])(
                                    {
                                        key: 'thead-th-'.concat(index),
                                    },
                                    column.getHeaderProps(column.getSortByToggleProps()),
                                ),
                                column.render('Header'),
                                React.createElement(
                                    'span',
                                    null,
                                    column.canSort
                                        ? column.isSorted
                                            ? column.isSortedDesc
                                                ? React.createElement(React.Fragment, null, '\xA0\xA0\xA0\u2193')
                                                : React.createElement(React.Fragment, null, '\xA0\xA0\xA0\u2191')
                                            : React.createElement(React.Fragment, null, '\xA0\xA0\xA0\u2195')
                                        : '',
                                ),
                            );
                        }),
                    );
                }),
            ),
            React.createElement(
                'tbody',
                getTableBodyProps(),
                rows.map(function(row, i) {
                    prepareRow(row);
                    return React.createElement(
                        'tr',
                        (0, _extends2['default'])(
                            {
                                key: 'tbody-tr-'.concat(i),
                            },
                            row.getRowProps(),
                        ),
                        row.cells.map(function(cell, index) {
                            return React.createElement(
                                'td',
                                (0, _extends2['default'])(
                                    {
                                        key: 'tbody-td-'.concat(index),
                                    },
                                    cell.getCellProps(),
                                ),
                                cell.render('Cell'),
                            );
                        }),
                    );
                }),
            ),
        ),
    );
}
