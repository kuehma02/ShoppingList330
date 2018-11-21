class Item {
    constructor(name, quantity, priority, store, department, price, purchased = false) {
        this.name = name;
        this.quantity = quantity;
        this.priority = priority;
        this.store = store;
        this.department = department;
        this.price = price;

        this._purchased = purchased;
    }

    get purchased() {
        return this._purchased;
    }

    set purchased(nv) {
        this._purchased = nv;
    }
}

class Subject {
    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
            this.handlers.push(fn);
        }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg);
        }
    }
}


class ShoppingList extends Subject {
    constructor() {
        super();
        this.newItems = [];
        this.oldItems = [];
    }

    addItem(it) {
        this.newItems.push(it);
        this.publish('newitem', this);
    }

    cleanList(){
        this.oldItems = this.newItems;
        this.newItems = [];
        for (let item in this.oldItems){
            if (this.oldItems[item].purchased != true){
                this.newItems.push(this.oldItems[item]);
            }
        }
    }

    emptyList() {
        window.localStorage.clear();
        this.newItems = [];
        
    }

    saveList(){ 
        var table = document.getElementById('shoppinglist');
        var data = [];

        var thead = document.getElementById('headers');
        var headers = [];
        for (var i=0; i<thead.rows[0].cells.length; i++) {
            headers[i] = thead.rows[0].cells[i].innerHTML.toLowerCase(); //.replace(/ /gi,'');
        }

        for (var j=0; j<table.rows.length; j++) {
            var tableRow = table.rows[j];
            var rowData = {};
            for (var k=0; k<tableRow.cells.length; k++) {
                rowData[ headers[k] ] = tableRow.cells[k].innerHTML;
            }
            data.push(rowData);
        }       
        return data;
    }
}
