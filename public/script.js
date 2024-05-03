// Delete item from to-do list
const todoItems = document.getElementsByClassName("todo-item");

for (let i = 0; i < todoItems.length; i++) {
    const element = todoItems[i];
    element.addEventListener("change", (event) => {
        const id = element.name;
        fetch(`/delete/${id}`, { method: "POST" }).then((res) => {
            location.reload();
        });
    });
}

// Update item from to-do list
const editBtn = document.getElementsByClassName("edit-btn");

for (let i = 0; i < editBtn.length; i++) {
    const element = editBtn[i];
    element.addEventListener("click", (e) => {
        const modalTitle = document.getElementById("modal-title");
        const modalDesc = document.getElementById("modal-desc");
        const modalId = document.getElementById("modal-todo-id");
        const todoCard = document.getElementsByClassName("todo-card");
        const cardTitle = todoCard[i].children[0];
        const cardDesc = todoCard[i].children[1];
        const cardId = todoCard[i].children[0].children[0];

        modalTitle.value = cardTitle.textContent.trim();
        modalDesc.value = cardDesc.textContent.trim();
        modalId.value = cardId.getAttribute("name");
    });
}
