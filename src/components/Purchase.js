import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { SortingState, IntegratedSorting } from "@devexpress/dx-react-grid";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import { TableColumnResizing } from "@devexpress/dx-react-grid-material-ui";
import "./purchase.css"
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  tableStriped: {
    "& tbody tr:nth-of-type(odd)": {
      backgroundColor: "rgb(235, 235, 235)"
    },
    
  },
});

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
);

export const TableComponent = withStyles(styles, { name: "TableComponent" })(
  TableComponentBase
);

export default (props) => {
  const [columns] = useState([
    { name: "orderid", title: "OrderID", minWidth: 90 },
    { name: "proddetail", title: "Product\u00a0Details", minWidth: 140 },
    {
      name: "sku",
      title: "SKU(PROD ID)",
      minWidth: 100
    },
    {
      name: "cost",
      title: "Cost",
      minWidth: 60
    },
    {
      name: "quantity",
      title: "Qty",
      minWidth: 60
    },
    {
      name: "amt",
      title: "Amount",
      minWidth: 90
    },
    {
      name: "custid",
      title: "Customer\u00a0ID",
      minWidth: 70
    }
  ]);

  const [pageSizes] = useState([10, 25, 100]);
  const rows = props.purch
  const [defaultColumnWidths] = useState([
    { columnName: "orderid", width: 135 },
    { columnName: "proddetail", width: 330 },
    { columnName: "sku", width: 190 },
    { columnName: "cost", width: 100 },
    { columnName: "quantity", width: 80 },
    { columnName: "amt", width: 130 },
    { columnName: "custid", width: 165 }
  ]);
  return (
    <div className="purchase__table">
      <Paper>
        <Grid rows={rows} columns={columns} columnAutoWidth={true}>
          <SortingState
            defaultSorting={[{ columnName: "orderid", direction: "asc" }]}
          />
          <IntegratedSorting />
          <PagingState defaultCurrentPage={0} defaultPageSize={10} />
          <IntegratedPaging />
          <Table tableComponent={TableComponent}/>
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow showSortingControls />
          <PagingPanel  pageSizes={pageSizes} />
        </Grid>
      </Paper>
    </div>
  );
};
