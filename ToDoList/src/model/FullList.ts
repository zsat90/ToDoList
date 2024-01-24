import ListItem from "./ListItem";

// Interface defining the structure of a list
interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: ListItem): void;
    removeItem(id: string): void;
}

// Implementation of the List interface in the FullList class
export default class FullList implements List {
    
    static instance: FullList = new FullList();

    // Private constructor with an optional initial list
    private constructor(private _list: ListItem[] = []) {}

    // Getter for the list property
    get list(): ListItem[] {
        return this._list;
    }

    // Method to load the list from localStorage
    load(): void {
        // Retrieve the stored list from localStorage
        const storedList: string | null = localStorage.getItem("myList");

        // If no valid stored list, return
        if (typeof storedList !== "string") return;

        // Parse the stored list into an array of objects
        const parsedList: { _id: string; _item: string; _checked: boolean }[] = JSON.parse(storedList);

        // Iterate over the parsed list and add each item to the FullList instance
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newListItem);
        });
    }

    // Method to save the current list to localStorage
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    // Method to clear the list and save it to localStorage
    clearList(): void {
        this._list = [];
        this.save();
    }

    // Method to add an item to the list and save it to localStorage
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    // Method to remove an item from the list by ID and save the updated list to localStorage
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}
