$(function () {

/**************************************************
need to get the resume id and make it dynamic 
****************************************************/

if ($('#body-container').hasClass('about')==true) {

} else if ($('#body-container').hasClass('education')==true) {
	
} else if ($('#body-container').hasClass('experience')==true) {
	
} else if ($('#body-container').hasClass('skills')==true) {
	
} else {
		$.ajax({
    	url: resume.baseurl + 'index.php/Resume/About',
    	type: 'POST',
    	data: {'resumeid': '1', 'section_type': 'about'},
    	success: function(data){ 
    		$.each(data.html, function () {
    			$('#body-header').html('About');
				$('#body-content').html(this.Field_Value);
				$('#body-container').removeClass('flipInY');	
    		})
        	
    	},
    	error: function(data) {
        	$('#body-container #about').removeClass('hidden');
    	}
	});
}
//	$.ajax({
  //  	url: 'index.php/Resume/About',
  //  	type: 'GET',
  //  	success: function(data){ 
  //      	$('#body-header').html('About');
//			$('#body-content').html(data);
//			$('#body-container').removeClass('flipInY');
  //  	},
    //	error: function(data) {
      //  	$('#body-container #about').removeClass('hidden');
   // 	}
//	});

	$('li').each(function () {
		var datatype = $(this).attr('data-type');
		if (datatype != undefined) {
			switch (datatype) {
				case 'InputHref': 
					$(this).wrap('<a href = "'+$(this).text() + '"/>');
					break;
				case 'InputEmailHref':
					$(this).wrap('<a href = "mailto://'+$(this).text()+ '"/>');
					break;
				case 'InputH2':
					$(this).wrap('<h2>');
					break;
			}
		}
	})

	hide_social_menu();

	if (resume.menu != undefined) {
		for (x=0; x<resume.menu.hide.length; x++) {
			var ele = resume.menu.hide[x].toLowerCase();
			$('#' + ele).addClass('hidden');
		}
	}

	$(window).resize(function () {
		hide_social_menu();
	})

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
						'html': name,
						'data-toggle':'modal',
						'data-target': '#myModal'
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
			$(this).find('a').css({'color': '#000', 'text-decoration': 'underline'});
		}
	});

	$('#menu-container li').mouseleave(function () {
		if ($(this).hasClass('active') == false ) {
			$(this).find('a').css({'color': '#000', 'text-decoration': 'none'});

		}
	});

	$('#close-x').click(function () {
		$('#close-x').addClass('hidden');
		$('#skills').click();
	})

	$('#contact').click(function () {
		$('#modal-title').empty();
		$('#modal-body').empty();
		$('#modal-title').html('Contact Me');

		$('<div />', {
			'class':'contact-holder',
			'id': 'contact-holder'
		}).appendTo('#modal-body');

		$('<div />', {
			'class':'col-lg-2 margin-bottom-5',
			'text': 'Name :'
		}).appendTo('#contact-holder');

		$('<div />', {
			'class': 'col-lg-10 margin-bottom-5',
			'id':'name-input-div'
		}).appendTo('#contact-holder');

		$('<input />', {
			'id': 'name-input',
			'class': 'form-control width-50'
		}).appendTo('#name-input-div');

		$('<div />', {
			'class':'col-lg-2 margin-bottom-5',
			'text': 'Email :'
		}).appendTo('#contact-holder');

		$('<div />', {
			'class': 'col-lg-10 margin-bottom-5',
			'id':'email-input-div'
		}).appendTo('#contact-holder');

		$('<input />', {
			'id': 'email-input',
			'class': 'form-control width-50'
		}).appendTo('#email-input-div');

		$('<div />', {
			'class':'col-lg-2',
			'text': 'Message :'
		}).appendTo('#contact-holder');

		$('<div />', {
			'class': 'col-lg-5',
			'id':'msg-input-div'
		}).appendTo('#contact-holder');

		$('<textarea />', {
			'id': 'msg-input',
			'class': 'form-control',
			'cols': 70,
			'rows': 3
		}).appendTo('#msg-input-div');

		$('#myModal #send').removeClass('hidden');

		$('#myModal').addClass('flipInY');
	});

	$('button#send').click(function (e) {
		e.stopPropagation();
		var data = {}
		data.name = $('#name-input').val();
		data.email = $('#email-input').val();
		data.msg = $('#msg-input').val();
		$.ajax({
    		url: 'index.php/Resume/Contact',
    		type: 'POST',
    		dataType: 'JSON',
    		data: {'name':data.name, 'email': data.email, 'msg':data.msg},
    		success: function(send){ 
        		console.log(send);
    		},
    		error: function(send) {
    		
    		}
		});

		$('#myModal #send').addClass('hidden');
	});

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
	var name = $(ele).data('name');
	var thisobj = lookup_skills(name, skills);

	$('#modal-title').empty();
	$('#modal-body').empty();
	$('#modal-title').html(thisobj.Name);

	$('<div />', {
		'class':'skill-details',
		'id': 'skill-details_'+thisobj.id
	}).appendTo('#modal-body');

	$('<div />', {
		'id': 'skill-details-row-1'
	}).appendTo('#skill-details_'+thisobj.id)
	
	$('<div />', {
		'class': 'col-lg-3 bold',
		'text': 'Level :'
	}).appendTo('#skill-details-row-1');

	$('<div />', {
		'class': 'col-lg-8',
		'text': thisobj.ExpertLevel
	}).appendTo('#skill-details-row-1');

	$('<div />', {
		'id': 'skill-details-row-2'
	}).appendTo('#skill-details_'+thisobj.id)
	
	$('<div />', {
		'class': 'col-lg-3 bold',
		'text': 'Years :'
	}).appendTo('#skill-details-row-2');

	$('<div />', {
		'class': 'col-lg-9',
		'text': thisobj.ExpertYear
	}).appendTo('#skill-details-row-2');

	$('<div />', {
		'id': 'skill-details-row-3'
	}).appendTo('#skill-details_'+thisobj.id)

	$('<div />', {
		'class': 'col-lg-12',
		'text': thisobj.Detals
	}).appendTo('#skill-details-row-3');


	$('#myModal').addClass('flipInY');

	load_project_skills(thisobj);

}

