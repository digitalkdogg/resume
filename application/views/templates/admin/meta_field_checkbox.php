<div class = "row ele">
	<div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
		<?php echo $data->Field_Label; ?></div>
	<div class = "col-lg-5 field">
	<?php if (strpos($data->Field_Type, 'Checkbox') !== false) { ?> 
		<div id = "<?php echo $data->Ele_Id;?>" class = "checkbox data fa-check form-control <?php echo $data->Sister_Field; ?>" data-value = "<?php echo $data->Field_Value; ?>" data-fieldid = "<?php echo $data->Section_Details_Id; ?>" data-labelname = "<?php echo $data->Field_Label;?>" data-section = "<?php echo $data->Section_Type_Id; ?>"></div>
	<?php } ?>
	</div>
</div>
<?php 
	if ($data->Field_Value == 'checked') { 
		if ($data->Sister_Field != 'na') {
			$this->view('templates/admin/meta_field_modal', array('data'=>$data));
		} 
	} 
?>