import * as React from "react";
import "./navigation.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Navigation(props) {
	const [pgno,setpgno] = useState('');
	var next = ">";
	var prev = "<";

	function callnext() {
		props.fn1();
	}
	function callprev() {
		props.fn2();
	}
	function calln() {
		console.log(pgno);
		props.fn3(pgno);
		setpgno('');
	}
	function getpage(event) {
		if (event.nativeEvent.data != null) {
			setpgno(pgno + event.nativeEvent.data)
		}else{
			console.log(pgno.slice(0, pgno.length - 1));
			setpgno(pgno.slice(0, pgno.length - 1));
		}
	}
	return (
		<div className="navig">
			<div className="button">
				<Button onClick={callprev}>{prev}PREV</Button>
			</div>
			<div className="button">
				<Button onClick={callnext}>NEXT{next}</Button>
			</div>
			<div className="goto-customer">
				<TextField
					id="outlined-basic"
					label="Goto"
					variant="outlined"
					size="small"
					color="primary"
					value={pgno}
					onChange={getpage}
				/>
				<div className="search__button">
					<Button onClick={calln}>GO</Button>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
