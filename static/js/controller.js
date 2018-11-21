var stores = ['Ace Hardware', "Casey's", 'Fareway', 'Goodwill', 'Kwik Star', 'Luther Bookstore', 'Magpie', 'Oneota Co-op', 'Quillins', 'Walmart']
var sections = ['Clothing', 'Dairy', 'Electronics', 'Frozen', 'Games', 'Garden', 'Home', 'Kitchen', 'Liquor', 'Meat', 'Produce', 'Snacks', 'Tools']
var quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var priorities = ['Low', 'Medium', 'High']
 

var shoppingModel = new ShoppingList()
var myView = new ShoppingView(shoppingModel)

function clickedon() {
    let rowcolids = ['item', 'quantity', 'store', 'department', 'price', 'priority']
    let vals = {}
    for (let cid of rowcolids) {
        vals[cid] = document.getElementById(cid).value;
    }
    let empty = false;
    for(val in vals){
        if (vals[val] == ""){
            alert("Please make sure all text fields are filled!")
            empty = true;
        }
    }
    if (empty == false){
        let it = new Item(vals.item, vals.quantity, vals.priority, vals.store, vals.department, vals.price)
        shoppingModel.addItem(it)
    }
}

function populateSelect(selectId, selectValues){
    let dd = document.getElementById(selectId, selectValues);
    for (let optVal of selectValues){
        let optItem = document.createElement('option');
        optItem.value = optVal;
        optItem.innerHTML = optVal;
        dd.appendChild(optItem);
    }
}

function saveList(){
    var shoppinglist = shoppingModel.saveList();
    let server_url = 'http://localhost:5000';
    return fetch(`${server_url}/save`, {method:'POST', body: JSON.stringify(shoppinglist)})
    .catch(error => console.error('Error: ' + error));
}

function loadList(){
    let server_url = 'http://localhost:5000';
    let vals = fetch(`${server_url}/get`, {method:'GET'})
    .then(response => response.json())
    .then(response => JSON.stringify(response))
    .then(response => JSON.parse(response))
    .then(function(response) {
        response.forEach(function(item){
            let itemValues = new Item(item.name, item.quantity, item.priority, item.store, item.department, item.price, item._purchased)
            shoppingModel.addItem(itemValues);    
        });
    })
    .catch(error => console.error('Error: ' + error));
    
    
}

function clearList(){
    shoppingModel.emptyList()
    myView.redrawList(shoppingModel);
    saveList(shoppingModel.saveList());
}

function removePurchased(){
    shoppingModel.cleanList()
    myView.redrawList(shoppingModel);
    saveList(shoppingModel.saveList());
}

$(document).ready(function () {
    populateSelect('quantity', quantities)
    populateSelect('priority', priorities)
    populateSelect('store', stores)
    populateSelect('department', sections)
    loadList();
});
