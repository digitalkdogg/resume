<?php

class Education extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        
        return $this->db->get_where('Education', array('Userid' => $id))->row();
    }

    public function get_sisters($section, $resumeid) {
        $this->db->select('Section_Details.Section_Details_Id, Section_Details.Sister_Field');
        $this->db->from('Resume');
        $this->db->join('User', 'User.User_Id = Resume.User_Id');
        $this->db->join('Section', 'Section.Resume_Number = Resume.Resume_Number');
        $this->db->join('Section_Details', 'Section_Details.Section_Id = Section.Section_Sequence_Number');
        $this->db->join('Section_Type', 'Section_Type.Section_Type_Id = Section.Section_Type_Id');

        $this->db->order_by('Order_Num', 'ASC');

        $this->db->where('Section_Type.Name ', $section);
        $this->db->where('Resume.Resume_Number', $resumeid );
        $this->db->where('Section_Details.Sister_Field', 'is-sister');
         
        $query = $this->db->get();

        return $query->result();
    }

    public function get_by_sisterid($sisterid, $resumeid) {
        $this->db->select('Section_Details.Field_Value, Section_Details.Field_Label, User.User_Id, Section_Details.Section_Details_Id, Section_Details.Ele_Id, Section_Details.Field_Type, Section_Details.Frontend_Type, Section_Details.Sister_Field, Section_Details.Class_List, Section_Details.Order_Num');
        $this->db->from('Resume');
        $this->db->join('User', 'User.User_Id = Resume.User_Id');
        $this->db->join('Section', 'Section.Resume_Number = Resume.Resume_Number');
        $this->db->join('Section_Details', 'Section_Details.Section_Id = Section.Section_Sequence_Number');
        $this->db->join('Section_Type', 'Section_Type.Section_Type_Id = Section.Section_Type_Id');

        $this->db->order_by('Order_Num', 'ASC');

        $this->db->where('Resume.Resume_Number', $resumeid );
        $this->db->where('Section_Details.Sister_Field', $sisterid);
         
        $query = $this->db->get();

        return $query->result();
    }

    public function get_all() {
        $query = $this->db->get('Education');
        return $query->result();
    }
}