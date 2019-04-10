<?php if ($data->Sister_Field == 'is-sister') { ?>
	<div id = "sister-wrapper" data-sisterid = "<?php echo $data->Sister_Field; ?>" data-fieldid = "<?php echo $data->Section_Details_Id;?>" data-value = "<?php echo $data->Field_Value; ?>" class = "wrapper">
		<?php
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
			if (strpos($data->Field_Type, 'wysiwyg') !== false) {
				$this->view('templates/admin/meta_field_wysiwyg', array('data'=>$data));
			}
			if (strpos($data->Field_Type, 'button') !== false) {
				$this->view('templates/admin/meta_button', array('data'=>$data));
			}
		?>
	</div>
<?php
} else {
	if ($data->Sister_Field != 'na') {
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
		if (strpos($data->Field_Type, 'wysiwyg') !== false) {
			$this->view('templates/admin/meta_field_wysiwyg', array('data'=>$data));
		}
		if (strpos($data->Field_Type, 'button') !== false) {
			$this->view('templates/admin/meta_button', array('data'=>$data));
		}
	}
}
?>