<?php

class Meta extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
    }

    public function save_meta() {
    	$data = $this->input->post('data');
    	$data = json_decode($data);

    	if ($data != NULL) {
	    	foreach($data as $item) {
	  	 		$dataarray[$item->metaid] = array('metaid'=>$item->metaid, 'FieldValue'=>$item->FieldValue);
	    	}

	    	if (sizeof($dataarray)>0) {
	    		try {
	    			$this->load->model('MetaModel');
	     			$meta = array("data" => $this->MetaModel->save_meta($dataarray));

	     			foreach($meta as $response) {
	     				return $this->output
	      				->set_content_type('application/json')
	      				->set_output($response);
	     			}
	     		} catch(exception $e) {
	     			return $this->output
	      				->set_content_type('application/json')
	      				->set_output($e->getMessage());
	     		}

	    	}
	    } else {

    		return $this->output
      		->set_content_type('application/json')
      		->set_output('input data was null');
      	}
    }

}//end class
?>