<div class = "row ele">
	<div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
		<?php echo $data->Field_Label; ?></div>
	<div class = "col-lg-5 field"> 
		 <textarea id = "<?php echo $data->Ele_Id;?>" class = "data <?php echo $data->Class_List; if ($data->Sister_Field != 'na') {echo " has-sister"; } ?>" data-fieldid = "<?php echo $data->Section_Details_Id; ?>" data-labelname = "<?php echo $data->Field_Label;?>"  data-sisterid = "<?php echo $data->Sister_Field; ?>" data-section = "<?php echo $data->Section_Type_Id; ?>" data-order = "<?php echo $data->Order_Num; ?>"><?php echo $data->Field_Value; ?></textarea>
	</div>
</div>