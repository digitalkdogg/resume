<?php
foreach ($query as $row)
{ 
	if ($row->Name == 'contactinfo') { ?>
		<li data-type = "<?php echo $row->Field_Type; ?>" data-ele = "<?php echo $row->Ele_Id; ?>"><?php echo $row->Field_Value; ?></li>
    <?php }
} ?>