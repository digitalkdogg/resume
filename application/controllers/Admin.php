<?php

class Admin extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
    }

     public function index(){
     	$this->load->view('admin/html_header');
     	$this->load->view('body_container_fluid');
     	$this->load->view('admin/body_header');
     	$this->load->view('admin/body_wrapper');
     	
     	$this->load->model('Site_meta');
     	$site = array('data' => $this->Site_meta->get_menu());
     	$this->load->view('admin/menu_left', array("site" => $site));

     	$this->load->model('Resume');
     	$resumes = array('data' => $this->Resume->get_by_user('1'));
     	$this->load->view('admin/resume_dashboard', array("resumes" => $resumes));
		
     	$this->load->view('admin/close_body');
     }

     public function meta() {
     	$resumeid = $this->uri->segment(3, 0);

     	$this->load->view('admin/html_header');
     	$this->load->view('body_container_fluid');
     	$this->load->view('admin/body_header');
     	$this->load->view('admin/body_wrapper');
     	
     	$this->load->model('Site_meta');
     	$site = array('data' => $this->Site_meta->get_menu());
     	$this->load->view('admin/menu_left', array("site" => $site));

     	$this->load->model('MetaModel');
     	$meta = array("data" => $this->MetaModel->get_by_user($resumeid));
     	$this->load->view('admin/body_meta', array("meta" => $meta));

     	$this->load->view('admin/close_body');
     }

}//end class