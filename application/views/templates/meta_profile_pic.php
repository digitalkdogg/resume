<?php
foreach ($query as $row)
{ 
	if ($row->Name == 'MetaProfile') {
	?>	<img src = "../<?php echo $row->Field_Value; ?>" />
	<?php }
} ?>