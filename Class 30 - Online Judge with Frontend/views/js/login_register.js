$(() => {

  const usernameField = $('#username');
  const passwordField = $('#password');
  const loginBtn = $('#login-btn');
  const registerBtn = $('#register-btn');

  loginBtn.click((e) => {
    e.preventDefault();
    $.ajax({
      url: LOGIN_URL,
      method: 'POST',
      data: { username: usernameField.val(), password: passwordField.val() }
    }).done((response) => {
      if(response.success) {
        window.location.href = 'http://localhost:7777/dashboard';
      } else {
        alert(response.message);
      }
    });
  });

  registerBtn.click((e) => {
    e.preventDefault();
    $.ajax({
      url: REGISTER_URL,
      method: 'POST',
      data: { username: usernameField.val(), password: passwordField.val() }
    }).done((response) => {
      alert(response.message);
    });
  })


});