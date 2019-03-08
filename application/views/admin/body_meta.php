	<div class = "col-lg-9">
		<div class = "row">
			<div class = "col-lg-12 meta" id ="the-guts">
				<?php foreach($meta as $key => $value) { 
					foreach($value as $data) { ?>
						<?php if ($data->type == 'textinput') { ?>
							<div class = "row ele">
								<div class = "col-lg-2 lable" data-labelid = "<?php echo $data->fieldid; ?>">
									<?php echo $data->Name; ?> :
								</div>
								<div class = "col-lg-5 field">
									<input type = "text" id = "<?php echo $data->eleid; ?>" class = "data <?php echo $data->classlist; ?>" value = "<?php echo $data->FieldValue; ?>" data-fieldid = "<?php echo $data->metaid; ?>" data-labelname ="<?php echo $data->Name; ?>" />
								</div>
							</div>
						<?php }
					}
				} ?>
				<div class = "col-lg-2 offset-lg-4">
					
				</div>
				<div class = "col-lg-7">
					<button id = "save" data-obj = "meta" data-table="Meta/save_meta" class = "btn btn-primary" disabled = "disabled">
						<i class="fa fa-spinner fa-spin hidden"></i>
						<span class = "txt">Save</span>
					</button>
					<button id = "reset" data-obj = "meta" data-table="Meta/save_meta" class = "btn btn-primary">
						<i class="fa fa-spinner fa-spin hidden"></i>
						<span class = "txt">Reset</span>
					</button>
					<span id = "status" class = "hidden"></span>
				</div>
			</div>
		</div>
	</div>
</div> <!-- end row -->