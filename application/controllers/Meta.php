<?php

class Meta extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
        $this->load->library('session');
    }

    public function save_meta() {

    	$data = $this->input->post('data');
    	$data = json_decode($data);


     	if ($this->session->userdata('islogin') != true) {
     		$data = null;
     	}

    	if ($data != NULL) {
	    	foreach($data as $item) {
	  	 		$dataarray[$item->metaid] = array('Section_Details_Id'=>$item->metaid, 'Field_Value'=>$item->FieldValue);
	    	}

	    	if (sizeof($dataarray)>0) {
	    		try {
	    			$this->load->model('UpdateModel');
	     			$meta = array("data" => $this->UpdateModel->save_meta($dataarray));

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