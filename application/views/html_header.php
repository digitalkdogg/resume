<!DOCTYPE html>
<html lang="en-US">
<head><title>Kevin Bollman - Resume</title>
	<meta charset="UTF-8" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/resume.css" />
    <link rel="stylesheet" href="<?php echo base_url(); ?>application/staticresources/animate.css" />
    <script type="text/javascript" src="<?php echo base_url(); ?>application/staticresources/jquery-3-2-1.js"></script>

    <script type="text/javascript">
    var sitemeta = {};
    sitemeta['baseurl'] = '<?php echo base_url(); ?>';
    sitemeta['siteurl'] = '<?php echo current_url(); ?>';

    <?php foreach($query as $row) {
        if (strpos($row->Field_Type, 'Checkbox') !== false) {
            if ($row->Field_Value != 'checked') {
                $splitval = null;
                $splitval = explode(":", $row->Field_Type); ?>
                if (resume.menu == undefined) {
                    resume['menu'] = {}
                }
                if (resume.menu.hide == undefined) {
                    resume.menu['hide'] = new Array();
                }
                resume.menu.hide.push('<?php echo $splitval[1]; ?>');
<?php       }
        }
    }
    ?>
	</script>

</head>