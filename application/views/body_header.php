	<div class = "row" id = "header-container">
			<div class = "col-sm-12 col-lg-1" id = "social-container">
				<a class = "fa fa-envelope sociallink" href = "#"></a>
				<a class = "fa fa-facebook sociallink" href = "#"></a>
				<a class = "fa fa-github-alt sociallink" href = "#"></a>
			</div>
			<div class = "col-sm-12 col-lg-9" id = "contact-container">
			<?php 
				foreach ($query as $row) 
				{ ?> <h2><?php echo $row->Firstname . ' ' . $row->Lastname;	?> </h2>
        		    <li><b>Web Designer / Web Progammer</b></li>
        		    <li><?php echo $row->Email; ?> </li>
        		    <li><?php echo $row->Phone; ?> </li>
        		<?php
        		}
				?>
			</div>
	
			<div class = "col-sm-12 col-lg-2" id = "photo-container">
				<img src = "http://lorempixel.com/400/200/" />
			</div>