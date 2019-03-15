<?php class Site_meta extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_menu() {
    	 $this->db->where('Name', 'Menu');
    	 $this->db->order_by('Order', 'asc');
        $query = $this->db->get('SiteMeta');
        return $query->result();
    }
}
?>