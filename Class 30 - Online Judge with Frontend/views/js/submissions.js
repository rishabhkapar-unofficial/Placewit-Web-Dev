$(() => {

  $.ajax({
    url: SUBMISSION_URL,
    method: 'GET'
  }).done((response) => {
    if(!response.success) {
      alert(response.message);
      return;
    }

    const questionList = $('#question-list');
    questionList.empty();

    const submissions = response.message;
    for(let i = 0; i < submissions.length; i++) {
      questionList.append(createCard(submissions[i].question_id, submissions[i]._id));
    }
  });

});

function createCard(title, id) {

  let card = $('<div class="question-card"></div>');
  let titleField = $(`<h2 class="question-title">${title}</h2>`);
  let showBtn = $('<button type="submit">Show</button>');
  
  showBtn.click((e) => {
    e.preventDefault();
    $.ajax({
      url: SUBMISSION_URL + '/' + id,
      method: 'GET'
    }).done((response) => {
      if(!response.success) {
        alert(response.message);
        return;
      }

      alert(response.message.verdict);
    });
  });
    
  card.append(titleField);
  card.append(showBtn);
  
  return card;
}