<?php class Site_meta extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_menu() {
    	 $this->db->where('Name', 'Menu');
        $query = $this->db->get('SiteMeta');
        return $query->result();
    }
}
?>