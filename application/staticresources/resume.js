var resume = {};
(function($) {
	"use strict";
	resume = {
	 	init : function () {
	 		resume['data'] = {};
			resume.data.baseurl = sitemeta['baseurl'];
			resume.data.siteurl = sitemeta['siteurl'];

			var resumeid = $('body').attr('data-resumeid');
			if (resumeid != undefined) {
				resume.data['resumeid'] = resumeid;
			}

			if(menu != undefined) {
				if (resume.menu == undefined) {
					resume.menu = {}
				}
				if (resume.menu.hide == undefined) {
					resume.menu.hide = {}
				}
				resume.menu = menu;
			}

			if (resume.data.social == undefined) {
    			resume.data['social'] = {}
    		}

    		if (resume.data.contact == undefined) {
    			resume.data['contact'] = {}
    		}

    		$('#header-container #social-container .social-wrap').each(function (index, val) {
    			/******************************************************
					Purpose : loop through aoll the social media icons
					and store them in resume.data.social
    			********************************************************/
    			var ele = $(this).attr('data-label');
    			var url = $(this).find('a.'+ele).attr('href');
    			
    			if (ele != undefined) {
    				resume.data.social[ele] = {
    					'name' : ele,
    					'url' : url
    				}
    			}
    		})			

    		var contacts = $('#header-container #contact-container div').children();
    		$.each(contacts, function () {
    			/******************************************************
					Purpose : loop through aoll the contact elemets
					and store them in resume.data.contact
    			********************************************************/
    			var ele = $(this).attr('data-ele')
    			resume.data.contact[ele] = {
    				'name': ele,
    				'val' : $(this).html(),
    				'type': $(this).attr('data-type')
    			}
    		})

    		$('#photo-container img').each(function () {
    		/********************************************************************
				purpose : get the contact photo and store it in resume.data.contact
    		********************************************************************/
    			var src = $(this).attr('src');
    			resume.data.contact['photo'] = {
    				'src': src,
    				'filename': $(this).attr('data-filename')
    			}
    		})

    		var bodyholder = $('#body-container')
			if ($(bodyholder).hasClass('about')==true || $(bodyholder).hasClass('About')==true) {
				$('li#about').addClass('active');
				this.getGuts('about', 'About');
			} else if ($(bodyholder).hasClass('education')==true || $(bodyholder).hasClass('Education')==true) {
				$('li#education').addClass('active');
				this.getGuts('Education', 'Education');
			} else if ($(bodyholder).hasClass('experience')==true || $(bodyholder).hasClass('Experience')==true) {
				$('li#experience').addClass('active');
				this.getGuts('Experience', 'Experience');
			} else if ($(bodyholder).hasClass('skills')==true || $(bodyholder).hasClass('Skills')) {
				$('li#skills').addClass('active');
				this.getGuts('Skills', 'Skills');
			}

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

			resume.hide_social_menu();

			if (resume.menu.hide != undefined) {
				this.check_menu_disabled();
			}

			$(window).resize(function () {
				resume.hide_social_menu();
			})

			$('#menu-container li').click(function () {
				/*************************************************
				todo : Need to check if this is working 
				***********************************************/
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
				/****************************************************
				todo : need to fix this so it sends loop of death
				*******************************************************/
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
		}, 
		getGuts: function (section_type, section_title) {
			$.ajax({
				url: resume.data.baseurl + 'index.php/Resume/get_guts',
				type: 'POST',
				data: {'resumeid': this.data.resumeid, 'section_type': section_type},
				success: function(data){ 
					section_type = section_type.toLowerCase();
					$('#body-header').html(section_title);
					if (section_type=='about') {
						resume.renderAbout(data);
					}
					if (section_type=='education') {
						resume.renderEducation(data);
					}
					if (section_type=='experience') {
						resume.renderExperience(data);
					}
					if (section_type=='skills') {
						resume.renderSkills(data);
					}
				},
				error: function(data) {
    				$('#body-container #about').removeClass('hidden');
				}
			});
		},
		renderAbout: function (data) {
			/*******************************************************
			todo : bring up 404 if check_menu_disabled returns true
			*******************************************************/
			if (this.check_menu_disabled('about')==false) {
				$('#body-content').empty();
				$('<div />', {
					'id': 'objective'
				}).appendTo('#body-content')
				resume.data['about'] = data.html;

				$.each(data.html, function () {	
					if (this.Sister_Field != 'is-sister') {
						if (this.Ele_Id == 'objective') {
							$('<'+this.Frontend_Type + ' />', {
								'text':this.Field_Value
							}).prependTo('#body-content #objective')
						}
						if (this.Ele_Id == 'show-career-highlights') {
							if (this.Field_Value == 'checked') {
								$('<'+this.Frontend_Type + ' />', {
									'id': 'show-career-highlights'
								}).insertAfter('#body-content #objective');
							}
						}
						if (this.Ele_Id == 'career-highlights') {
							$('<'+this.Frontend_Type + ' />', {
								'html': this.Field_Value
							}).appendTo('#body-content #show-career-highlights')
						}
					}
				})
			}
		},
		renderEducation: function (data) {
			/*******************************************************
			todo : bring up 404 if check_menu_disabled returns true
			*******************************************************/
			if (this.check_menu_disabled('education')==false) {
				$('#body-content').empty();
				$('<div />', {
					'id': 'education'
				}).appendTo('#body-content')
				resume.data['education'] = data.html;

				$.each(data.html, function () {

					if (this.Field_Type == 'Wrapper') {
						$('<'+this.Frontend_Type+' />', {
							'id': 'wrapper_' + this.Section_Details_Id,
							'class':'wrapper row'
						}).appendTo('#body-content #'+this.Ele_Id);

						$('<div />', {
							'class': 'row',
							'id': 'row_1_'+this.Section_Details_Id
						}).appendTo('#body-content #wrapper_'+this.Section_Details_Id);

						$('<div />', {
							'class': 'row',
							'id': 'row_2_'+this.Section_Details_Id
						}).appendTo('#body-content #wrapper_'+this.Section_Details_Id);

					} else {
						var sisterid = this.Sister_Field;
						if (this.Class_List.indexOf('schooltitle')>= 0) {

							$('<'+this.Frontend_Type+' />', {
								'text':this.Field_Value,
								'class': 'col-lg-3 schooltitle'
							}).appendTo('#body-content #row_1_' + this.Sister_Field)
						}

						if (this.Class_List.indexOf('start-date')>= 0) {
							$('<'+this.Frontend_Type+' />', {
								'text':this.Field_Value,
								'class': 'col-lg-3 startdate',
								'id' : 'start-date'
							}).appendTo('#body-content #row_1_'+this.Sister_Field)
						}

						if (this.Class_List.indexOf('end-date')>= 0) {

							$('<'+this.Frontend_Type+' />', {
								'text':this.Field_Value,
								'class': 'col-lg-3',
								'id': 'end-date'
							}).appendTo('#body-content #row_1_'+this.Sister_Field)
						}

						if (this.Class_List.indexOf('subtitle')>= 0) {
							$('<'+this.Frontend_Type+' />', {
								'html': '<br />' + this.Field_Value,
							}).appendTo('#body-content #row_1_' + this.Sister_Field + ' .schooltitle')
						}
					}
				
				})
			}
		},
		renderExperience: function (data) {
			/*******************************************************
			todo : bring up 404 if check_menu_disabled returns true
			*******************************************************/
			if (this.check_menu_disabled('experience')==false) {
				$('#body-content').empty();
				$('<div />', {
					'id': 'experience'
				}).appendTo('#body-content')
				resume.data['experience'] = data.html;

				$.each(data.html, function () {	

					if (this.Sister_Field == 'is-sister') {
						$('<div />', {
							'class': 'wrapper',
							'id': 'wrapper_'+this.Section_Details_Id
						}).appendTo('#body-content #experience')

						$('<div />', {
							'class': 'row',
							'id': 'row_'+this.Section_Details_Id
						}).appendTo('#body-content #wrapper_'+this.Section_Details_Id);

						$('<div />', {
							'class': 'col-lg-4 col-1'
						}).appendTo('#body-content #row_'+this.Section_Details_Id)

						$('<div />', {
							'class': 'col-lg-4 col-2'
						}).appendTo('#body-content #row_'+this.Section_Details_Id)

						$('<div />', {
							'class': 'col-lg-4 col-3'
						}).appendTo('#body-content #row_'+this.Section_Details_Id)

					} else {
						var sisterid = this.Sister_Field;
						if (this.Class_List.indexOf('company')>=0) {
							$('<div />',{
								text: this.Field_Value,
								class: 'company bold'
							}).prependTo('#body-content #row_' + sisterid + ' .col-1');
						}

						if (this.Class_List.indexOf('job-title')>=0) {
							$('<div />',{
								text: this.Field_Value,
								class: 'jobtitle'
							}).appendTo('#body-content #row_' + sisterid + ' .col-1' );
						}

						if (this.Class_List.indexOf('startdate')>=0) {
							$('<div />',{
								text: this.Field_Value,
								class: 'employeement-date'
							}).appendTo('#body-content #row_' + sisterid + ' .col-3' );
						}

						if (this.Class_List.indexOf('enddate')>=0) {
							$('<span />',{
								text: ' - ' + this.Field_Value,
								class: 'end-date'
							}).appendTo('#body-content #row_' + sisterid + ' .employeement-date' );
						}

						if (this.Class_List.indexOf('city')>=0) {
							$('<span />',{
								text: this.Field_Value,
								class: 'city'
							}).appendTo('#body-content #row_' + sisterid + ' .col-2' );
						}

						if (this.Class_List.indexOf('state')>=0) {
							$('<span />',{
								text: ', ' + this.Field_Value,
								class: 'state'
							}).appendTo('#body-content #row_' + sisterid + ' .city' );
						}

						if (this.Class_List.indexOf('tagline')>=0) {
							$('<div />',{
								html: this.Field_Value,
								class: 'tagline bold margin-left-5 row'
							}).appendTo('#body-content #wrapper_' + sisterid );
						}

						if (this.Class_List.indexOf('highlights')>=0) {
							$('<div />',{
								html: this.Field_Value,
								class: 'highlights row margin-left-5'
							}).appendTo('#body-content #wrapper_' + sisterid );
						}


					}
				})
			}
		},
		renderSkills: function (data) {
			if (this.check_menu_disabled('skills')==false) {
				$('#body-content').empty();
				$('<div />', {
					'id': 'skills'
				}).appendTo('#body-content')
				resume.data['skills'] = data.html;

				$.each(data.html, function () {
					if (this.Sister_Field == 'is-sister') {
						var sisterid = this.Section_Details_Id;
						$('<div />', {
							'id': 'skill-wrapper_'+sisterid,
							'class': 'skill'
						}).appendTo('#body-content #skills')
					} else {
						var sisterid = this.Sister_Field

					//	if ($('#body-content #skill-wrapper_'+sisterid).length > 0) {
							if (this.Ele_Id=='skills-title') {
								$('<div />', {
									'class': this.Ele_Id,
									'text': this.Field_Value
								}).appendTo('#body-content #skill-wrapper_'+sisterid)
							}
							if (this.Ele_Id.indexOf('skills-years')>=0) {
								$('#body-content #skill-wrapper_'+sisterid + ' .skills-title').attr('data-years', this.Field_Value)
								$('#body-content #skill-wrapper_'+sisterid + ' .skills-title').append(' - ' + this.Field_Value + ' Years')
								resume.load_skill($('#skill-wrapper_'+sisterid + ' .skills-title'))
							}

						}
					//}
				})
			}
		},
		isMobile: function () {
			if (sessionStorage.desktop) // desktop storage 
        		return false;
    		else if (localStorage.mobile) // mobile storage
        		return true;

    		// alternative
    		var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile']; 
    		for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;

    		// nothing found.. assume desktop
    		return false;
		},
		hide_social_menu: function () {
			if (this.isMobile() == true) {
				var social = $('#social-container')
				$('#social-container.mobile-social').html($(social).html())
				$('#social-container').addClass('hidden');
			} else {
				$('#social-container').removeClass('hidden');
			}
		},
		lookup_skills: function (name, skillz) {
			var returnobj = {};
			$.each(skillz, function () {
	
				if (this.Name === name) {
					returnobj = this; 
				}
			})
			return returnobj;
		},
		load_project_skills: function (thisobj) {
			/***************************************
			comming soon 
			**************************************/
		},
		check_menu_disabled: function (menu) {
			if (resume.menu.hide != undefined) {
				for (var x=0; x<resume.menu.hide.length; x++) {
					if (menu == undefined) {
				 		var ele = resume.menu.hide[x].toLowerCase();
						$('#' + ele).addClass('hidden');
				 	} else {
						if (menu.toLowerCase() == resume.menu.hide[x].toLowerCase()) {
				 			return true;
					 	}
					}
				}
			} 
			return false;
		},
		load_skill: function (ele) {
			var years = $(ele).attr('data-years');

			if (years != undefined) {
				years = years *10;
				var speed = years * 75

   					$(ele).animate({
   						width: years + '%'
  					}, speed, function() {
    				// Animation complete.
  					}); 
			} 

		}
	}

	resume.init();



}(jQuery));