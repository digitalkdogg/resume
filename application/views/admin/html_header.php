<!DOCTYPE html>
<html lang="en-US">
<head><title>Resume - Admin</title>
	<meta charset="UTF-8" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/admin.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/animate.css" />
    <script src="<?php echo base_url(); ?>application/staticresources/jquery-3-2-1.js"></script>

     <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>/application/staticresources/pelleditor/pell.min.css">
    <script src="<?php echo base_url(); ?>/application/staticresources/pelleditor/pell.min.js"></script>    

    <?php var_dump($this->session->userdata('userid')); ?>

    <script>
    var core = {}
    core['baseurl'] = '<?php echo base_url(); ?>';
    core['siteurl'] = '<?php echo current_url(); ?>';
    core['userid'] = '<?php echo $this->session->userdata('userid'); ?>';
    core['username'] = '<?php echo $this->session->userdata('username'); ?>';

	</script>
</head>