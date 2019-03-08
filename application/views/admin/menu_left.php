<div id = "left_menu">
	<div class = "row">
		<?php foreach($site as $key => $value) { 
			foreach($value as $data) { ?>
				<a href = "<?php echo $data->Url; ?>">
					<div class = "col-lg-12 menu-item">
						<?php echo $data->Value; ?>
					</div>
				</a>
			<?php
			}
		} ?>
	</div>
</div>
</div> <!--end div col-lg-3 -->