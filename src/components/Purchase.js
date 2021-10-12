import * as React from "react";
import "./purchase.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const columns = [
	{ id: "orderid", label: "OrderID", minWidth: 50 },
	{ id: "proddetail", label: "Product\u00a0Details", minWidth: 150 },
	{
		id: "sku",
		label: "SKU (PROD ID)",
		minWidth: 150,
	},
	{
		id: "cost",
		label: "Cost",
		minWidth: 50,
	},
	{
		id: "quantity",
		label: "Qty",
		minWidth: 50,
	},
	{
		id: "amt",
		label: "Amount",
		minWidth: 70,
	},
	{
		id: "custid",
		label: "Customer\u00a0ID",
		minWidth: 50,
	},
];


export default function StickyHeadTable(props) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const rows = props.purch
	
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const Theme = createTheme({
		typography: {
		  fontFamily: [
			'Arial',
		  ].join(','),
		  fontSize: 20,
		},
	  });
	return (
		<div className="table-container">
			<ThemeProvider theme={Theme}>
			<Paper stickyHeader sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer stickyHeader sx={{ maxHeight: 420 }}>
					<Table
						stickyHeader
						aria-label="sticky table"
						size="medium"
						classes="table-mui"
					>
						<TableHead sx={{fontFamily : 'Arial, Helvetica, sans-serif'}}>
							<TableRow hover>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.orderid}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === "number"
															? column.format(value)
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			</ThemeProvider>
		</div>
	);
}
