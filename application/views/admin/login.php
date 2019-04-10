<div id = "login">
	
	<div class = "row">
		<div class = "col-lg-offset-4 col-lg-1">Username : </div>
		<div class = "col-lg-2"><input type = "text" id = "username" class = "form-control data" /></div>
	</div>

	<div class = "row">
		<div class = "col-lg-offset-4 col-lg-1">Password : </div>
		<div class = "col-lg-2"><input type = "password" id = "password" class = "form-control data" /></div>
	</div>

	<div class = "row">
		<div class = "col-lg-offset-5 col-lg-3">
			<button class = "btn btn-primary" id = "submit">
				<i class="fa fa-spinner fa-spin hidden"></i>
				<span class = "txt">Login</span>
			</button>
			<button class = "btn btn-primary" id = "reset">
				<i class="fa fa-spinner fa-spin hidden"></i>
				<span class = "txt">Reset</span>
			</button>
		</div>
	</div>
	<div class = "row">
		<div class = "col-lg-offset-5 col-lg-2">
			<span id = "status"></span>
		</div>
	</div>
</div>

<script src = "<?php echo base_url(); ?>application/staticresources/kevcrypt.js" ></script>
<script src = "<?php echo base_url(); ?>application/staticresources/login.js" ></script>
<script>
	var admin = {
		'core': {
			'base_url': '<?php echo base_url(); ?>'
		}
	}
</script>