Split(['#question', '#editor']);

$(() => {

  const title = $('#title');
  const problemStatement = $('#problem-statement');
  const inputFormat = $('#input-format');
  const outputFormat = $('#output-format');
  const submitBtn = $('#submit');
  const codeArea = $('#code-editor');

  const questionId = window.location.href.split('/').pop();

  $.ajax({
    url: GET_QUESTIONS_URL + '/' + questionId,
    method: 'GET'
  }).done((response) => {
    if(!response.success) {
      alert(response.message);
      return;
    }

    title.html(response.message.title);
    problemStatement.html(response.message.problem_statement);

    if(!response.message.input_format) response.message.input_format = '';
    if(!response.message.output_format) response.message.output_format = '';

    inputFormat.html(response.message.input_format);
    outputFormat.html(response.message.output_format);
  });

  submitBtn.click((e) => {
    e.preventDefault();

    $.ajax({
      url: SUBMIT_URL + '/' + questionId,
      method: 'POST',
      data: { code: codeArea.val() }
    }).done((response) => {
      alert(response.message);
    })
  });

  
});