<div class = "row ele">
		<button type = "button" class = "btn-primary" data-toggle="modal" data-target="#add-new-career-hightlight" id = "add-new-btn">+ Add</button>
	</div> 

	<!-- Modal -->
	<div class="modal fade" id="add-new-career-hightlight" tabindex="-1" role="dialog" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="modal-label">Add New Career Highlight Bullet</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <div class = "row ele">
				<div class = "col-lg-2 lable">
					Text : </div>
				<div class = "col-lg-5 field"> 
					 <textarea id = "new-career-hightlist-txt" class = "form-control"  rows = "5"></textarea>
				</div>
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary" id = "add-item">Save changes</button>
	      </div>
	    </div>
	  </div>
	</div>