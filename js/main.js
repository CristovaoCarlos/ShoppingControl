var list = [
	{"desc":"rice","amount":"1","value":"5.40"},
	{"desc":"bear","amount":"12","value":"1.99"},
	{"desc":"meat","amount":"1","value":"12.33"},
	{"desc":"RedLabel Wisk","amount":"1","value":"82.20"},
];

function getTotal(list) {
	var total = 0;

	for(var key in list)
	{
		total += list[key].value * list[key].amount;
	}
	document.getElementById("totalValue").innerHTML = formatValue(total);
	return total;
}

function setList(list) {
	var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>'

	for(var key in list)
	{
		table += '<tr>'+
					'<td>'+formatDesc(list[key].desc)+'</td>'+
					'<td>'+formatAmount(list[key].amount)+'</td>'+
					'<td>'+formatValue(list[key].value)+'</td>'+
					'<td><button onclick="setUpdate('+key+');" class="btn btn-default">Edit</button> | <button onclick="deleteData('+key+');" class="btn btn-default">Delete</button></td>'+
				 '</tr>';
	}
	table += '</tbody>';
	document.getElementById("listTable").innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

function formatDesc(desc) {
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatValue(value) {
	var val = parseFloat(value).toFixed(2) + "";
	val = val.replace(".", ",");
	val = "R$ "+ val;
	return val;
}

function formatAmount(amount) {
	return parseInt(amount);
}

function addData() {
	if(!validation()){
		document.getElementById("errors").style.display = "block";
		return;
	}
	document.getElementById("errors").style.display = "none";
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift({"desc":desc,"amount":amount,"value": value});
	setList(list);
	getTotal(list);
}

function setUpdate(id) {
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;

	document.getElementById("bntUptade").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">'
}

function resetForm() {
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";

	document.getElementById("bntUptade").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	document.getElementById("inputIDUpdate").innerHTML = "";
}

function updateData() {
	if(!validation()){
		document.getElementById("errors").style.display = "block";
		return;
	}
	document.getElementById("errors").style.display = "none";
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc":desc,"amount":amount,"value":value};

	resetForm();
	setList(list);

}

function deleteData(id) {
	if (confirm("Quer deletar este item?")){
		if (id===list.length-1){
			list.pop();
		}
		else if(id===0){
			list.shift();
		}
		else{
			var arrAuxIni = list.slice(0, id);
			var arrAuxEnd = list.slice(id+1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);

	}


	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;
}

function validation() {
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";
	if(desc=== ""){
		errors += '<p>Escreva uma Descrição.</p>'
	}
	if(amount=== ""){
		errors += '<p>Escreva uma Quantidade.</p>'
	}
	else if(amount != parseInt(amount)){
		errors += '<p>Escreva uma Quantidade valida.</p>'
	}
	if(value=== ""){
		errors += '<p>Escreva um Valor.</p>'
	}
	else if(value != parseFloat(value)){
		errors += '<p>Escreva um Valor valido.</p>'
	}

	if(errors != ""){
		document.getElementById("errors").style.display = 'block';
		document.getElementById("errors").style.backgroundColor = '#ccc';
		document.getElementById("errors").style.color = 'red';
		document.getElementById("errors").style.padding = '10px';
		document.getElementById("errors").style.margin = '10px';
		document.getElementById("errors").style.borderRadius = '13px';



		document.getElementById("errors").innerHTML = "<h3>Error: </h3>"+errors;

		return 0;
	}else{
		return 1;
	}

}

function clearData() {
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
}

function deleteList() {
	if(confirm("Deseja Deletar a lista de compras?")){
		list = [];
		setList(list);
	}
}

function saveListStorage(list) {
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list", jsonStr);
}

function initListStorage() {
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}


initListStorage();