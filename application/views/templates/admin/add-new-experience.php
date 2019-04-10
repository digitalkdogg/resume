<div id = "add-new-experiece-content" class = "wrapper">
	<div class = "row ele">
		<div class = "col-lg-2 lable">Company : </div>
		<div class = "col-lg-9 field"> 
			 <input type = "text" id = "add-compampy" data-type = "InputText" data-labelname = "company" class = "data company form-control" />
		</div>
	</div>
	<div class = "row ele">
		<div class = "col-lg-2 lable">City : </div>
		<div class = "col-lg-5 field"> 
			 <input type = "text" id = "add-city" data-type = "InputText" data-labelname = "City" class = "data city form-control" />
		</div>
		<div class = "col-lg-2 lable">State : </div>
		<div class = "col-lg-3 field">
			<input type = "text" id = "add-state" data-type = "InputText" data-labelname = "State" class = "data state form-control" />
		</div>
	</div>
	<div class = "row ele">
		<div class = "col-lg-2 lable">Job Title : </div>
		<div class = "col-lg-9 field"> 
			 <input type = "text" id = "add-jobtitle" data-type = "InputText" data-labelname = "Job Title" class = "data jobtitle form-control" />
		</div>
	</div>
	<div class = "row ele">
		<div class = "col-lg-2 lable">Tagline : </div>
		<div class = "col-lg-9 field"> 
			 <input type = "text" id = "add-tagline" data-type = "InputText" data-labelname = "Tagline" class = "data tagline form-control" />
		</div>
	</div>
	<div class = "row ele">
		<div class = "col-lg-2 lable">Start Date : </div>
		<div class = "col-lg-9 field"> 
			 <input type = "text" id = "add-startdate" data-type = "InputText" data-labelname = "Start Date" data-fieldid = "add-start-date" class = "data startdate datepicker form-control" />
		</div>
	</div>
	<div class = "row ele">
		<div class = "col-lg-2 lable">End Date : </div>
		<div class = "col-lg-9 field"> 
			 <input type = "text" id = "add-enddate" data-type = "InputText" data-labelname = "End Date" data-fieldid = "add-end-date" class = "data enddate datepicker form-control" />
		</div>
	</div>
	<div class = "row ele"">
	  <div class = "col-lg-2 lable">
	    Hightlights :</div>
	  <div class = "col-lg-9 field"> 
	      <div id="modal-editor" class="pell" data-fieldid = "modaleditor"></div>
	      <div id="text-output" class = "hidden">test</div>
	      <pre id="html-output-new" class = "hidden html-output data" data-type = "wysiwyg" data-labelname = "Highlights" >
	      </pre>
	  </div>
	</div>
</div>

<script>
var modaleditor = window.pell.init({
	element: document.getElementById('modal-editor'),
		defaultParagraphSeparator: 'p',
		onChange: function (html) {
			document.getElementsByClassName('html-output-new').textContent = html;
			admin.changeWysiwyg(html, $(modaleditor).attr('data-fieldid'));
		}
	})

	var editorid = $(modaleditor).attr('id');
	$('#'+editorid + ' .pell-button').each(function () {
		var title = $(this).attr('title');
		if (title == 'Code' || title == 'Paragraph') {
			$(this).addClass('hidden');
		}
	})

</script>
