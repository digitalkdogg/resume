$(document).ready(function () {

	$('#login input.data').keypress(function () {
		var $this = $('#login button#submit');
		$($this).find('.txt').text('Login');
		$('#login #status').empty();
	})

	$('#login input.data').click(function () {
		var $this = $('#login button#submit');
		$($this).find('.txt').text('Login');
		$('#login #status').empty();
	})

	$('#login button#submit').click(function () {

		var username = $('#username').val();
		var password = $('#password').val();
		var $this = $(this);
		$($this).find('.fa-spin').removeClass('hidden');
		$($this).find('.txt').text('Authenticating');

		$.ajax({
			'url': admin.core.baseurl + 'index.php/admin/dologin',
			'data': {'username': username, 'password': kevcrypt(password)},
			'type': 'POST',
			'complete': function(data) {
				if (data.responseJSON.msg == 'login successful') {
					$($this).find('.txt').text('Redirecting');
					window.location = admin.core.baseurl + 'index.php/admin';
				} else {
					$($this).find('.txt').text('Error');
					$($this).find('.fa-spin').addClass('hidden');
					$('#login span#status').html('<span class = "error">' + data.responseJSON.msg + '</span>');
				}
			}
		})
	})

	$('#login button#reset').click(function () {
		$('#login input').each(function () {
			$(this).val('');
		})

		$('#status').empty();
		var $this = $('#login button#submit');
		$($this).find('.txt').text('Login');
		$($this).find('.fa-spin').addClass('hidden');
	})
})