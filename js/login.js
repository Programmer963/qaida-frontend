async function login(email, password) {
	try {
	const response = await fetch('http://localhost:8080/api/auth/login', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		throw new Error('Неверный логин или пароль');
	}

	const data = await response.json();

	localStorage.setItem('jwt', data.token);
	localStorage.setItem('city', data.city);
	localStorage.setItem('userId', data.userId);

	window.location.href = 'index.html';
	} catch (err) {
	console.error('Ошибка входа:', err.message);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("login-form");

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		login(email, password);
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
