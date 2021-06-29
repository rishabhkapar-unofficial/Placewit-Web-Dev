$(() => {

  const title = $('#title');
  const problem_statement = $('#problem_statement');
  const input_format = $('#input_format');
  const output_format = $('#output_format');
  const addBtn = $('#add_btn');

  addBtn.click((e) => {
    e.preventDefault();
    $.ajax({
      url: MY_QUESTIONS_URL,
      method: 'POST',
      data: { title: title.val(), problem_statement: problem_statement.val(), input_format: input_format.val(), output_format: output_format.val() }
    }).done((response) => {
      if(!response.success) {
        alert(response.message);
        return;
      }

      alert('Question was successfully added.');
      title.val('');
      problem_statement.val('');
      input_format.val('');
      output_format.val('');
    });
  });

});