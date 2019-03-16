<?php

class Admin extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
        $this->load->library('session');
    }

    public function tempsession() {
        $config['upload_path'] = 'uploads/';
        $config['allowed_types'] = '*';
        $config['max_filename'] = '255';
        $config['encrypt_name'] = TRUE;
        $config['max_size'] = '1024'; //1 MB

        if (isset($_FILES['file']['name'])) {
            if (0 < $_FILES['file']['error']) {
                echo 'Error during file upload' . $_FILES['file']['error'];
            } else {
                if (file_exists('uploads/' . $_FILES['file']['name'])) {
                    echo 'File already exists : uploads/' . $_FILES['file']['name'];
                } else {
                    $this->load->library('upload', $config);
                    if (!$this->upload->do_upload('file')) {
                        echo $this->upload->display_errors();
                    } else {
                        echo 'File successfully uploaded : uploads/' . $_FILES['file']['name'];
                        return $this->output
                          ->set_content_type('application/json')
                          ->set_output(json_encode(array('msg' =>$_FILES['file']['name'])));
                    }
                }
            }
        } else {
            echo 'Please choose a file';
        }

        //var_dump($config);
        return $this->output
              ->set_content_type('application/json')
              ->set_output(json_encode(array('msg' =>'Your password appears to be incorrect')));

    	$this->session->unset_userdata('islogin');
    	//$this->session->set_userdata('islogin', true);
    }

     public function index(){
     	/******************************************
      @todo : make user dynameic 
      ******************************************/

      $this->load->view('admin/html_header');
     	$this->load->view('body_container_fluid');
     	$this->load->view('admin/body_header');
     	$this->load->view('admin/body_wrapper_12');
     	
     	if ($this->session->userdata('islogin')== true) {
     	//	$this->load->model('Site_meta');
     	//	$site = array('data' => $this->Site_meta->get_menu());
     	//	$this->load->view('admin/menu_left', array("site" => $site));

     		$this->load->model('Resume');
     		$resumes = array('data' => $this->Resume->get_by_user('1'));
     		$this->load->view('admin/resume_dashboard', array("resumes" => $resumes));
		
     		$this->load->view('admin/close_body');
     	} else {
     		redirect (base_url() . 'index.php/admin/login', 'refresh');
     	}
     }

     public function login() {
     	$this->load->view('admin/html_header');
     	$this->load->view('body_container_fluid');
     	$this->load->view('admin/body_header');
     	$this->load->view('admin/body_wrapper_12');

     	$this->load->view('admin/login');
	
 		$this->load->view('admin/close_body');     	
     }

     public function dologin() {
        $this->load->helper('kevcrypt');
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        $this->session->unset_userdata('islogin');

        $this->load->model('User');

        $password = hex2bin($password);
        $password = decrypt($password);

        if ($username != NULL && $password != NULL ) {
       		$user = $this->User->auth(array('username'=>$username));
       		foreach($user as $auser) {
       			if (password_verify($password, $auser->Password) == true) {
       				$this->session->set_userdata('islogin', true);
       				return $this->output
      				->set_content_type('application/json')
      				->set_output(json_encode(array('msg' => 'login successful', 'id' => $this->session->session_id)));
       			} else {
       				$this->session->sess_destroy();
       				return $this->output
      				->set_content_type('application/json')
      				->set_output(json_encode(array('msg' =>'Your password appears to be incorrect')));
       			}
       		}
        	
        }

    	return $this->output
      		->set_content_type('application/json')
      		->set_output(json_encode(array('msg' =>'Could not login you in')));
     }

     public function meta() {

      $type = $this->uri->segment(3, 0);
     	$resumeid = $this->uri->segment(4, 0);

     	$this->load->view('admin/html_header');
     	$this->load->view('body_container_fluid');
     	$this->load->view('admin/body_header');
     	$this->load->view('admin/body_wrapper');
     	
     	if ($this->session->userdata('islogin')== true) {

       	$this->load->model('Site_meta');
      	$site = array('data' => $this->Site_meta->get_menu());
        foreach ($site as $link) {
          foreach($link as $attr) {
            $attr->resumeid = $resumeid;
          }
        }

       	$this->load->view('admin/menu_left', array("site" => $site));

        if ($resumeid != null ) {  
  	     	$this->load->model('Section_Details');
  	     	$meta = array("data" => $this->Section_Details->get_by_user($resumeid, $type));
          if (sizeof($meta['data']) != 0) {
            $this->load->view('admin/body_details', array("meta" => $meta));
          }
  	     	$this->load->view('admin/close_body');
        }
	    } else {
     		redirect (base_url() . 'index.php/admin/login', 'refresh');
     	}

     }

  public function social() {
    /******************************************
    get rid of function.  replace by meta
    *********************************************/

      $resumeid = $this->uri->segment(3, 0);

      $this->load->view('admin/html_header');
      $this->load->view('body_container_fluid');
      $this->load->view('admin/body_header');
      $this->load->view('admin/body_wrapper');
      
      if ($this->session->userdata('islogin')== true) {

        $this->load->model('Site_meta');
        $site = array('data' => $this->Site_meta->get_menu());
        foreach ($site as $link) {
          foreach($link as $attr) {
            $attr->resumeid = $resumeid;
          }
        }

        $this->load->view('admin/menu_left', array("site" => $site));

        if ($resumeid != null ) {  
          $this->load->model('Section_Details');
          $social = array("data" => $this->Section_Details->get_by_user($resumeid, 'SocialMedia'));

          $this->load->view('admin/body_details', array("meta" => $social));

          $this->load->view('admin/close_body');
        }
      } else {
        redirect (base_url() . 'index.php/admin/login', 'refresh');
      }

     }

}//end class