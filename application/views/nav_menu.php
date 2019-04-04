	<div class = "col-sm-12 col-md-12 col-lg-12 col-xl-12" id= "menu-container">
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <div id = "social-container" class = "mobile-social mobile-hidden"></div>
		    </div>
		    <div class="collapse navbar-collapse" id="myNavbar">
		      <ul class="nav navbar-nav">
		      	<?php foreach ($menu as $item)  { ?>
		      		<li id = "<?php echo strtolower($item->Value); ?>">
		      			<a href = "<?php echo base_url() . 'index.php/Resume/view' . '/' . $username . '/' .$resume . $item->Url; ?>">
		      				<?php echo $item->Value; ?>
		      			</a>
		      		</li>
		      	<?php	
		      	}
		      	?>
		      </ul>
		      <ul class="nav navbar-nav navbar-right">
		        <li><a href="#" id = "contact" data-toggle="modal" data-target="#myModal">
		        		<span class="glyphicon glyphicon-user"></span> Contact
		        	</a>
		        </li>
		      </ul>
		    </div>
		  </div>
		</nav>
	</div>
</div>
