<div class = "row ele">
	<div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
		<?php echo $data->Field_Label; ?></div>
	<div class = "col-lg-5 field">
	<?php if ($data->Field_Type == 'SelectColor') { ?> 
		<select id = <?php echo $data->Ele_Id; ?>  data-labelname = "<?php echo $data->Field_Label;?>" class = "data <?php echo $data->Class_List; ?>" data-value = "<?php echo $data->Field_Value; ?>" data-fieldid = "<?php echo $data->Section_Details_Id; ?>">
			<option value = "blue">Blue</option>
			<option value = "green">Green</optionn>
			<option value = "orange">Orange</option>
			<option value = "gray">Gray</option>
		</select>
	<?php } ?>
	</div>
</div>