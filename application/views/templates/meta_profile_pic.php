<?php
foreach ($query as $row)
{ 
	if ($row->Field_Type == 'ImageProfile') {
	?>	<img src = "<?php echo base_url() . 'uploads/' . $row->Field_Value; ?>" />
	<?php }
} ?>