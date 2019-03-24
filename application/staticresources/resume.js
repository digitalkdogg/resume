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

			if ($('#body-container').hasClass('about')==true) {
				this.getabout();
			} else if ($('#body-container').hasClass('education')==true) {
	
			} else if ($('#body-container').hasClass('experience')==true) {
	
			} else if ($('#body-container').hasClass('skills')==true) {
	
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
		getabout: function () {
			/*******************************************************
			todo : bring up 404 if check_menu_disabled returns true
			*******************************************************/
			if (this.check_menu_disabled('about')==false) {
				$.ajax({
    				url: resume.data.baseurl + 'index.php/Resume/About',
    				type: 'POST',
    				data: {'resumeid': this.data.resumeid, 'section_type': 'about'},
    				success: function(data){ 
    					$('#body-content').empty();
    					$('<div />', {
    						'id': 'objective'
    					}).appendTo('#body-content')
    					$.each(data.html, function () {
    						$('#body-header').html('About');
    						
    						$('<'+this.Frontend_Type+' />', {
    							'html': this.Field_Value
    						}).appendTo('#body-content #'+this.Ele_Id);

    						if (this.Field_Type.indexOf('Checkbox')>=0) {
    							$('<div />', {
    								'id': this.Ele_Id
    							}).appendTo('#body-content');
    						}
    					})
    				},
    				error: function(data) {
        				$('#body-container #about').removeClass('hidden');
    				}
				});
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
		load_skill_dets : function (skills, ele) {
			var name = $(ele).data('name');
			var thisobj = this.lookup_skills(name, skills);

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

			this.load_project_skills(thisobj);
		}
	}

	resume.init();



}(jQuery));