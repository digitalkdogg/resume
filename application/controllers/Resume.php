<?php

class Resume extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
    }


    public function view() {
        $username = $this->uri->segment(3, 0);
        $resumeid = $this->uri->segment(4, 0);
        $page = $this->uri->segment(5, 'About');

        if(is_null($resumeid) != true) {
            $this->load->model('user');
            $query=$this->user->get(array('username'=>$username, 'resumeid'=>$resumeid));
            $header['query'] = $query;
        } else {
            $header['query'] = Array();
        }   

        $this->load->view('html_header', $header);  //header is passed in order to create js
        $this->load->view('body_container', array('resumeid' => $resumeid));

        $this->load->view('body_header', $header);
        $this->load->view('nav_menu');
        $this->load->view('row_spacer');
        $this->load->view('body', array('type'=>$page));
        $this->load->view('modal');
        $this->load->view('footer', $header);

    }

    public function index(){
        
    	//$query = $this->db->query('SELECT Username, Firstname, Lastname, Email, Phone FROM User');
        $this->load->model('user');
        $query=$this->user->get_all();
        $queryresults['query'] = $query;

        $this->load->view('html_header');
        $this->load->view('body_container');
        $this->load->view('body_header', $queryresults);
        $this->load->view('nav_menu');

       $this->load->view('row_spacer');
        $this->load->view('body');
        $this->load->view('modal');
        $this->load->view('footer');
    }

    public function About() {
        $resumeid = $this->input->post('resumeid');
        $section = $this->input->post('section_type');
        try {
            $this->load->model('about');
            $html = $this->about->get_by_resume($resumeid, $section);
             return $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('html'=> $html)));
        } catch(exception $e) {
            echo 'error';
        }
    }

    public function Education() {
        $this->load->model('education');
        $html = $this->education->get('1');
        if ($html != null ) {
            return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode(array(
                    'school' => $html->School,
                    'City' => $html->City,
                    'State' => $html->State,
                    'Degree' => $html->Degree,
                    'GradYear' => $html->GradYear,  
                    'DegreeType'=>$html->DegreeType  
            )));
        }
      return $this->output
      ->set_content_type('application/json')
      ->set_output(null);
    }

     public function Experience() {
        $this->load->model('experience');
        $html = $this->experience->get('1');

        if ($html != null ) {

            return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($html));
        }
        return $this->output
      ->set_content_type('application/json')
      ->set_output(null);

    }

    public function Skills() {
        $this->load->model('skills');
        $html = $this->skills->get('1');

        if ($html != null) {
            return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($html)); 
        }
        return $this->output
      ->set_content_type('application/json')
      ->set_output(null);

    }

    public function Contact() {
        $data = $this->input->post();
        $this->load->library('email'); 
        $html = array();
        $this->email->from($data['email'], $data['name']);
        $this->email->to('KevinBollman@gmail.com');
 
        $this->email->subject('Contact Me Submission');
        $this->email->message($data['msg']);
        //$this->email->send();
        
        return $this->output
        ->set_content_type('application/json')
        ->set_output(json_encode($data)); 
    }

     public function ProjectSkill() {
        $data = $this->input->post();
        $this->load->model('projects');

        if (sizeof($data) > 0) {
            $html = $this->projects->get_project_for_skill($data['thisid']);
        } else {
            $html = null;
        }
        if ($html != null) {
            return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($html)); 
        }      


        return $this->output
        ->set_content_type('application/json')
        ->set_output(null); 
    }

}
?>