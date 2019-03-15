<?php
foreach ($query as $row)
{ 
	if ($row->Name == 'socialmedia') { 
		if ($row->Field_Value != '') { ?>
		<div class = "social-wrap">
			<a class = "sociallink" href = "<?php echo $row->Field_Value; ?>" target="_blank">
				<span class = "fa fa-<?php echo $row->Ele_Id; ?>"></span>
			</a>
		</div>
	<?php	}
	 }
} ?>