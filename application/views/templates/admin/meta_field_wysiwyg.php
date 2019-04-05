<div class = "row ele" data-fieldid = "<?php echo $data->Section_Details_Id; ?>">
  <div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
    <?php echo $data->Field_Label; ?></div>
  <div class = "col-lg-5 field"> 
      <div id="editor" class="pell" data-fieldid = "<?php echo $data->Section_Details_Id; ?>"></div>
      <div id="text-output" class = "hidden">test</div>
      <pre id="html-output-<?php echo $data->Section_Details_Id; ?>" class = "hidden html-output data" data-fieldid = "<?php echo $data->Section_Details_Id; ?>" data-labelname = "<?php echo $data->Field_Label;?>" data-sisterid="<?php echo $data->Sister_Field; ?>">
        <?php echo $data->Field_Value; ?>    
      </pre>
  </div>
</div>