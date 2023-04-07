/*
---CRUD
C => Create
R => Read
U => Update
D => Delete
*/

var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var productContainer = [];
var btnAddProduct = document.getElementById('btnAdd');
var tepm = 0;


if(localStorage.getItem("productContainer") != null){
    productContainer = JSON.parse(localStorage.getItem("productContainer"));
    displayProducts(productContainer);
}

function valifateProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/i;
    return regex.test(productNameInput.value);
}

function addProduct(){

    if(btnAddProduct.innerHTML == "Add product"){
        if(valifateProductName() == true){
            var product = {
                productName:productNameInput.value,
                productPrice:productPriceInput.value,
                productCategory:productCategoryInput.value,
                productDesc:productDescInput.value
            }
            productContainer.push(product);
            localStorage.setItem("productContainer", JSON.stringify(productContainer));
            clearForm();
            displayProducts(productContainer);
        }else{
            alert("invaled value");
        }
    }else{
        var updateProduct = {
            productName:productNameInput.value,
            productPrice:productPriceInput.value,
            productCategory:productCategoryInput.value,
            productDesc:productDescInput.value
        }
        productContainer.splice(tepm, 1, updateProduct)
        displayProducts(productContainer);
        localStorage.setItem("productContainer",  JSON.stringify(productContainer));
        clearForm();
        btnAddProduct.innerHTML = "Add product"
    }
}

function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProducts(arr){
    var cartoona = ``;
    for(var i = 0; i < arr.length; i++){
        cartoona += `
        <tr>
            <td>${i}</td>
            <td>${arr[i].productName}</td>
            <td>${arr[i].productPrice}</td>
            <td>${arr[i].productCategory}</td>
            <td>${arr[i].productDesc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
        </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProduct(deleteindex){
    productContainer.splice(deleteindex,1);
    displayProducts(productContainer);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
}

function searchProduct(term){
    var matchedProducts = [];
    for(var i = 0; i < productContainer.length; i++){
        if(productContainer[i].productName.toLowerCase().includes(term.toLowerCase()) == true){
            matchedProducts.push(productContainer[i]);
        }
    }
    displayProducts(matchedProducts);
}

function updateProduct(index){

    productNameInput.value = productContainer[index].productName;
    productPriceInput.value = productContainer[index].productPrice;
    productCategoryInput.value = productContainer[index].productCategory;
    productDescInput.value = productContainer[index].productDesc;

    btnAddProduct.innerHTML = "Update";
    tepm = index;
}