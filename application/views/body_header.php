	<div class = "row" id = "header-container">
			<div class = "col-xs-12 col-sm-1 col-md-1 col-lg-1" id = "social-container">
				<div class = "social-wrap">
				<!--	<a class = "fa fa-envelope sociallink" href = "#">E</a> -->
				<a class = "sociallink" href = "#"><span class = "fa fa-envelope"></span></a>
				</div>
				<div class = "social-wrap">
					<a class = "sociallink" href = "#"><span class = "fa fa-facebook"></span></a>
				</div>
				<div class = "social-wrap">
					<a class = "sociallink" href = "#"><span class = "fa fa-github-alt"></span></a>
				</div>

			</div>
			<div class = "col-xs-12 col-sm-9 col-md-9 col-lg-9" id = "contact-container">
				<div class = "col-xs-8">
			<?php
				foreach ($query as $row)
				{ 
					if ($row->Name == 'Contact Name') {
						?> <h2><?php echo $row->FieldValue; ?> </h2>
					<?php } else { ?>
						<li><?php echo $row->FieldValue; ?></li>
					<?php } ?>
        		   
        		<?php
        		}
				?></div>
				<div id = "mobile-logo" class = "mobile-hidden col-xs-4">
					<img src = "application/staticresources/img/kb-logo.png" />
				</div>
			</div>

			<div class = "col-xs-2 col-sm-2 col-md-2 col-lg-2" id = "photo-container">
				<img src = "application/staticresources/img/kb-logo.png" />
			</div>
