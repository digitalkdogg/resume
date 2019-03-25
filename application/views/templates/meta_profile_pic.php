<?php
foreach ($query as $row)
{ 
	if ($row->Field_Type == 'ImageProfile') {
	?>	<img data-filename = "<?php echo $row->Field_Value; ?>" src = "<?php echo base_url() . 'uploads/' . $row->Field_Value; ?>" />
	<?php }
} ?>