<?php
foreach ($query as $row)
{ 
	if ($row->Name == 'socialmedia') { 
		if ($row->Field_Value != '') { ?>
		<div class = "social-wrap"  data-label = "<?php echo strtolower($row->Ele_Id); ?>">
			<a class = "sociallink <?php echo strtolower($row->Ele_Id); ?>" href = "<?php echo $row->Field_Value; ?>" data-type="<?php echo strtolower($row->Ele_Id); ?>" target="_blank">
				<span class = "fa fa-<?php echo $row->Ele_Id; ?>"></span>
			</a>
		</div>
	<?php	}
	 }
} ?>