<div class = "col-lg-9">
		<div class = "row">
			<div class = "col-lg-12 meta" id ="the-guts">
				<i class="fas fa-receipt"></i>
				<?php foreach($meta as $key => $value) { 
					foreach($value as $data) { 
						if(strpos($data->Field_Type, 'Textarea') !== false) {
							$this->view('templates/admin/meta_field_input_textarea', array('data'=>$data));
						}
						if(strpos($data->Field_Type, 'Input') !== false) {
							$this->view('templates/admin/meta_field_input_text', array('data'=>$data));
						} 
						if (strpos($data->Field_Type, 'Profile') !== false) {
							$this->view('templates/admin/meta_field_input_file', array('data'=>$data));
						}
						if (strpos($data->Field_Type, 'Select')  !== false) {
							$this->view('templates/admin/meta_field_select', array('data'=>$data));
						}
						if (strpos($data->Field_Type, 'Checkbox') !== false) {
							$this->view('templates/admin/meta_field_checkbox', array('data'=>$data));
						}

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