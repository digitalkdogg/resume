<?php

class Education extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        
        return $this->db->get_where('Education', array('Userid' => $id))->row();
    }

    public function get_all() {
        $query = $this->db->get('Education');
        return $query->result();
    }
}