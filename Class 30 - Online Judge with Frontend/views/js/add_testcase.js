$(() => {

  const addBtn = $('#add-btn');

  addBtn.click((e) => {
    e.preventDefault();

    const input = $('#input');
    const output = $('#output');

    const questionId = window.location.href.split('/').pop();

    $.ajax({
      url: TESTCASES_URL + '/' + questionId,
      method: 'POST',
      data: { input: input.val(), output: output.val() }
    }).done((response) => {
      if(!response.success) {
        alert(response.message);
        return;
      }

      alert('Testcase was added successfully.');
    });


  
  });


});