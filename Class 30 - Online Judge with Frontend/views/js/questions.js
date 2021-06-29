$(() => {

  loadQuestions();

  $('#addquestion').click((e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:7777/addquestion';
  })

})

function loadQuestions() {
  $.ajax({
    url: USER_URL,
    method: 'GET'
  }).done((response) => {
    if(!response.success) {
      alert(response.message);
      return;
    }

    const questionList = $('#question-list');
    questionList.empty();
    const questions = response.message.questions;
    
    for(let i = 0; i < questions.length; i++) {
      questionList.append(createCard(questions[i].title, questions[i]._id));
    }
  });
}

function createCard(title, id) {

  let card = $('<div class="question-card"></div>');
  let titleField = $(`<h2 class="question-title">${title}</h2>`);
  let buttons = $('<div class="buttons"></div>');
  let removeBtn = $('<button type="submit">Remove</button>');
  let addTestcaseBtn = $('<button type="submit">Add Testcase</button>');
  let editBtn = $('<button type="submit">Edit</button>');
  
  removeBtn.click((e) => {
    e.preventDefault();

    $.ajax({
      url: MY_QUESTIONS_URL + '/' + id,
      method: 'DELETE'
    }).done((response) => {
      if(!response.success) {
        alert(response.message);
        return;
      }

      loadQuestions();
    });
  });

  addTestcaseBtn.click((e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:7777/addtestcase/' + id;
  });
    
  card.append(titleField);
  buttons.append(removeBtn);
  buttons.append(addTestcaseBtn);
  buttons.append(editBtn);
  card.append(buttons);
  
  return card;
}