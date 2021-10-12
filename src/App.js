import Customer from "./components/Customer";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	const [i, setiterator] = useState(0);
	const [data, setdata] = useState([
		{
			custid: "",
			firstname: "",
			lastname: "",
			dob: "",
			addr: "",
			city: "",
			states: "",
			pincode: "",
		},
	]);
	const [purchasedata, setpurchasedata] = useState([
		{
			amt: "",
			city: "",
			cost: "",
			custid: "",
			orderid: "",
			proddetail: "",
			quantity: "",
			sku: "",
		},
	]);
	const url = "http://localhost:5000/api/";
	useEffect(() => {
		axios
			.post(`${url}custdata`)
			.then((res) => {
				setdata(res.data);
				setiterator(0);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.post(`${url}purchdata`)
			.then((res) => {
				setpurchasedata(res.data)
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	//iterator change
	function changeiteratornext() {
		if (i < 1000) {
			setiterator(i + 1);
		}
	}
	function changeiteratorprev() {
		if (i != 0) {
			setiterator(i - 1);
		}
	}
	function changepage(pg){
		console.log("in app.js" + pg);
		setiterator(pg-1)
	}
	return (
		<div className="root">
			<Customer
				custid={data[i].custid}
				fname={data[i].firstname}
				lname={data[i].lastname}
				dob={new Date(data[i].dob)}
				addr={data[i].addr}
				city={data[i].city}
				states={data[i].states}
				zip={data[i].pincode}
				fn1={changeiteratornext}
				fn2={changeiteratorprev}
				fn3={changepage}
				purchase={purchasedata}
			></Customer>
		</div>
	);
}

export default App;
