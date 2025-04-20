async function register(username, city, email, password) {
	try {
		const response = await fetch('http://localhost:8080/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, city, email, password }),
		});

		console.log(response)
		if (!response.ok) {
			throw new Error('Неверные данные');
		}

		alert('Регистрация прошла успешно!');
		window.location.href = 'login.html';
	} catch (err) {
		console.error('Ошибка регистрации:', err.message);
		alert('Ошибка регистрации: ' + err.message);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("register-form");

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const username = document.getElementById("username").value;
		const city = document.getElementById("city").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const confirmPassword = document.getElementById("confirm-password").value;

		console.log(username, city, email, password);

		if (!username || !city || !email || !password || !confirmPassword) {
			alert("Пожалуйста, заполните все поля");
			return;
		}

		if (password === confirmPassword) {
			register(username, city, email, password);
		} else {
			alert("Пароли не совпадают");
		}
	});
});



(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

})(jQuery);