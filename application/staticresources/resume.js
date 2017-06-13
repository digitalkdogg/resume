var navigation = null;

$(function () {
	$.ajax({
    	url: 'index.php/Resume/About',
    	type: 'GET',
    	success: function(data){ 
        	$('#body-header').html('About');
			$('#body-content').html(data);
			$('#body-container').removeClass('flipInY');
    	},
    	error: function(data) {
        	$('#body-container #about').removeClass('hidden');
    	}
	});


	$('li#about').click(function (e) {
		e.preventDefault();
		$('#body-container').addClass('flipInY');
		$.ajax({
    		url: 'index.php/Resume/About',
    		type: 'GET',
    		success: function(data){ 
        		$('#body-header').html('About');
				$('#body-content').html(data);
				$('#body-container').removeClass('flipInY');
    		},
    		error: function(data) {
    			$('div.ajax-error').addClass('hidden');
    			$('#body-container #about').removeClass('hidden');
    		}
		});
	});

	$('nav li#skills').click(function (e) {
		e.preventDefault();
		$('#body-content').empty();
		$('#body-container').addClass('flipInY');
		$.ajax({
    		url: 'index.php/Resume/Skills',
    		type: 'POST',
    		dataType:'JSON',
    		success: function(skills){ 
        		$('#body-header').html('Skills');
				$('<div />', {
					'id': 'skills-container'
				}).appendTo('#body-content');

				$.each(skills, function (index) {
					var id = this.id;
					var name = this.Name;
					$('<div />',{
						'id': 'skill-container_'+id,
						'class': 'col-lg-12 skill-container'
					}).appendTo('#skills-container');

					$('<li />', {
						'id': 'skill_' + id,
						'class':'no-bullet skill',
						'data-exp': this.ExpertYear,
						'data-id': id,
						'data-name': name,
						'html': name
					}).appendTo('#skill-container_'+id);

					 var skills = {[name]: {'exp': this.ExpertYear/10, 
										'name': this.Name,
										'level':this.ExpertLevel,
										'detals':this.Detals
								}}
				
					$('<div />', {
						'id': 'exp-holder_'+id,
						class: 'exp-holder margin-bottom-10'
					}).appendTo('#skill_'+id);

					$('<div />', {
						'id': 'exp_' +id,
						'class':'exp',
						'html': this.ExpertYear+ ' Years'
					}).appendTo('#exp-holder_'+id);


					 $( "#exp_" + id).animate({
						width:skills[name].exp*100+'%'
					 }, 2000, function () {
					 	
					});
					
				});

			$('#skills-container li.skill').on('click', function () {
				load_skill_dets(skills, $(this));
			})

				
				$('#body-container').removeClass('flipInY');
    		},
    		error: function(data) {
    			$('div.ajax-error').addClass('hidden');
    			$('#body-container #skills').removeClass('hidden');
    		}
		});
	});

	$('li#education').click(function (e) {
		e.preventDefault();
		$('#body-container').addClass('flipInY');
		$('#body-content').empty();
		$.ajax({
    		url: 'index.php/Resume/Education',
    		type: 'POST',
    		dataType: 'JSON',
    		success: function(education){ 
        		$('#body-header').html('Education');
        		$('<div />', {
        			'class': 'col-xs-12',
        			'html': education.school + ' - ' + education.GradYear 
        		}).appendTo('#body-content');
        		$('<div />', {
        			'class': 'col-xs-12 margin-left-10',
        			'html': education.DegreeType + ' - ' + education.Degree 
        		}).appendTo('#body-content');

				//$('#body-content').html(data.school);
				$('#body-container').removeClass('flipInY');
    		},
    		error: function(education) {
    			$('div.ajax-error').addClass('hidden');
    			$('#body-container #education').removeClass('hidden');
    		}
		});
	});

	$('li#experience').click(function (e) {
		e.preventDefault();
		$('#body-content').empty();
		$('#body-container').addClass('flipInY');
		$.ajax({
    		url: 'index.php/Resume/Experience',
    		type: 'POST',
    		dataType: 'JSON',
    		success: function(experience){ 
        		$('#body-header').html('Exerience');
				
				$.each(experience, function (index, val) { 
				$('<div />', {
        			'class': 'job-holder margin-top-10 margin-bottom-10 ' + experience[index].JobType,
        			'id': 'job' + experience[index].Jobid 
        		}).appendTo('#body-content');

				$('<div />', {
        			'class': 'col-xs-12 bold',
        			'html': experience[index].Company 
        		}).appendTo('#job'+experience[index].Jobid);

   				$('<div />', {
        			'class': 'col-xs-12 margin-left-10',
        			'id': 'jobtitle-' +experience[index].Jobid ,
        			'html': experience[index].JobTitle
        		}).appendTo('#job'+experience[index].Jobid);

        		$('<span />', {
        			'class': 'margin-left-20',
        			'html' : experience[index].HireDate + ' - ' + experience[index].LeftDate
        		}).appendTo('#jobtitle-'+experience[index].Jobid);

        		$('<div />', {
        			'class' : 'margin-top-10 col-lg-12 bold',
        			'html': experience[index].Tagline
        		}).appendTo('#job'+experience[index].Jobid);

        		$('<li />', {
        			'class': 'margin-left-20 no-bullet',
        			'html' : experience[index].bullet1 
        		}).appendTo('#job'+experience[index].Jobid);

        		$('<li />', {
        			'class': 'margin-left-20 no-bullet',
        			'html' : experience[index].bullet2 
        		}).appendTo('#job'+experience[index].Jobid);

        		$('<li />', {
        			'class': 'margin-left-20 no-bullet',
        			'html' : experience[index].bullet3 
        		}).appendTo('#job'+experience[index].Jobid);

        		$('<li />', {
        			'class': 'margin-left-20 no-bullet',
        			'html' : experience[index].bullet4 
        		}).appendTo('#job'+experience[index].Jobid);

        		$('<li />', {
        			'class': 'margin-left-20 no-bullet',
        			'html' : experience[index].bullet5 
        		}).appendTo('#job'+experience[index].Jobid);
        	});

			$('#body-container').removeClass('flipInY');
    		
    		},
    		error: function(experience) {
    			$('div.ajax-error').addClass('hidden');
    			$('#body-container #experience').removeClass('hidden');
    		}
		});
	});

	$('#menu-container li').click(function () {
		$('#menu-container li').removeClass('active');
		$(this).addClass('active');
	});

	$('#menu-container li').mouseover(function () {
		if ($(this).hasClass('active') == false ) {
			$(this).find('a').css('color', '#fff');
		}
	});

	$('#menu-container li').mouseleave(function () {
		if ($(this).hasClass('active') == false ) {
			$(this).find('a').css('color', '#000');
		}
	});

	$('#close-x').click(function () {
		$('#close-x').addClass('hidden');
		$('#skills').click();
	})

});

