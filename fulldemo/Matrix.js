import {MaxSize} from './constants.js';

export class Matrix {
	constructor() {
		this.size_error = document.getElementById("size-error");
		this.matrix = document.getElementById("matrix");
		this.table;
	}
	
	createMatrix(size) {
		if (size < 1 | isNaN(size)) {
			this.size_error.innerHTML = "&nbsp;Size must be a positive number.";
			return false;
		} else if (size > MaxSize) {
			this.size_error.innerHTML = `Size cannot exceed ${MaxSize}.`;
		}
		else {
			this.size_error.innerHTML = "";
			
			this.matrix.innerHTML = "<form><table align=\"left\"></table></form>";
			
			this.table = document.querySelector("table");

			let caption = this.table.createCaption();
			caption.innerHTML = "<p>Enter values between 0 and 1</p>";
			
			let head = this.table.createTHead();
			let row = head.insertRow();
			
			let th = document.createElement("th");
			th.className = "rhead";
			let text = document.createTextNode("");
			th.appendChild(text);
			row.appendChild(th);
			
			for (let i= 1; i <= size; i++) {
				th = document.createElement("th");
				text = document.createTextNode(i);
				th.appendChild(text);
				row.appendChild(th);
			}
			
			for (let j = 1; j <= size; j++) {		
				row = this.table.insertRow();
				let rhead = row.insertCell(0);
				rhead.className = "rhead";
				let text = document.createTextNode(j);
				rhead.appendChild(text);
				
				for (let k = 1; k <= size; k++) {
					let cell = row.insertCell(k);
					let element = document.createElement("input");
					element.name = "(" + j + ", " + k + ")";
					element.className = "relation";
					if (j >= k) element.disabled = true;
					cell.appendChild(element);
				}
			}
		}

		return true;
	}
}