	<div class = "col-lg-12">
		<div class = "row">
			<div class = "col-lg-12" id ="the-guts">
					<i class="fas fa-receipt"></i>
				<?php foreach($resumes as $key => $value) { 
					foreach($value as $data) { ?>
						<div class = "resume-item col-lg-3" data-id = "<?php echo $data->Resume_Number; ?>">
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

					<div class = "resume-item resume-item-new col-lg-3">
							
							<div class = "resume-desc">
								Add New Resume <br />
								<span class = "super-large-plus">+</span>
							</div>
						</div>
				
			</div>
		</div>
	</div>
</div> <!-- end row -->