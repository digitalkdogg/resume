<?php class About extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        return $this->db->get_where('Section_Details', array('Section_Details_Id' => $id))->row();
    }

    public function get_all() {
        $query = $this->db->get('About');
        return $query->result();
    }

    public function get_by_resume($resumeid, $section_name) {
         //SELECT Section_Details.Field_Value, User.User_Id, Section_Details.Section_Details_Id FROM Resume
        //join Section on Section.Resume_Number = Resume.Resume_Number
        //join User on User.User_Id = Resume.User_Id
        //join Section_Details on Section_Details.Section_Id = Section.Section_Sequence_Number
        //join Section_Type on Section_Type.Section_Type_Id = Section.Section_Type_Id 
        //where Section_Type.Name = 'Meta' and Resume.Resume_Number = 1

        $this->db->select('Section_Details.Field_Value, Section_Details.Field_Label, User.User_Id, Section_Details.Section_Details_Id, Section_Details.Ele_Id, Section_Details.Field_Type, Section_Details.Frontend_Type, Section_Details.Sister_Field, Section_Details.Class_List, Section_Details.Order_Num');
        $this->db->from('Resume');
        $this->db->join('User', 'User.User_Id = Resume.User_Id');
        $this->db->join('Section', 'Section.Resume_Number = Resume.Resume_Number');
        $this->db->join('Section_Details', 'Section_Details.Section_Id = Section.Section_Sequence_Number');
        $this->db->join('Section_Type', 'Section_Type.Section_Type_Id = Section.Section_Type_Id');

        $this->db->order_by('Order_Num', 'ASC');

        $this->db->where('Section_Type.Name ', $section_name);
        $this->db->where('Resume.Resume_Number', $resumeid );
         
        $query = $this->db->get();

        return $query->result();
    }

}