<div class = "row ele" data-fieldid = "<?php echo $data->Section_Details_Id; ?>">
  <div class = "col-lg-2 lable" data-labelid = "<?php echo $data->Section_Details_Id; ?>">
    <?php echo $data->Field_Label; ?></div>
  <div class = "col-lg-5 field"> 
      <div id="editor_<?php echo $data->Section_Details_Id; ?>" class="pell" data-fieldid = "<?php echo $data->Section_Details_Id; ?>"></div>
      <div id="text-output" class = "hidden">test</div>
      <pre id="html-output-<?php echo $data->Section_Details_Id; ?>" class = "hidden html-output data" data-fieldid = "<?php echo $data->Section_Details_Id; ?>" data-labelname = "<?php echo $data->Field_Label;?>" data-sisterid="<?php echo $data->Sister_Field; ?>">
        <?php echo $data->Field_Value; ?>    
      </pre>
  </div>
</div>

<script>
	$(document).ready(function () {
	var editor_<?php echo $data->Section_Details_Id; ?> = window.pell.init({
		element: document.getElementById('editor_<?php echo $data->Section_Details_Id; ?>'),
		defaultParagraphSeparator: 'p',
		onChange: function (html) {
				document.getElementsByClassName('html-output').textContent = html;
				admin.changeWysiwyg(html, $(editor_<?php echo $data->Section_Details_Id; ?>).attr('data-fieldid'));
			}
		})

		var editorid = $(editor_<?php echo $data->Section_Details_Id; ?>).attr('id');
		$('#'+editorid + ' .pell-button').each(function () {
			var title = $(this).attr('title');
			if (title == 'Code' || title == 'Paragraph') {
				$(this).addClass('hidden');
			}
		})

		var html = $('#html-output-<?php echo $data->Section_Details_Id; ?>').html()
		admin.register_pell(editor_<?php echo $data->Section_Details_Id; ?>, html);
})
</script>