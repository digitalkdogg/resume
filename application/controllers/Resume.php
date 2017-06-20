<?php

class Resume extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url'); 
        $this->load->database();
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
        $this->load->model('about');
        $html = $this->about->get('1');
        echo $html->Details;
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

}
?>