<?php

class Meta extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
        $this->load->library('session');
    }

    public function save_meta_file() {
    	/*************************************************
    	todo : make user specific 
    	       overwrite
    	       make user id in session
    	************************************************/
    	$config['upload_path'] = 'uploads/';
        $config['allowed_types'] = '*';
        $config['max_filename'] = '255';
        $config['encrypt_name'] = FALSE;
        $config['max_size'] = '1024'; //1 MB

         if (isset($_FILES['file']['name'])) {
            if (0 < $_FILES['file']['error']) {
                $response = 'Error during file upload' . $_FILES['file']['error'];
             	$status = 'error';
             } else {
            	$filetype = $_FILES['file']['type'];
            	$filetype = str_replace('image/', '', $filetype);
            	$date = date('Y-m-d--H-i-s');

            	$_FILES['file']['name'] = '1__' . $date .'.' .$filetype;
                if (file_exists('uploads/' . $_FILES['file']['name'])) {
                    $response = 'File already exists : uploads/' . $_FILES['file']['name'];
                    $status = 'error';
                } else {
                    $this->load->library('upload', $config);
                    if (!$this->upload->do_upload('file')) {
                        $response=  $this->upload->display_errors();
                        $status = 'error';
                    } else {
                    	$status = 'success';
                    	$response = 'File successfully uploaded --' . $_FILES['file']['name'];
                    }
                }
            }
        } 
        return $this->output
	      		->set_content_type('application/json')
	      		->set_output(json_encode(array(
	      			'msg' => $response, 
	      			'file' => $_FILES['file']['name'],
	      			'status'=> $status)));

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

    public function insert_meta() {
        $data = $this->input->post('data');
        $data = json_decode($data);

        if ($this->session->userdata('islogin') != true) {
            $data = null;
        }

        if ($data != NULL) {
            
            $dataarray = array();

            
            foreach ($data as $key => $attr) {
                $dataarray[$key] = $attr;
            }
            if (sizeof($dataarray)>0) {
                try {
                    $this->load->model('UpdateModel');
                    $meta = array("data" => $this->UpdateModel->insert_meta($dataarray));

                    foreach($meta as $response) {
                        if (strpos($response, 'error') == false) {
                            $this->load->model('Section_Details');
                            $response = $this->Section_Details->get_by_id($response);
                        }
                        return $this->output
                        ->set_content_type('application/json')
                        ->set_output(json_encode($response));
                    }
                } catch(exception $e) {
                    return $this->output
                        ->set_content_type('application/json')
                        ->set_output($e->getMessage());
                }
            }

        }

        return $this->output
            ->set_content_type('application/json')
            ->set_output('input data was null');
    } 

}//end class
?>