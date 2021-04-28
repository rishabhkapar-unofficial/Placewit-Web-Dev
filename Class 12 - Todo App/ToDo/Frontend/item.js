function createItem(task, removeCallBack, editCallBack, doneCallBack) {
    let newItem = $(`<div class="item"></div>`);
    if(task.done === true)
        newItem.addClass('done');
    newItem.append(createTextField(task.title));
    newItem.append(createButtons(task, removeCallBack, editCallBack, doneCallBack));

    return newItem;
}

function createTextField(title) {
    let textField = $(`<div class="text">${title}</div>`);
    return textField;
}

function createButtons(task, removeCallBack, editCallBack, doneCallBack) {
    let buttons = $('<div class="buttons"></div>');
    buttons.append(createDoneButton(task, doneCallBack));
    buttons.append(createEditButton(task._id, editCallBack));
    buttons.append(createRemoveButton(task._id, removeCallBack));

    return buttons;
}

function createDoneButton(task, callback) {
    let button = $(`
    <button class="done-button">
        <i class="fas fa-check"></i>
    </button>
    `);
    
    button.click((event) => {
        let done = true;
        if(task.done === true)
            done = false;

        callback(event, task._id, task.title, done);
    })
    return button;
}

function createEditButton(id, callback) {
    let button = $(`
    <button class="edit-button">
        <i class="far fa-edit"></i>
    </button>
    `);

    button.click((event) => {
        callback(event, id);
    });

    return button;
}

function createRemoveButton(id, callback) {
    let button = $(`
    <button class="remove-button">
        <i class="fas fa-trash"></i>
    </button>
    `);

    button.click((event) => {
        callback(event, id);
    });

    return button;
}

function createEditItemForm(id, callback) {
    let form = $('<form class="edit-item"></form>');
    let input = createTextInputField();
    let button = createDoneButton();

    form.append(input);
    form.append(button);

    button.click((event) => {
        let text = input.val().trim();
        callback(event, id, text);
    })

    return form;
}

function createTextInputField() {
    let input = $('<input type="text" placeholder="Edit text...">');
    return input;
}