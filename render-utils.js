

export function renderItem(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    if (item.bought) {
        div.classList.add('bought');
    } else {
        div.classList.remove('bought');
    }
    p.textContent = `${item.quantity} ${item.item}`;
    div.append(p);

    return div;
}

