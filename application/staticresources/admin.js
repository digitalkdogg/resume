(function($){
admin = {'meta': {},  
	'core': core,
	'fieldmap': {
		'Field_Label': 'data-labelname',
		'Field_Value': 'data-value',
		'Ele_Id' : 'id',
		'Section_Details_Id' : 'data-fieldid',
		'Sister_Field': 'data-sisterid',
		'Section_Id': 'data-section',
		'Frontend_Type' : 'data-frontendtype',
		'Order_Num': 'data-order'
	},
	load_date_pickers: function () {
		setTimeout(function () {
			var dateoptions = {
    			dateFormat: "m-d-Y",
			}
			$('input.datepicker').each(function () {
				var fieldid = $(this).attr('data-fieldid')
				var $this = $(this);
				var sisterid = $(this).attr('data-sisterid');
				var cal = $($this).flatpickr(dateoptions);
				$($this).wrap('<div id = "' + fieldid +'" data-sisterid = "' + sisterid + '">');
				$($this).attr('readonly', false)
				$('<span>', {
					'class':'flatpickr fa fa-calendar calendar',
					'id' : 'span_' + fieldid,
				}).insertAfter($($this))

				$('span#span_'+fieldid).on('click', function () {
					cal.open();
				})
			})
		}, 500)
	
	},
	getchangedinput: function (obj) {

		var returnobj={}

		$.each(obj, function () {
			if (this.changed == true) {
				returnobj[this.name] = {'metaid': this.metaid, 'FieldValue': this.value}
			}
		})
		return returnobj;
	},
	sizeofobj: function (obj) {
    	var count = 0,
        	key;

    	for (key in obj) {
        	if (obj.hasOwnProperty(key)) {
            	count++;
        	}
    	}

    	return count;
	},
	displayStatus: function (ele, statustxt, initdelay) {
		$(ele).html(statustxt);
		$(ele).removeClass('hidden');
		setTimeout(function () {
			$( ele ).animate({opacity: 0.25,fontSize: '12px'},3000,
  			function() {
    			$(ele).addClass('hidden');
  			});
		}, initdelay);
	},
	set_parent_row: function ($this) {
		var sisterid = $($this).attr('data-sisterid');
		var fieldid = $($this).attr('data-fieldid');
		var order = $($this).attr('data-order');
 		$($this).addClass('has-sister');
 		$($this).closest('.row').attr('data-sisterid', sisterid);
		$($this).closest('.row').addClass('has-sister');	
		$($this).closest('.row').attr('data-id', fieldid);
		$($this).closest('.row').attr('data-order', order);
	},
	add_rec_obj: function (rec, obj, thekey) {
		var eleid = rec.Ele_Id;
		var id = rec.Section_Details_Id;
		var fieldlabel = rec.Field_Label;
		var name = rec.Field_Label;
		var metaid = rec.Section_Details_Id;
		var value = rec.Field_Value;
		var frontendtype = rec.Frontend_Type;
		var sisterfield = rec.Sister_Field;
		var section = rec.Section_Id;
		var order = rec.Order_Num;
		var value = rec.value;

		if (eleid != undefined && metaid != undefined) {

			var objid = eleid + '_' + metaid;
			if (thekey == undefined) {
				thekey = objid;
			}
			obj[thekey] = {}

			if (name != undefined) {
				obj[thekey]['name'] = name;
			}
			if (eleid != undefined) {
				obj[thekey]['eleid'] = eleid;
			}
			if (metaid != undefined) {
				obj[thekey]['metaid'] = metaid;
			}
			if (value != undefined) {
				obj[thekey]['value'] = value;
			}
			if (frontendtype != undefined) {
				obj[thekey]['frontendtype'] = frontendtype;
			}
			if (sisterfield != undefined) {
				obj[thekey]['sisterfield'] = sisterfield;
			}
			if (section != undefined) {
				obj[thekey]['section'] = section;
			}
			if (order != undefined) {
				obj[thekey]['order'] = order;
			}

			if (value != undefined) {
				obj[thekey]['value'] = value;
			}

		}
	},
	save_meta: function ($this) {
		var obj = $($this).attr('data-obj');
		var table = $($this).attr('data-table');

		var data = admin.getchangedinput(admin[obj]);

		if (Object.keys(data).length > 0 ) {
			data = {'data': JSON.stringify(data)};
			$($this).find('.fa-spin').removeClass('hidden');
			$($this).find('span.txt').addClass('hidden');
			$.ajax({
				'url': admin.core.baseurl + 'index.php/'+table,
				'type': 'POST',
				'data': data,
				'complete': function (data) {
					if (data.responseText == 'success') {
						admin.displayStatus($('span#status'), 'Record Has Been Updated', 2000);
						$('#save').attr("disabled", "disabled");
					} else {
						admin.displayStatus($('span#status'), '<span class = "error">' + data.responseText + '</span>', 10000);
					}
					$($this).find('.fa-spin').addClass('hidden');
					$($this).find('span.txt').removeClass('hidden');
				}
			})
		} 
	},
	save_meta_file: function ($this , form_data) {
		var obj = $($this).attr('data-obj');
		var table = $($this).attr('data-table');
		$($this).find('.fa-spin').removeClass('hidden');
		$($this).find('span.txt').addClass('hidden');

		var profilechanged = false;
		$.each(admin.meta, function () {
			if (this.eleid == 'profile') {
				if (this.changeed == true) {
					profilechanged = true;
				}
			}
		})
		if (profilechanged == true) {
			$.ajax({
				'url': admin.core.baseurl + '/index.php/Meta/save_meta_file',
				'type': 'POST',
				'data': form_data,
				'cache': false,
	            'contentType': false,
	            'processData': false,
				'complete': function (data) {
					data = data.responseJSON; 
					if (data.status == 'success') {
						admin.displayStatus($('span#status'), 'Image Uploaded!', 2000);
						$('#save').attr("disabled", "disabled");
						admin.meta.profile.value = data.file;
						admin.check_for_images();
					} else {
						admin.displayStatus($('span#status'), '<span class = "error">' + data.msg + '</span>', 10000);
					}
					setTimeout(function () {
						admin.save_meta($this);
					},1000)
				
					$($this).find('.fa-spin').addClass('hidden');
					$($this).find('span.txt').removeClass('hidden');
				}
			})
		} else {
			admin.save_meta($this);
		}
	},
	check_for_images: function () {
		/*********************************************
		todo : flag if a file input is found    
		*********************************************/

		$('input[type = "file"]').each(function () {
			admin.meta['foundfile'] = true;
			var $this = $(this);
			var fieldid = $(this).attr('data-fieldid');
			var value = $(this).attr('value');

			if (fieldid != undefined) {
				$('div#profile-wrap').each(function () {
					if ($(this).attr('data-fieldid')==fieldid) {
						$(this).empty();
						var picval = value;
						
						if (admin.meta.profile.value != '') {
							picval = admin.meta.profile.value;
						}
						$('<img />', {
							'src': admin.core.baseurl + 'uploads/' + picval,
							'class': 'thumbnail',
							'id': 'profile-pic',
							'data-fieldid': fieldid
						}).appendTo($(this));						
					}
				})
			}
		})
	},
	check_for_sisters: function () {
		/************************************************************************
		This function first makes sure that there are sisters. If there
		are than it loops through the sisterwrappers to find all the has-sisters.
		Inside of that loops it loops through all the issisters to combine
		them together.  Finally it moves the add button to the button of said 
		wrapper
		****************************************************************************/
		if (admin.sizeofobj(admin.meta.sister)>=0) {
			var len;
			var sisterid;
			var sectionid;

			if ($('div#the-guts div.has-sister').length > 0 ) {
				var sisterwrappers = $('div#sister-wrapper');
				var sisters = $('div.has-sister');
				var sisterobj = {}
				$.each(sisterwrappers, function () {
					var $this = $(this);
					sisterid = $(this).attr('data-fieldid');
					sisterobj[sisterid] = {}
					$.each(sisters, function () {
						if (sisterid == $(this).attr('data-sisterid')) {
							sisterobj[sisterid][$(this).attr('data-order') + '_' + $(this).attr('data-id')] = $(this)
							sisterobj[sisterid] = admin.sortObject(sisterobj[sisterid]);
						}
					})

					$.each(sisterobj[sisterid], function () {
						$($this).append($(this))
					})
				
				})

				var addnewbtn = $('button#add-new-btn').closest('.row');
				var html = $(addnewbtn).html()
				$('button#add-new-btn').remove();
				sisters = $('div#the-guts textarea.has-sister')
				len = $(sisters).length	
				sisterid = $(sisters).attr('data-sisterid');
				sectionid = $(sisters).attr('data-section');

				var afterele = $(sisters[len-1])
				afterele = $(afterele).closest('div.row');
				$(afterele).after(html)	;


				if ($('#add-new').length >0) {
					var addnewbtn = $('button#add-new');

					$('#fields-wrapper div').each(function (index, val) {
						if ($(this).attr('data-sisterid')=='is-sister') {
							$(this).after(addnewbtn);
						}
					});
				}
			} else {
				sectionid = $('#the-guts div.checkbox.is-sister').attr('data-section');
				sisterid =  $('#the-guts div.checkbox.is-sister').attr('data-fieldid');

			}
			$('button#add-new-btn').attr('data-sisterid', sisterid);
			$('button#add-new-btn').attr('data-section', sectionid);
		}
	}, 
	sortObject : function (obj) {
    	return Object.keys(obj).sort().reduce(function (result, key) {
        	result[key] = obj[key];
        	return result;
    	}, {});
	},
	changeWysiwyg: function (html, thiseditor) {
		var thisone = admin.meta['pre-'+thiseditor];

		if (thisone != undefined) {
			if (thisone.value.trim() != html.trim()) {
				thisone['changed'] = true;
				thisone.value = html.trim();
				admin.meta['pre-'+thiseditor] = thisone 
			}
		} else {
			var thisone = {};
			thisone['changed']=true;
			thisone.value = html.trim();
			admin['newrec']= thisone;
		}


	},
	load_modal: function (ele) {
		var data =  $(ele).attr('data-target').replace('#', '');
		
		$.ajax({
			'url': admin.core.baseurl + 'index.php/admin/get_modal',
			'type': 'GET',
			'data': {'target' : data},
			'complete': function (data) {
				data = data.responseJSON
				var modalid = '#' + data.key;

				$.each(data.data, function () {
					var html = this.html;
					$(modalid + ' .modal-body').html(html)
				})

				admin.load_date_pickers();
				//admin.register_pells();
				
			}
		})
	},
	register_pell: function (editor, html) {
		/**************************************************** 
		this functions load the wysiwyg editors with 
		their correct html.
		 *******************************************************/
		if (html != undefined) {
			editor.content.innerHTML = html;
		}
	},
	add_new_experience: function (eleid) {
		var data = {}

		$('#'+eleid + ' .data').each(function (index, val) {
			var fieldlabel = $(this).attr('data-labelname');
			var fieldval = $(this).val();
			var fieldtype = $(this).attr('data-type');

			if ($(this).prop('nodeName')=='PRE') {
				if (fieldval == '' ){
					if (admin.newrec != undefined) {
						fieldval = admin.newrec.value
					}
				}
			}

			data[index] = {
				'Field_Label': fieldlabel,
				'Field_Value' : fieldval,
				'Ele_Id' : 'experience-' + fieldlabel.toLowerCase(),
				'Frontend_Type' : 'div',
				'Class_List': 'form-control ' + fieldlabel.toLowerCase(),
				'Field_Type': fieldtype,
				'Order_Num': index + 1,
				'Section_Id': 8
			}
		})

		var wrapper = {
			'Field_Label': 'Wrapper',
			'Field_Value' : 'Wrapper',
			'Ele_Id' : 'experience',
			'Frontend_Type' : 'div',
			'Class_List': 'na',
			'Field_Type': 'na',
			'Sister_Field': 'is-sister',
			'Order_Num': 0,
			'Section_Id': 8
		};

		$.ajax({
			'url': admin.core.baseurl + 'index.php/Meta/insert_meta',
			'data' : {data: JSON.stringify(wrapper)},
			'type': 'POST',
			'success': function (wrapperdata) {
				$.each(wrapperdata, function () {
					$('#add-new-experience').attr('data-sisterid', this.Section_Details_Id);
					$.each(data, function () {
						this['Sister_Field'] = $('#add-new-experience').attr('data-sisterid');
						console.log('wrappe was inserted');
					})
				})
				
				$.ajax({
					'url': admin.core.baseurl + 'index.php/Meta/insert_meta_batch',
					'data' : {'data' : JSON.stringify(data)},
					'type': 'POST',
					success: function (data) {
						console.log('main data inserted');
						$('button.action').text('Refreshing');
						admin.displayStatus($('span#modal_status'), 'Record Has Been Insert and we will now refresh', 2000);
						location.reload();
					},
					error: function (data) {
						admin.displayStatus($('span#modal_status'), '<span class = "error">' + data.msg + '</span>', 10000);
					}
				});
			}
		})

		
	}

}


admin.load_date_pickers();

$('#the-guts.meta div.checkbox').each(function (index, val) {
	var $this = $(this)
	var checked = $(this).attr('data-value');
	if (checked == 'checked') {
		$($this).addClass('checked');
	}

	 var rec = {}
	 $.each(admin.fieldmap, function (index, fieldval) {
	 	rec[index]= $($this).attr(fieldval)
	 })		

	admin.add_rec_obj(rec, admin.meta, $($this).attr('id'));

})


$('#the-guts.meta select.data').each(function (index, val) {
	var $this = $(this);
	if ($(this).attr('data-value') != '') {
		$(this).val($(this).attr('data-value'));
	}

	 var rec = {}
	 $.each(admin.fieldmap, function (index, fieldval) {
	 	rec[index]= $($this).attr(fieldval)
	 })		

	admin.add_rec_obj(rec, admin.meta, $($this).attr('id'));
})

$('#the-guts.meta input.data').each(function (index, val) {
	/****************************************************************
		Todo : get rid of the other admin.meta function.  doing 
		something wierd with an ajax call and the profile pic
	****************************************************************/
	var $this = $(this);
 	var rec = {}

 	if ($(this).attr('data-sisterid') != undefined) {
 		admin.set_parent_row($(this));
 	}

	 $.each(admin.fieldmap, function (index, fieldval) {
	 	rec[index]= $($this).attr(fieldval)
	 })		

	admin.add_rec_obj(rec, admin.meta, $($this).attr('id'));

	admin.meta[$(this).attr('id')] = {'name': $(this).attr('data-labelname'), 
									'value': $(this).val(),
									'eleid': $(this).attr('id'),
									'metaid': $(this).attr('data-fieldid')} 
})

$('#the-guts.meta pre.data.html-output').each(function () {
	var $this = $(this);
	var rec = {}

	if ($(this).attr('data-sisterid') != undefined) {
 		admin.set_parent_row($(this));
 	}

 	 $.each(admin.fieldmap, function (index, fieldval) {
	 	rec[index]= $($this).attr(fieldval)
	 })	

	 rec['value']= $(this).html().trim();

	admin.add_rec_obj(rec, admin.meta, 'pre-' + $($this).attr('data-fieldid'));

})

$('#the-guts.meta textarea.data').each(function (index, val) {
	var $this = $(this);
	if ($(this).hasClass('has-sister')==true) {
		var sisterid = $(this).attr('data-sisterid');
		var id = $(this).attr('id');
		var classlist = $(this).attr('classList');
		var fieldid = $(this).attr('data-fieldid');

		admin.set_parent_row($(this));

		admin.meta['sister'] = {};
		admin.meta.sister[sisterid] = {sisterid: sisterid, 
								'id': id,
								'class': classlist};	
	}
    
    if (sisterid != 'na' && sisterid != undefined) {
    	id = id + '_'+fieldid
    } else {
    	id = $(this).attr('id')
    }

    var rec = {}
	$.each(admin.fieldmap, function (index, fieldval) {
	 	rec[index]= $($this).attr(fieldval)
	 	if (index == 'Field_Value' ) {
	 		if ($($this).attr(fieldval)==undefined) {
	 			rec[index]= $($this).val();
	 		}
	 	}
	})		

	admin.add_rec_obj(rec, admin.meta, id);
})


$('#the-guts div.checkbox').click(function () {
	var lookupid = $(this).attr('id');
	if ($(this).hasClass('checked')== true) {
		$(this).removeClass('checked');
		$(this).attr('data-value', '');
	} else {
		$(this).addClass('checked');
		$(this).attr('data-value', 'checked');
	}
	admin.meta[lookupid]['value'] = $(this).attr('data-value');
	admin.meta[lookupid]['changed'] = true;
	$('#save').prop("disabled", false); 

})


$('#the-guts input.data').click(function (index, val) {
	$('#save').prop("disabled", false); 
})


$('#the-guts .data').change(function (index, val){

	var lookupid = $(this).attr('id');
	var oldval = admin.meta[lookupid].value;
	var newval = $(this).val();

	try {
		if (oldval.trim() != newval.trim()) {
			admin.meta[lookupid].value = newval.trim();
			admin.meta[lookupid]['changed'] = true;
			if ($(this).attr('type') != undefined) {
				if ($(this).attr('type') != 'file') {
					$(this).val(newval.trim());
				} else {
					var fileval = $(this).val();
					fileval = fileval.replace(/C:/g, '').replace(/fakepath/g,'');
					$('#profile-wrap').html(fileval);
				}
			}
			$('#save').prop("disabled", false); 
		} else {
			admin.meta[lookupid].value = newval.trim();
			admin.meta[lookupid]['changed'] = false;
			$(this).val(oldval.trim());
		}
	} catch (e) {console.log(e);}
})

$('#the-guts .resume-item').click(function () {
	var id = $(this).attr('data-id');
	if (id != undefined) {
		window.location = 'admin/meta/settings/'+id
	} else {
		if ($(this).hasClass('resume-item-new')==true) {
			console.log('function not done yet..... see ".resume-item click event" of admin.js');
		}
	}
})

$('#the-guts button.action').click(function () {
	var action = $(this).attr('data-action');
	action = action.replace(/-/g, '_');

	var id = $(this).closest('div.modal').attr('id')
	admin[action](id);
})

$('#the-guts .modal button#add-item').click(function () {
	/****************************************************************
		This click event for the add item (save) button from the modal
		Input : gets it stuff from data attr of the add-new-btn button
		output : does a ajax call to insert rec and than outputs the 
		return rec back onto the form
	*****************************************************************/
	var textareas = $('#the-guts .modal textarea');
	var itemcount = $('#the-guts textarea.has-sister').length+1
	var data = {};
	var sisterid = $('#add-new-btn').attr('data-sisterid');
	var sectionid = $('#add-new-btn').attr('data-section');

	if (sisterid != undefined && sectionid != undefined) {
		$.each(textareas, function (index, val) {
			item = index+1;
			data.Field_Label = 'Bullet ' + itemcount;
			data.Field_Value = $(this).val();
			data.Ele_id = 'show-career-highlights';
			data.Class_List = 'form-control has-sister';
			data.Field_Type = 'Textarea';
			data.Section_Id = sectionid;
			data.Sister_Field = sisterid;
			data.Frontend_Type = 'li';
		}) 
	} 

	if (admin.sizeofobj(data) > 0) {

		data = {'data': JSON.stringify(data)};

		$.ajax({
			'url': admin.core.baseurl + '/index.php/Meta/insert_meta',
			'data' : data,
			'type': 'POST',
			success: function (data) {
				$.each(data, function () {
					html = '<div class = "row ele">';
					html += '<div class = "col-lg-2 lable" data-labelid = "' + this.Section_Details_Id + '">'+ this.Field_Label + '</div>';
					html += '<div class = "col-lg-5 field">';
					html += '<textarea id = "' + this.Ele_Id + '" class = "data ' + this.Class_List +'" data-fieldid = "' + this.Section_Details_Id +'" data-labelname = "' + this.Field_Label + '"> '+ this.Field_Value + '</textarea>';
					html += '</div></div>';
					var len = $('#the-guts textarea.has-sister').length
					if (len >0) {
						var rowele = $('#the-guts textarea.has-sister')[len-1].closest('div.row');
					} else {
						var rowele = $('#the-guts div.checkbox.checked#'+this.Ele_Id).closest('div.row');
					}
					$(rowele).after(html)

					if (this.Section_Details_Id != undefined) {
						admin.add_rec_obj(this, admin.meta);
					}

				})

				$('#the-guts .modal textarea').each(function () {
					$(this).val('')
				})
				$('#the-guts .modal').modal('hide')
			},
			error : function () {

			}
		})
	}
})


$('#the-guts button#save').click(function () {
	var obj = $(this).attr('data-obj');

	if (obj != undefined) {
		$this = $(this)
		if (admin.meta.foundfile != undefined) {
			var file_data = $('#profile').prop('files')[0];
        	var form_data = new FormData();
        	form_data.append('file', file_data);
        	admin.save_meta_file($this, form_data);
    	} else {
    		admin.save_meta($this)
    	}
	} 

})

admin.check_for_images();
admin.check_for_sisters();

if ($('#editor.pell').length > 0) {
	//admin.register_pells();
}

})(jQuery);