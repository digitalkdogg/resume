<?php class Resume extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_by_user($userid) {
    	 $this->db->where('User_Id', $userid);
        $query = $this->db->get('Resume');
        return $query->result();
    }

}
?>