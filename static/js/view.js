class ShoppingView {
    constructor(model) {
        // The bind() method creates a new function that, when called, has its this keyword set to the provided value.
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(shoppingList, msg) {
        let tbl = document.getElementById("shoppinglist");
        tbl.innerHTML = ""
        for (let item of shoppingList.newItems) {
            this.addRow(item, tbl);
        }
    }

    addRow(item, parent) {
        let row = document.createElement("tr");
        row.classList.add(item.priority);
        row.onclick = function() {
            let cbCell = row.cells[0].firstChild;
            cbCell.click();
        }
        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = "checkbox";
        cb.classList.add("form-control");
        cb.onclick = function(event) {
            if (item.purchased == false){
                item.purchased = true;
                row.classList.add('strike');
            }else {
                item.purchased = false;
                row.classList.remove('strike');
            }
            event.stopPropagation();
        }
        if (item.purchased == true){
            item.purchased = false;
            cb.click()
        }
        let checkCell = document.createElement('td');
        checkCell.appendChild(cb);
        
        row.appendChild(checkCell);

        for (let val of ['name', 'quantity', 'store', 'department', 'price']) {
            let td = document.createElement("td");
            td.innerHTML = item[val];
            row.appendChild(td);
        }
        parent.appendChild(row);
    }
}
