	<div class = "col-lg-9">
		<div class = "row">
			<div class = "col-lg-12" id ="the-guts">
				<?php foreach($resumes as $key => $value) { 
					foreach($value as $data) { ?>
						<div class = "resume-item col-lg-3" data-id = "<?php echo $data->id; ?>">
							<div class = "resume-title">
								<?php echo $data->Name; ?>
							</div>
							<div class = "resume-desc">
								<?php echo $data->Description; ?>
							</div>
						</div>
					<?php
					}
				} ?>
				
			</div>
		</div>
	</div>
</div> <!-- end row -->