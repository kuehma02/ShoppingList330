'use strict';
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
            fn(scope, msg)
        }
    }
}


class ShoppingList extends Subject {
    constructor() {
        super()
        this.newItems = []
        this.oldItems = [];
    }

    addItem(it) {
        this.newItems.push(it)
        this.publish('newitem', this)
    }

    cleanList(){
        this.oldItems = this.newItems
        this.newItems = []
        for (let item in this.oldItems){
            if (this.oldItems[item].purchased != true){
                this.newItems.push(this.oldItems[item]);
            }
        }
    }

    emptyList() {
        window.localStorage.clear();
        this.newItems = []
        
    }

    saveList(){
        window.localStorage.clear();
        let list = window.localStorage.getItem('shoppingList');
        list = list?JSON.parse(list): []
        for(let item in this.newItems){
            let newShoppingListItem = {}
            for(let element in this.newItems[item]){
                newShoppingListItem[element]= (this.newItems[item])[element]
            }
            list.push(newShoppingListItem);
        }
        window.localStorage.setItem('shoppingList', JSON.stringify(list));
    }

}
