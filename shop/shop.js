import { boughtItem, checkAuth, deleteAllItems, getShoppingList, logout, newItem, unBuyItem } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const formEl = document.getElementById('shoppingList-form');

const shoppingListEL = document.querySelector('.shopping-Lists');
const deleteAllBtn = document.getElementById('deleteAll');


deleteAllBtn.addEventListener('click', async() => {
    await deleteAllItems();
    displayShoppingListItems();
});

formEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(formEl);
    const quantity = data.get('quantity');
    const item = data.get('list');

    await newItem(quantity, item);
    displayShoppingListItems();
    formEl.reset();

});


window.addEventListener('load', async() => {
    // const items = await getShoppingList()
    displayShoppingListItems();


});


async function displayShoppingListItems() {
    const items = await getShoppingList();

    shoppingListEL.textContent = '';
    for (const item of items) {
        const newItem = renderItem(item);
     
        newItem.addEventListener('click', async() => {
            await boughtItem(item.id);
                // console.log("🚀 ~ file: shop.js ~ line 38 ~ newItem.addEventListener ~ newItem", newItem)
            displayShoppingListItems();

            if (item.bought) {
                await unBuyItem(item.id);
                // console.log("🚀 ~ file: shop.js ~ line 38 ~ newItem.addEventListener ~ newItem", newItem)
                displayShoppingListItems();
            }
        });
            
        
        shoppingListEL.append(newItem);
    }
}

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
