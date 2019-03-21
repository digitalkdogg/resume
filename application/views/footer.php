</div>
<script src="<?php echo base_url(); ?>application/staticresources/bootstrap/js/bootstrap.min.js" ></script>
<script src="<?php echo base_url(); ?>application/staticresources/angular_1.6.4.js"></script>
<script src="<?php echo base_url(); ?>application/staticresources/resume.js"></script>


<?php foreach ($query as $row) {
	if ($row->Field_Type== 'SelectColor') {?>
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/thememod/<?php echo $row->Field_Value; ?>.css" /> 
<?php 	} 
} ?>
</body>
</html>