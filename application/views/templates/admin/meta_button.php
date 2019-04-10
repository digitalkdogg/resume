<button class = "btn btn-primary" id = "<?php echo $data->Ele_Id; ?>" data-toggle="modal" data-target="<?php echo '#'.$data->Field_Label; ?>">Add New</button>
<script>
$(document).ready(function () {
	$("#<?php echo $data->Ele_Id;?>").click(function () {
		admin.load_modal($(this));
	})
})
</script>