<?php

class Experience extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        $this->db->order_by('realstartdate desc');
        $this->db->where('Userid', '1');
        $query = $this->db->get('Experience');
        return $query->result();
    }

    public function get_all() {
        $query = $this->db->get('Experience');
        return $query->result();
    }
}