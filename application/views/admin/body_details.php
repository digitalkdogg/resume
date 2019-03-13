<div class = "col-lg-9">
		<div class = "row">
			<div class = "col-lg-12 meta" id ="the-guts">
				<i class="fas fa-receipt"></i>
				<?php foreach($meta as $key => $value) { 
					foreach($value as $data) { ?>
						
							<div class = "row ele">
								<div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
									<?php echo $data->Field_Label; ?>
								</div>
								<div class = "col-lg-5 field">
								<input type = "text" id = "<?php echo $data->Ele_Id; ?>" class = "data <?php echo $data->Class_List; ?>" value = "<?php echo $data->Field_Value; ?>" data-fieldid = "<?php echo $data->Section_Details_Id; ?>" data-labelname = "<?php echo $data->Field_Label; ?>" />
								</div>
							</div>
						<?php 
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