function load_project_skills(thisobj) {

	$.ajax({
    		url: 'index.php/Resume/ProjectSkill',
    		type: 'POST',
    		dataType: 'JSON',
    		data: {'thisid': thisobj.id},
    		success: function(data){ 
        		$('<div />', {
					'id': 'skill-proj-dets'
				}).appendTo('#skill-details_'+thisobj.id);

				$('<div />', {
					'class': 'col-lg-2',
					'text': 'Key Projects : '
				}).appendTo('#skill-proj-dets');

				$.each(data, function () {
					$('<div />', {
						'class': 'col-lg-12 skill-proj-dets',
						'id':'skill-proj-wrapper_' + this.id 
					}).appendTo('#skill-proj-dets');

					$('<div />', {
						'class': 'col-lg-12',
						'text': this.ProjectName + ' - ' + this.DateCompleted.replace('null', '')
					}).appendTo('#skill-proj-wrapper_' + this.id);

					$('<div />', {
						'class': 'col-lg-12',
						'text': this.ProjectDetails
					}).appendTo('#skill-proj-wrapper_' + this.id);
				});






    		},
    		error: function(data) {
    		
    		}
		});
}

function isMobile() {
    ///<summary>Detecting whether the browser is a mobile browser or desktop browser</summary>
    ///<returns>A boolean value indicating whether the browser is a mobile browser or not</returns>

    if (sessionStorage.desktop) // desktop storage 
        return false;
    else if (localStorage.mobile) // mobile storage
        return true;

    // alternative
    var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile']; 
    for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

    // nothing found.. assume desktop
    return false;
}

function hide_social_menu() {
	if (isMobile() == true) {
		var social = $('#social-container')
		$('#social-container.mobile-social').html($(social).html())
		$('#social-container').addClass('hidden');
	} else {
		$('#social-container').removeClass('hidden');
	}
}