<?php class About extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        return $this->db->get_where('About', array('Userid' => $id))->row();
    }

    public function get_all() {
        $query = $this->db->get('About');
        return $query->result();
    }

}