// the lootCollection array that keeps track of all objects in the loot collection
let lootCollection = [];

// get the references to the elements that the program will interact with or use data from
let nameInput = document.getElementById('lootName');
let valueInput = document.getElementById('lootValue');
let addLootBtn = document.getElementById('addLootBtn');
let messages = document.getElementById('messages');
let lootList = document.getElementById('lootList');
let totalValue = document.getElementById('totalValue');

// function to set element's text content to certain message, variable 
function showMessage(text) {
    messages.textContent = text;
}

// function to display the loot collection array in descending oder by value and show the total value of all loot collection items
function renderLoot() {

    lootList.innerHTML = '';
    for (let i = 0; i < lootCollection.length; i++) {
        let item = lootCollection[i];
        let itemLine = document.createElement('p');
        itemLine.className = 'lootItem';
        let span = document.createElement('span');
        span.textContent = item.value.toFixed(2);
        itemLine.textContent = `${i + 1}. ${item.name} `;
        itemLine.appendChild(span);
        lootList.appendChild(itemLine);
    }

    // calculate total using a for loop adding all elements' value to the variable total
    let total = 0;
    for (let i = 0; i < lootCollection.length; i++) {
        total += lootCollection[i].value; // dot notation
    }
    totalValue.textContent = `Total loot value: ${total.toFixed(2)}`;
}

// function to output the items in loot collection array formated with the first letter of the name capitalized
function toUpper(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// function to respond to the click of button and return all the information to the html page
addLootBtn.addEventListener('click', function() {

    let itemName = nameInput.value.trim();
    let itemValue = parseFloat(valueInput.value);

    // check if the name inside input box is empty
    if (itemName === '') {
        showMessage('Name cannot be empty.');
        return;
    }

    // check if the value is a number and is greater than 0
    if (isNaN(itemValue) || itemValue <= 0) {
        showMessage('Value must be a number greater than 0.');
        return;
    }

    // using boolean check if the name already exists in the loot collection
    let isDuplicate = false;
    for (let i = 0; i < lootCollection.length; i++) {
        if (lootCollection[i].name.toLowerCase() === itemName.toLowerCase()) {
            isDuplicate = true;
            break;
        }
    }
    if (isDuplicate) {
        showMessage('There is already an item with that name.');
        return;
    }

    // create object using itemName and itemValue as input for its properties and push it into the loot collection array
    let lootItem = { name: toUpper(itemName), value: itemValue };
    
    // checking breakpoint before adding the new loot item to the collection, updating interface and sorting elements in the array
    debugger;

    lootCollection.push(lootItem);

    // one more breakpoint, after the new item is added and before the collection is sorted.
    debugger;

    // insertion sort to order loot by value in descending order from highest to lowest
    for (let i = 1; i < lootCollection.length; i++) {
        let key = lootCollection[i];
        let j = i - 1;
        while (j >= 0 && lootCollection[j].value < key.value) {
            lootCollection[j + 1] = lootCollection[j];
            j--;
        }
        lootCollection[j + 1] = key;
    }

    // if everthing is allright and function made to this point display nothing in the #message p,
    // reset the contents of the input boxes and display the loot collection array with loot items in descending order by value and the total value
    showMessage('');
    nameInput.value = '';
    valueInput.value = '';
    renderLoot();
});


/*
Debugging Reflection:

To use website:
 Open DevTools F12
 Enter a name and value for an item and then click "Add Loot"
 Execution will pause at the breakpoint before lootCollection.push()
 Inspect the lootItem object as it gets created using input values
 Step over to see when it gets added to the lootCollection array
 Step into renderLoot() to see how the interface updates in response to the new state

Before editing the array:
 lootCollection array contains only previous items
 lootItem object is created but NOT yet in the array
 HTML display has not changed yet

After stepping over lootCollection.push():
 now new lootItem object is added to the lootCollection array
 array length increased by 1
 HTML still shows old list as the interface hasn't updated yet

After renderLoot() executes:
 DOM is rebuilt: new list item appears on the page
 total value recalculates and displays
 input fields are cleared

Important detail:
 array contents change happens at lootCollection.push(lootItem) (line 83).
 interface update happens at the very end, on lines 101-104.
 array data change and UI update happens separately and in order from first to last respectively.
*/

