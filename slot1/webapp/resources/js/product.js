
function addProduct(e) {
  e.preventDefault()


  // get data use id
  const productCode = document.getElementById("productId").value;


  // use form data
  const form = document.getElementById('form-p');

  const formData = new FormData(form);

  const dataForm = Object.fromEntries(formData.entries());


  const tbody = document.getElementById("tbody");

  const newRow = document.createElement("tr");

  const tdProCode = document.createElement("td");
  tdProCode.textContent = productCode;
  newRow.appendChild(tdProCode)

  const tdProName = document.createElement("td");
  tdProName.textContent = dataForm?.productName
  newRow.appendChild(tdProName)


  const tdStandardCost = document.createElement("td");
  tdStandardCost.textContent = dataForm?.standardCost
  newRow.appendChild(tdStandardCost)

  const tdListPrice = document.createElement("td");
  tdListPrice.textContent = dataForm?.listPrice
  newRow.appendChild(tdListPrice)

  const tdCategory = document.createElement("td");
  tdCategory.textContent = dataForm?.category
  newRow.appendChild(tdCategory)


  const tdDescription = document.createElement("td");
  tdDescription.textContent = dataForm?.descriptions
  newRow.appendChild(tdDescription)

  tbody.appendChild(newRow);




}