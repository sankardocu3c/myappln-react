import "./customer.css";
import Navigation from "./Navigation";
import Purchase from "./Purchase";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@material-ui/styles";

function Customer(props) {
	const Theme = createTheme({
		typography: {
			fontFamily: ["Roboto"].join(","),
			fontSize: 22,
		},
	});
	const [search, setsearch] = useState("");
	const [filtersearch, setfiltersearch] = useState([]);
	var space =" ";
	var temp = [];
	purchasedata();
	useEffect(() => {
		setfiltersearch(temp);
	}, []);
	const month = props.dob.toLocaleString("en-US", { month: "long" });
	const day = props.dob.toLocaleString("en-US", { day: "2-digit" });
	const year = props.dob.getFullYear();
	function changeiteratornext() {
		props.fn1();
		temp = props.purchase.filter((pur) => props.custid === pur.custid - 1);
		setfiltersearch(temp);
	}
	function changeiteratorprev() {
		props.fn2();
		temp = props.purchase.filter((pur) => props.custid === pur.custid + 1);
		setfiltersearch(temp);
	}
	function changepage(passdata) {
		console.log(passdata);
		setfiltersearch(props.purchase.filter((pur) => passdata === pur.custid));
		console.log("in cust.js" + passdata);
		props.fn3(passdata);
	}
	function purchasedata() {
		temp = props.purchase.filter((pur) => props.custid === pur.custid);
	}
	function clearfilter() {
		temp = props.purchase.filter((pur) => props.custid === pur.custid);
		setfiltersearch(temp);
		setsearch("");
	}
	function searchfield(event) {
		if (event.nativeEvent.data != null) {
			setsearch(search + event.nativeEvent.data);
		} else {
			console.log(search.slice(0, search.length - 1));
			setsearch(search.slice(0, search.length - 1));
		}
		//filter
		console.log(search);
		var arr = [];
		var k = 0;
		temp.forEach((ele) => {
			if (ele.orderid.toString().match(search)) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working orderid");
				return;
			} else if (
				ele.proddetail.toString().toLowerCase().match(search.toLowerCase())
			) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working proddetail");
				return;
			} else if (ele.sku.toString().match(search)) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working sku");
				return;
			} else if (ele.cost.toString().match(search)) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working cost");
				return;
			} else if (ele.quantity.toString().match(search)) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working quantity");
				return;
			} else if (ele.amt.toString().match(search)) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working amt");
				return;
			} else if (ele.custid.toString().match(search)) {
				arr[k] = ele.orderid.toString();
				k = k + 1;
				//console.log("working custid");
				return;
			}
		});
		var a = [];
		for (let i = 0; i < k; i++) {
			for (let j = 0; j < temp.length; j++) {
				if (arr[i] === temp[j].orderid.toString()) {
					a.push(temp[j]);
				}
			}
		}
		setfiltersearch(a);
	}
	return (
		<div>
			<div className="container">
				<div className="flexbox-item">
					<ThemeProvider>
					<p className="flexbox-item flexbox-item1" theme={Theme}>
							<b > Customer ID&nbsp;:&nbsp;</b> {props.custid}
					</p>
					</ThemeProvider>
					<p className="flexbox-item flexbox-item2">
					<b>Customer FName&nbsp;:&nbsp;</b> {props.fname}
					</p>
					<p className="flexbox-item flexbox-item3">
					<b>Customer LName&nbsp;:&nbsp;</b>{props.lname}
					</p>
				</div>
				<div className="flexbox-item">
					<p className="flexbox-item flexbox-item4">
					<b>DOB&nbsp;:&nbsp;</b>{month} {day},{year}
					</p>
					<p className="flexbox-item flexbox-item5"><b>Address&nbsp;:&nbsp;</b> {props.addr}</p>
					<p className="flexbox-item flexbox-item6"><b>City&nbsp;:&nbsp;</b>{props.city}</p>
				</div>
				<div className="flexbox-item">
					<p className="flexbox-item flexbox-item7"><b>State&nbsp;:&nbsp;</b> {props.states}</p>
					<p className="flexbox-item flexbox-item8"><b>Zip&nbsp;:&nbsp;</b> {props.zip}</p>
					<p className="flexbox-item flexbox-item9">
						<Navigation
							fn1={changeiteratornext}
							fn2={changeiteratorprev}
							fn3={changepage}
						/>
					</p>
				</div>
			</div>
			<div className="purchase-container">
				<div className="purchase-search">
					<TextField
						id="outlined"
						label="Search"
						variant="outlined"
						size="small"
						color="primary"
						value={search}
						onChange={searchfield}
						sx={{ m: 1, width: "25ch",padding: "3px",paddingLeft : "5"}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="Close"
										onClick={clearfilter}
										edge="end"
										color="primary"
									>
										<CloseIcon/>
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className="purchase__pagination">
					<Purchase purch={filtersearch} />
				</div>
			</div>
		</div>
	);
}

export default Customer;
