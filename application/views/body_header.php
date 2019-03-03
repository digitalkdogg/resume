	<div class = "row" id = "header-container">
			<div class = "col-xs-12 col-sm-1 col-md-1 col-lg-1" id = "social-container">
				<a class = "fa fa-envelope sociallink" href = "#"></a>
				<a class = "fa fa-facebook sociallink" href = "#"></a>
				<a class = "fa fa-github-alt sociallink" href = "#"></a>
			</div>
			<div class = "col-xs-12 col-sm-9 col-md-9 col-lg-9" id = "contact-container">
				<div class = "col-xs-8">
			<?php
				foreach ($query as $row)
				{ ?> <h2><?php echo $row->Firstname . ' ' . $row->Lastname;	?> </h2>
        		    <li><b>Web Designer / Web Progammer</b></li>
        		    <li><?php echo $row->Email; ?> </li>
        		    <li><?php echo $row->Phone; ?> </li>
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
