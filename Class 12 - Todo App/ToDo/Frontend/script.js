$(() => {

    let todoList = $('#todo-list');
    let addButton = $('#add-button');
    let input = $('#input');
    let isEdit = false;
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
            }).done(populateToDoList);
        }
    });

    
    function editOperation(event, id) {
        event.preventDefault();

        if(isEdit === true)
            return;

        isEdit = true;
        let element = $(event.target).parent().closest('.item');
        
        element.replaceWith(createEditItemForm(id, updateTextOperation));
    }

    function updateTextOperation(event, id, text) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:5555/tasks/'+id,
            method: 'PUT',
            data: { text: text }
        }).done(() => { 

            getData();
        });
    }

    function updateDoneOperation(event, id, text, done) {
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:5555/tasks/'+id,
            method: 'PUT',
            data: { text: text, done: done }
        }).done(() => { 

            getData();
        });
    }

    function removeOperation(event, id) {
        event.preventDefault();

        $.ajax({
            url: 'http:localhost:5555/tasks/' + id,
            method: 'DELETE'
        }).done(() => {
            console.log("DElete");
            getData();
        });
    }

    function getData() {
        isEdit = false;
        $.ajax({
            url: 'http://localhost:5555/todos',
            method: 'GET'
        }).done(populateToDoList);
    }

    function populateToDoList(res) {
        todoList.empty();
        let newarray = [];
        for(let i = 0; i < res.length; i++) {
            if(res[i].done === false)
                newarray.push(res[i]);
        }

        for(let i = 0; i < res.length; i++) {
            if(res[i].done === true)
                newarray.push(res[i]);
        }


        for(let i = 0; i < newarray.length; i++) {
            let newItem = createItem(newarray[i], removeOperation, editOperation, updateDoneOperation);
            todoList.append(newItem);
        }
    }
});