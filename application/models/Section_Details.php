<?php

class Section_Details extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_by_user($resumeid){
        
        //SELECT * FROM Resume
        //join Section on Section.Resume_Number = Resume.Resume_Number
        //join Section_Details on Section_Details.Section_Id = Section.Section_Sequence_Number
        //join Section_Type on Section_Type.Section_Type_Id = Section.Section_Type_Id 
        //where Section_Type.Name = 'Meta' and Resume.Resume_Number = 1

        $this->db->select('*');
        $this->db->from('Resume');
        $this->db->join('Section', 'Section.Resume_Number = Resume.Resume_Number');
        $this->db->join('Section_Details', 'Section_Details.Section_Id = Section.Section_Sequence_Number');
        $this->db->join('Section_Type', 'Section_Type.Section_Type_Id = Section.Section_Type_Id');

        $this->db->where('Section_Type.Name ', 'Meta');
        $this->db->where('Resume.Resume_Number', '1' );
         
        $query = $this->db->get();

        return $query->result();
    }
}