function lookup_skills(name, skillz) {
	var returnobj = {};
	$.each(skillz, function () {
	
		if (this.Name === name) {
			returnobj = this; 
		}
	})
return returnobj;
}

function load_skill_dets(skills, ele) {
	$('#body-content').empty();
	$('#body-container').addClass('flipInY');
	var name = $(ele).data('name');
	var thisobj = lookup_skills(name, skills);
	navigation = 'skills';

	$('#body-header').html(thisobj.Name);

	$('<div />', {
		'class': 'popup-wrapper',
		'id': 'popup-wrapper'
	}).appendTo('#body-content');

	$('<div />', {
		'class':'skill-details',
		'id': 'skill-details_'+thisobj.id
	}).appendTo('#popup-wrapper');

	$('<div />', {
		'id': 'skill-details-row-1'
	}).appendTo('#skill-details_'+thisobj.id)
	
	$('<div />', {
		'class': 'col-lg-1 bold',
		'text': 'Level :'
	}).appendTo('#skill-details-row-1');

	$('<div />', {
		'class': 'col-lg-11',
		'text': thisobj.ExpertLevel
	}).appendTo('#skill-details-row-1');

	$('<div />', {
		'id': 'skill-details-row-2'
	}).appendTo('#skill-details_'+thisobj.id)
	
	$('<div />', {
		'class': 'col-lg-1 bold',
		'text': 'Years :'
	}).appendTo('#skill-details-row-2');

	$('<div />', {
		'class': 'col-lg-11',
		'text': thisobj.ExpertYear
	}).appendTo('#skill-details-row-2');

	$('<div />', {
		'id': 'skill-details-row-3'
	}).appendTo('#skill-details_'+thisobj.id)

	$('<div />', {
		'class': 'col-lg-12',
		'text': thisobj.Detals
	}).appendTo('#skill-details-row-3');


	$('#body-container').removeClass('flipInY');
	$('#close-x').removeClass('hidden');
}