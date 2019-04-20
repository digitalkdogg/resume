<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
class Printres extends CI_Controller {
 
    public function index()
    {
        $this->load->helper('url');
        $this->load->database();

        $mpdf = new \Mpdf\Mpdf();
     
        $username = $this->uri->segment(3, 0);
        $resumeid = $this->uri->segment(4, 0);
        $page = $this->uri->segment(5, 'About');

        $this->load->model('Site_meta');
        $menu = $this->Site_meta->get_res_menu();

        if(is_null($resumeid) != true) {

            $this->load->model('about');
            $this->load->model('education');
            $this->load->model('experience');
            $this->load->model('skills');
            $social = $this->about->get_by_resume($resumeid, 'socialmedia');
            $contactinfo = $this->about->get_by_resume($resumeid, 'contactinfo');
            $about = $this->about->get_by_resume($resumeid, 'About');
            $sisterexp = $this->experience->get_sisters('Experience', $resumeid);
            $sisterskills = $this->skills->get_sisters('Skills', $resumeid);
            $sisteredu = $this->education->get_sisters('Education', $resumeid);
        }   

          $expdata = null;
          foreach($sisterexp as $sister) {
             $sisterid = $sister->Section_Details_Id;
             $rec = $this->experience->get_by_sisterid($sisterid, $resumeid);
             $expdata[$sisterid] = $rec;
          }

          $skillsdata = null;
          $skillsyears = null;
           foreach($sisterskills as $sister) {
             $sisterid = $sister->Section_Details_Id;
             $rec = $this->skills->get_by_sisterid($sisterid, $resumeid);
             $years = $this->skills->get_num_years($sisterid, $resumeid);
             $skillsdata[$sisterid] = $rec;
             if ($years != null) {
               $skillsyears[$sisterid] = $years[0]->Field_Value;
              }
          }

          $edudata = null;
          foreach($sisteredu as $sister) {
             $sisterid = $sister->Section_Details_Id;
             $rec = $this->education->get_by_sisterid($sisterid, $resumeid);
             $edudata[$sisterid] = $rec;
          }


        $data = null;
        $data['resumeid'] = $resumeid;
        $data['username'] = $username;
        $data['contactinfo'] = $contactinfo;
        $data['social'] = $social;
        $data['about'] = $about;
        $data['experience'] = $expdata;
        $data['skills'] = $skillsdata;
        $data['skillsyears'] = $skillsyears;
        $data['education'] = $edudata;
      //  var_dump($education);

        
        $data['resumename'] = 'I need to change this';
     
       // $html = trim($this->load->view('pdf/html_head', array('data'=>$data) , TRUE)," \t\n\r");
        $html = trim($this->load->view('pdf/pdf_body', array('data'=>$data) , TRUE)," \t\n\r");
       
     //   echo $html;
        //var_dump($html); 

    
        $mpdf->WriteHTML(trim($html, " \t\n\r"));
       // $mpdf->DeletePages(1);
       // var_dump($mpdf);
       $mpdf->Output(); // opens in browser
        //$mpdf->Output('arjun.pdf','D'); // it downloads the file into the user system, with give name
    }
 
}
?>