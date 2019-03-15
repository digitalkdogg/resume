<?php
foreach ($query as $row)
{ 
	if ($row->Name == 'Meta') { ?>
		<li data-type = "<?php echo $row->Field_Type; ?>"><?php echo $row->Field_Value; ?></li>
    <?php }
} ?>