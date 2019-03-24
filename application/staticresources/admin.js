(function($){

admin = {'meta': {},  
	'core': core,
	getchangedinput: function (obj) {

		var returnobj={}
		$.each(obj, function () {
			console.log(this);
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
	save_meta: function ($this) {
		var obj = $($this).attr('data-obj');
		var table = $($this).attr('data-table');

		var data = admin.getchangedinput(admin[obj]);
		if (Object.keys(data).length > 0 ) {
			data = {'data': JSON.stringify(data)};
			$($this).find('.fa-spin').removeClass('hidden');
			$($this).find('span.txt').addClass('hidden');
			$.ajax({
				'url': admin.core.baseurl + '/index.php/'+table,
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
		if (admin.sizeofobj(admin.meta.sister)>=0) {
			if ($('button#add-new-btn').length > 0) {
				var sisters;
				var len;
				var sisterid;
				var sectionid;

				if ($('div#the-guts textarea.has-sister').length > 0 ) {

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
				} else {
					sectionid = $('#the-guts div.checkbox.is-sister').attr('data-section');
					sisterid =  $('#the-guts div.checkbox.is-sister').attr('data-fieldid');

				}
				$('button#add-new-btn').attr('data-sisterid', sisterid);
				$('button#add-new-btn').attr('data-section', sectionid);
			}
		}
	}
}

$('#the-guts.meta div.checkbox').each(function (index, val) {
	var checked = $(this).attr('data-value');
	if (checked == 'checked') {
		$(this).addClass('checked');
	}

	admin.meta[$(this).attr('id')] = {'name': $(this).attr('data-labelname'), 
									'value': $(this).attr('data-value'),
									'eleid': $(this).attr('id'),
									'metaid': $(this).attr('data-fieldid')} 

})


$('#the-guts.meta select.data').each(function (index, val) {
	if ($(this).attr('data-value') != '') {
		$(this).val($(this).attr('data-value'));
	}
	admin.meta[$(this).attr('id')] = {'name': $(this).attr('data-labelname'), 
									'value': $(this).attr('data-value'),
									'eleid': $(this).attr('id'),
									'metaid': $(this).attr('data-fieldid')} 
})

$('#the-guts.meta input.data').each(function (index, val) {
	admin.meta[$(this).attr('id')] = {'name': $(this).attr('data-labelname'), 
									'value': $(this).val(),
									'eleid': $(this).attr('id'),
									'metaid': $(this).attr('data-fieldid')} 
})

$('#the-guts.meta textarea.data').each(function (index, val) {
	if ($(this).hasClass('has-sister')==true) {
		var sisterid = $(this).attr('data-sisterid');
		var id = $(this).attr('id');
		var classlist = $(this).attr('classList');
		$(this).closest('.row').attr('data-sisterid', sisterid);
		$(this).closest('.row').addClass('has-sister');	

		admin.meta['sister'] = {};
		admin.meta.sister[sisterid] = {sisterid: sisterid, 
								'id': id,
								'class': classlist};	
	}

	admin.meta[$(this).attr('id')] = {'name': $(this).attr('data-labelname'), 
									'value': $(this).val(),
									'eleid': $(this).attr('id'),
									'metaid': $(this).attr('data-fieldid')} 
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

})(jQuery);