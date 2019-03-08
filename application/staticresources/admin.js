(function($){

admin = {'meta': {},  
	'core': core,
	getchangedinput: function (obj) {
		var returnobj={}
		$.each(obj, function () {
			if (this.changed == true) {
				returnobj[this.name] = {'metaid': this.metaid, 'FieldValue': this.value}
			}
		})
		return returnobj;
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
	}

}

$('#the-guts.meta .data').each(function (index, val) {
	admin.meta[$(this).attr('id')] = {'name': $(this).attr('data-labelname'), 
									'value': $(this).val(),
									'eleid': $(this).attr('id'),
									'metaid': $(this).attr('data-fieldid')} 
})

$('#the-guts input.data').click(function (index, val) {
	$('#save').prop("disabled", false); 
})

$('#the-guts input.data').change(function (index, val){
	var lookupid = $(this).attr('id');
	var oldval = admin.meta[lookupid].value;
	var newval = $(this).val();
	

	if (oldval.trim() != newval.trim()) {
		admin.meta[lookupid].value = newval.trim();
		admin.meta[lookupid]['changed'] = true;
		$(this).val(newval.trim());

		$('#save').prop("disabled", false); 
	} else {
		admin.meta[lookupid].value = newval.trim();
		admin.meta[lookupid]['changed'] = false;
		$(this).val(oldval.trim());
	}
})

$('#the-guts .resume-item').click(function () {
	var id = $(this).attr('data-id');
	if (id != undefined) {
		window.location = 'admin/meta/'+id
	}
})


$('#the-guts button#save').click(function () {
	/************************************************
	Todo : make ajax url dynamic 
	*********************************************/
	var obj = $(this).attr('data-obj');
	var table = $(this).attr('data-table');
	if (obj != undefined) {
		$this = $(this)

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
	} 

})

//function callback(data) {alert('hi');}

})(jQuery);