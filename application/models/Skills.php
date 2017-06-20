<?php

class Skills extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        
        $this->db->where('Userid', '1');
        $query = $this->db->get('Skill');
        return $query->result();
    }

    public function get_all() {
        $query = $this->db->get('Skill');
        return $query->result();
    }
}