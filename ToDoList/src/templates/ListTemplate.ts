import FullList from "../model/FullList";

// Interface defining the structure of a DOM list
interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fullList: FullList): void;
}

// Implementation of the DOMList interface in the ListTemplate class
export default class ListTemplate implements DOMList {
    ul: HTMLUListElement;

    
    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        // Initialization of the ul property by getting the HTML element with the id 'listItems'
        this.ul = document.getElementById('listItems') as HTMLUListElement;
    }

    // Method to clear the list in the DOM
    clear(): void {
        this.ul.innerHTML = '';
    }

    // Method to render the list in the DOM based on a FullList instance
    render(fullList: FullList): void {
        // Clear the existing list in the DOM
        this.clear();

        // Iterate over the items in the FullList and create corresponding DOM elements
        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement('input') as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;
            li.append(check);

            // Event listener for the 'change' event on the checkbox
            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
            });

            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const button = document.createElement('button') as HTMLButtonElement;
            button.className = 'button';
            button.textContent = 'X';
            li.append(button);

            // Event listener for the 'click' event on the button
            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                // Re-render the list after removing an item
                this.render(fullList);
            });

            // Append the created list item to the ul element in the DOM
            this.ul.append(li);
        });
    }
}
