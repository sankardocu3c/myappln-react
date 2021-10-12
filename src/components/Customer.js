import "./customer.css";
import Navigation from "./Navigation";
import Purchase from "./Purchase";
import TextField from "@mui/material/TextField";
import { Button, SliderValueLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function Customer(props) {
	const Theme = createTheme({
		typography: {
		  fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		  ].join(','),
		},
	  });
	const[search,setsearch] = useState('');
	const[filtersearch,setfiltersearch] = useState([]);
	var temp =[];
	purchasedata();
	useEffect(()=>{
		setfiltersearch(temp);
	},[]);
	const month = props.dob.toLocaleString("en-US", { month: "long" });
	const day = props.dob.toLocaleString("en-US", { day: "2-digit" });
	const year = props.dob.getFullYear();
	function changeiteratornext() {
		props.fn1();
		temp = props.purchase.filter((pur)=> props.custid === pur.custid-1);
		setfiltersearch(temp);
	}
	function changeiteratorprev() {
		props.fn2();
		temp = props.purchase.filter((pur)=> props.custid === pur.custid+1);
		setfiltersearch(temp);
	}
	function changepage(passdata){
		console.log(passdata);
		setfiltersearch(props.purchase.filter((pur)=> passdata === pur.custid));
		console.log("in cust.js" + passdata);
		props.fn3(passdata);
		
	}
	function purchasedata(){
		temp = props.purchase.filter((pur)=> props.custid === pur.custid);
	}
	function clearfilter(){
		temp = props.purchase.filter((pur)=> props.custid === pur.custid);
		setfiltersearch(temp);
	}
	function searchfield(event){
		if(event.nativeEvent.data != null){
			setsearch(search+event.nativeEvent.data);	
		}
	}
	function searchfilter(event){
		var arr = [];
		var k = 0;
		console.log("temp: "+temp)
		temp.forEach(ele => {
			console.log(search)
			console.log("element :" + ele.orderid + ";")
			if(ele.orderid.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working orderid");
				return;
			}else if(ele.proddetail.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working proddetail");
				return;
			}else if(ele.sku.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working sku");
				return;
			}else if(ele.cost.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working cost");
				return;
			}else if(ele.quantity.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working quantity");
				return;
			}else if(ele.amt.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working amt");
				return;
			}else if(ele.custid.toString().match(search)){
				arr[k] = ele.orderid.toString();
				k = k+1;
				console.log("working custid");
				return;
			}
		});
		var a = [];
		for(let i=0;i<k;i++){
			for(let j=0;j<temp.length;j++){
				console.log("temp.length() "+ temp.length+" i "+i+" arr[i] "+ arr[i] +" temp[j].custid.toString() " + temp[j].custid.toString())
				if(arr[i] === temp[j].orderid.toString() ){
					console.log(temp[j]);
					a.push(temp[j])	
				}
			}
		}
		console.log(a);
		setfiltersearch(a);
		setsearch('');
	}
	return (
		<div>
			<ThemeProvider theme={Theme}>
			<div className="container">
				<div className="flexbox-item">
					<p className="flexbox-item flexbox-item1">
						Customer ID : {props.custid}
					</p>
					<p className="flexbox-item flexbox-item2">
						Customer FName : {props.fname}
					</p>
					<p className="flexbox-item flexbox-item3">
						Customer LName : {props.lname}
					</p>
				</div>
				<div className="flexbox-item">
					<p className="flexbox-item flexbox-item4">
						DOB : {month} {day},{year}
					</p>
					<p className="flexbox-item flexbox-item5">Address : {props.addr}</p>
					<p className="flexbox-item flexbox-item6">City : {props.city}</p>
				</div>
				<div className="flexbox-item">
					<p className="flexbox-item flexbox-item7">State : {props.states}</p>
					<p className="flexbox-item flexbox-item8">Zip : {props.zip}</p>
					<p className="flexbox-item flexbox-item9">
						<Navigation fn1={changeiteratornext} fn2={changeiteratorprev} fn3={changepage} />
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
					/>
					<div className="search__button">
						<Button onClick={searchfilter}>SEARCH</Button>
					</div>
					<div className="clear__button">
						<Button onClick={clearfilter}>CLEAR</Button>
					</div>
				</div>
				<div className="purchase__pagination">
					<Purchase purch={filtersearch}/>
				</div>
			</div>
			</ThemeProvider>
		</div>
	);
}

export default Customer;
