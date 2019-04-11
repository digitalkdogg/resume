<!-- Modal -->
<div id="<?php echo $data->Ele_Id; ?>" class="modal fade" role="dialog">
  <div class="modal-dialog large">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"><?php echo $data->Field_Label; ?></h4>
      </div>
      <div class="modal-body">
        <p>No Data!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default action" id = "<?php $data->Ele_Id; ?>" data-action = "<?php echo $data->Ele_Id;?>">Add</button> <span id = "modal_status" />
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>