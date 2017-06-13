<?php

class User extends CI_Model {

    public $title;
    public $content;
    public $date;

    public function __construct() {
        parent::__construct();
    }

    public function get($id){
        return null;
        //return $this->db->get_where('posts', array('id' => $id))->row();
    }

    public function get_all() {
        $query = $this->db->get('User');
        return $query->result();
    }
}