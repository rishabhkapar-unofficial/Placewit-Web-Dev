$(() => {

  $.ajax({
    url: GET_QUESTIONS_URL,
    method: 'GET'
  }).done((response) => {
    if(!response.success) {
      alert(response.message);
      return;
    }
    const questionList = $('#question-list');
    questionList.empty();
    const questions = response.message;
  
    for(let i = 0; i < questions.length; i++) {
      questionList.append(createCard(questions[i].title, questions[i]._id));
    }
  });

});


function createCard(title, id) {

  let card = $('<div class="question-card"></div>');
  let titleField = $(`<h2 class="question-title">${title}</h2>`);
  let solveBtn = $('<button type="submit">Solve</button>');
  
  solveBtn.click((e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:7777/solve/' + id;
  });
    
  card.append(titleField);
  card.append(solveBtn);
  
  return card;
}