<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>
			<?php foreach($data as $key=>$item) {
				if ($key=='resumename') {
					echo trim($item, " \t\n\r");
				}
			} ?>	
		</title>
		<meta charset="UTF-8" />
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/font-awesome/css/font-awesome.min.css" />
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/resume.css" />
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/animate.css" />
		<script type="text/javascript" src="<?php echo base_url(); ?>application/staticresources/jquery-3-2-1.js"></script>
	</head>