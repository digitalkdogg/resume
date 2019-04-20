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
	
		
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/print.css" />
		<link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/animate.css" />
		<script type="text/javascript" src="<?php echo base_url(); ?>application/staticresources/jquery-3-2-1.js"></script> 
	</head>
<body data-resumeid = "<?php foreach($data as $key=>$item) {if ($key=="resumeid") {echo $item;} } ?>">
<div class = "container" id = "container">
<div class = "row" id = "header-container">
	<div class = "col-xs-12 col-sm-1 col-md-1 col-lg-1 text-align-center" id = "social-container">
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
	<div class = "col-xs-12 col-sm-9 col-md-9 col-lg-9 text-align-center" id = "contact-container" style = "height: 50px;">
		<div class="col-xs-12">
			<?php  foreach($data as $key=>$item) {
				if ($key=='contactinfo') {
					foreach ($item as $subkey=>$contactinfo) {
						if ($contactinfo->Field_Value != "") { ?>
							<?php if (strpos($contactinfo->Field_Type, 'H2')!==false) { ?>
								<h2 data-type = "<?php echo $contactinfo->Field_Type; ?>" data-ele="<?php echo $contactinfo->Ele_Id; ?>" class = "text-align-center">
									<?php echo $contactinfo->Field_Value; ?>
								</h2>
							<?php }
							if (strpos($contactinfo->Field_Type, 'Text') !== false) { ?>
								<span class = "icon-wrapper">
									<img src = "<?php echo base_url() . 'application/staticresources/img/' . $contactinfo->Ele_Id . '.png'; ?>" class = "icon" />
								</span>
								<span class = "text" data-type = "<?php echo $contactinfo->Field_Type; ?>" data-ele="<?php echo $contactinfo->Ele_Id; ?>">
										<?php echo trim($contactinfo->Field_Value, " \t\n\r "); ?>
								</span>
								
						<?php } 
							if (strpos($contactinfo->Field_Type, 'Href') !== false) { ?>
								<a href = "<?php echo $contactinfo->Field_Value; ?>">
									<span class = "icon-wrapper">
										<img src = "<?php echo base_url() . 'application/staticresources/img/' . $contactinfo->Ele_Id . '.png'; ?>" class = "icon" />
									</span>
									<span class = "text" data-type = "<?php echo $contactinfo->Field_Type; ?>" data-ele="<?php echo $contactinfo->Ele_Id; ?>">
										<?php echo $contactinfo->Field_Value; ?>
									</span>
								</a>
						<?php
							}
						?>
							
				<?php  } } } } ?>
        </div>
		
	</div>
	<div class = "col-xs-2 col-sm-2 col-md-2 col-lg-2" id = "photo-container" style = "height: 50px; display:none;">
		
	</div>

</div>
	<div class = "row">
		<div class="col-lg-12 animated flipInY" id = "body-container">

			<div id = "body-header"></div>
			<div id = "body-content">
				<?php 
				foreach($data as $key=>$item) {
					if ($key == 'about') { ?>
						<br />
						<div id = "about" class = "section"><div class="u-green" ><div class = "bg-green width-25">Summary :</div></div>
						<?php foreach($item as $subkey=>$about) {
							if ($about->Ele_Id=='objective'){ ?>
								<div>
								<span class = "col-lg-3"><b>Objective :</b></span>
								<span class = "col-lg-9"><?php echo $about->Field_Value; ?></span>
								</div>
						<?php
							} else if ($about->Ele_Id == 'career-highlights') { ?>
								<div id = "career-hightlights">
								<span class = "col-lg-12" style = "background:red;"><?php echo $about->Field_Value; ?></span>
								</div>
						<?php
							}
						} ?>
					</div>
				<?php					
					}

				if ($key == 'experience') { ?>
						<p></p>
						<div id = "experience" ><div class="u-green"><div class = "bg-green width-25">Experience :</div></div>
						<?php 
							foreach ($item as $subkey => $experience) { ?>
								<div id = "exp-wrapper">
									<?php 
										foreach ($experience as $rec) {
											if ($rec->Field_Label=='Company') { ?>
												<span class = "Company"><?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Field_Label=='Job Title') { ?>
												<span class = "job-title"> - <?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Field_Label=='Start Date') { ?>
												<br />
												<span class = "start-date"><?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Field_Label=='End Date') { ?>
												<span class = "end-date"> - <?php echo $rec->Field_Value; ?></span>		
											<?php
											}

										}
									?>
								</div>
						<?php									
							}
						?>
					</div>
				<?php					
					}

					if ($key == 'skills') { ?>
						<p></p>
						<div id = "Skills" ><div class="u-green"><div class = "bg-green width-25">Skills :</div></div>
						
						<?php 
							foreach ($item as $subkey => $skill) { ?>
								<div id = "skill-wrapper" style = "width:<?php echo $data['skillsyears'][$subkey] * 10 ?>%;">
									<?php 
										foreach ($skill as $rec) {
											if ($rec->Ele_Id=='skills-title') { ?>
												<span class = "skill-title"><?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Ele_Id=='skills-years') { ?>
												<span class = "skill-years"> - <?php echo $rec->Field_Value; ?> Years</span>		
											<?php
											}

										}
									?>
								</div>
						<?php									
							}
						?>
					</div>
				<?php					
					}

					if ($key == 'education') { ?>
						<p></p>
						<div id = "education" class = "section"><div class="u-green"><div class = "bg-green width-25">Education :</div></div>
						<?php 
							foreach ($item as $subkey => $education) { ?>
								<div id = "edu-wrapper">
									<?php 
										foreach ($education as $rec) {
											if ($rec->Field_Label=='School') { ?>
												<span class = "school"><?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Field_Label=='Degree') { ?>
												<span class = "degree"> - <?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Field_Label=='Start Date') { ?>
												<br />
												<span class = "start-date"><?php echo $rec->Field_Value; ?></span>		
											<?php
											}
											if ($rec->Field_Label=='End Date') { ?>
												<span class = "end-date"> - <?php echo $rec->Field_Value; ?></span>		
											<?php
											}

										}
									?>
								</div>
						<?php									
							}
						?>
					</div>
				<?php					
					}


				}

				?>
			</div>

			
		</div>		

	</div>
</div>
</body>
</html>