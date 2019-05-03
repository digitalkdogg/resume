<?php class Resume extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_by_user($userid) {
    	 $this->db->where('User_Id', $userid);
        $query = $this->db->get('Resume');
        return $query->result();
    }

    public function get_settings_by_resume($resumeid, $section) {
    	$this->db->select('Section_Details.Field_Value, Section_Details.Field_Label, User.User_Id, Section_Details.Section_Details_Id, Section_Details.Ele_Id, Section_Details.Field_Type, Section_Details.Frontend_Type, Section_Details.Sister_Field, Section_Details.Class_List, Section_Details.Order_Num');
        $this->db->from('Resume');
        $this->db->join('User', 'User.User_Id = Resume.User_Id');
        $this->db->join('Section', 'Section.Resume_Number = Resume.Resume_Number');
        $this->db->join('Section_Details', 'Section_Details.Section_Id = Section.Section_Sequence_Number');
        $this->db->join('Section_Type', 'Section_Type.Section_Type_Id = Section.Section_Type_Id');

        $this->db->order_by('Order_Num', 'ASC');

        $this->db->where('Section_Type.Name ', $section);
        $this->db->where('Resume.Resume_Number', $resumeid );
         
        $query = $this->db->get();

        return $query->result();
    }

    public function insert_new_resume($data) {

       $row = $this->db->select('Resume_Number')->limit(1)->order_by('Resume_Number', 'DESC')->get('Resume')->row();
       $row = $row->Resume_Number;
 
        $data['Resume_Number'] = $row+1;
        try {
            $this->db->insert('Resume', $data);
            return $this->db->insert_id();
        } catch (exception $e) {
            return false;
        }
    }
}
?>