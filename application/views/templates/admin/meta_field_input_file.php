<div class = "row ele">
	<div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
		<?php echo $data->Field_Label; ?></div>
	<div class = "col-lg-5 field"> 
		 <input type = "file" id = "<?php echo $data->Ele_Id;?>" class = "data <?php echo $data->Class_List; ?>" value = "<?php echo $data->Field_Value; ?>" data-fieldid = "<?php echo $data->Section_Details_Id; ?>" data-labelname = "<?php echo $data->Field_Label;?>" />
	</div>
	<div class = "col-lg-2 thumbnail" id = "profile-wrap" data-fieldid = <?php echo $data->Section_Details_Id; ?>>
		
	</div>
</div>