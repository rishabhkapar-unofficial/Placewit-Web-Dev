$(() => {

    let todoList = $('#todo-list');
    let addButton = $('#add-button');
    let input = $('#input');

    getData();

    addButton.click((event) => {
        event.preventDefault();
        let text = input.val().trim();

        if(text) {
            $.ajax({
                method: 'POST',
                url: 'http://localhost:5555/tasks',
                data: {
                    'text': text
                }
            }).done((res) => {
                todoList.empty();
                for(let i = 0; i < res.length; i++) {
                    let newItem = addItem(res[i]);
                    todoList.append(newItem);
                }
            })
        }
    });

    function addItem(text) {
        let newItem = $(`
        <div class="item">
            <div class="text">${text}</div>
            <div class="buttons">
                <button class="done-button">
                    <i class="fas fa-check"></i>
                </button>
                <button class="edit-button">
                    <i class="far fa-edit"></i>
                </button>
                <button class="remove-button">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        `);
    }

    return newItem;
});