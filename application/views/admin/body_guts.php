	<div class = "col-lg-9">
		<div class = "row">
			<div class = "col-lg-12" id ="the-guts">
				
				<?php foreach($meta as $key => $value) { 
					foreach($value as $data) {
						echo $data->ResumeName;
					}
				} ?>
				
			</div>
		</div>
	</div>
</div> <!-- end row -->