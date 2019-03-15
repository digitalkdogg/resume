<?php

class User extends CI_Model {

    public $title;
    public $content;
    public $date;

    public function __construct() {
        parent::__construct();
    }

    public function get($data){

        //select * from Resume
        //join Section on Section.Resume_Number = Resume.Resume_Number
        //join Section_Type on Section_Type.Section_Type_Id = Section.Section_Type_Id
        //join Section_Details on Section_Details.Section_Id = Section.Section_Sequence_Number
        //where Resume.Resume_Number = '1' and Section_Type.Name = 'Meta'
        $this->db->select('Section_Details.Field_Label, Section_Details.Field_Value, Section_Details.Ele_Id, Section_Details.Field_Type, Section_Type.Name');
        $this->db->join('Section', 'Section.Resume_Number = Resume.Resume_Number');
        $this->db->join('Section_Type', 'Section_Type.Section_Type_Id = Section.Section_Type_Id');
        $this->db->join('Section_Details', 'Section_Details.Section_Id = Section.Section_Sequence_Number');

        $query = $this->db->where(array('Resume.Resume_Number'=> $data['resumeid']));
        $query = $this->db->get('Resume');
        return $query->result();
        //return $this->db->get_where('posts', array('id' => $id))->row();
    }

    public function get_all() {
        $query = $this->db->get('User');
        return $query->result();
    }

    public function auth($data) {
        $this->db->where('Username', $data['username']);
        $query = $this->db->get('User');
        return $query->result();
    }

}