<body data-resumeid = "<?php foreach($data as $key=>$item) {if ($key=="resumeid") {echo $item;} } ?>">
<div class = "container" id = "container">
<div class = "row" id = "header-container">
	<div class = "col-xs-12 col-sm-1 col-md-1 col-lg-1" id = "social-container">
		<?php foreach($data as $key=>$item) {
			if ($key=='social') {
				foreach ($item as $subkey=>$social) {
					if ($social->Field_Value != "") { ?>
					<div class = "social-wrap" data-label="<?php echo $social->Ele_Id; ?>">
						<a class = "sociallink <?php echo $social->Ele_Id; ?>" href = "<?php echo $social->Field_Value; ?>" data-type = "<?php echo $social->Ele_Id; ?>" target="_blank">
							<span class = "fa fa-<?php echo $social->Ele_Id; ?>"></span>
						</a>
					</div>
		<?php } } } } ?>
	</div>
	<div class = "col-xs-12 col-sm-9 col-md-9 col-lg-9" id = "contact-container">
		<div class="col-xs-12">
			<?php  foreach($data as $key=>$item) {
				if ($key=='contactinfo') {
					foreach ($item as $subkey=>$contactinfo) {
						if ($contactinfo->Field_Value != "") { ?>
							<?php if (strpos($contactinfo->Field_Type, 'H2')!==false) { ?>
								<h2>
									<ul>
										<li data-type = "<?php echo $contactinfo->Field_Type; ?>" data-ele="<?php echo $contactinfo->Ele_Id; ?>">
											<?php echo $contactinfo->Field_Value; ?>
										</li>
									</ul>
								</h2>
							<?php }
							if (strpos($contactinfo->Field_Type, 'Text') !== false) { ?>
								<ul>
									<li data-type = "<?php echo $contactinfo->Field_Type; ?>" data-ele="<?php echo $contactinfo->Ele_Id; ?>">
										<?php echo $contactinfo->Field_Value; ?>
									</li>
								</ul>
						<?php } 
							if (strpos($contactinfo->Field_Type, 'Href') !== false) { ?>
								<a href = "<?php echo $contactinfo->Field_Value; ?>">
									<ul><li data-type = "<?php echo $contactinfo->Field_Type; ?>" data-ele="<?php echo $contactinfo->Ele_Id; ?>">
										<?php echo $contactinfo->Field_Value; ?>
									</li></ul>
								</a>
						<?php
							}
						?>
							
				<?php  } } } } ?>
        </div>
		
	</div>
	<div class = "col-xs-2 col-sm-2 col-md-2 col-lg-2" id = "photo-container">
		
	</div>