<?php

class User extends CI_Model {

    public $title;
    public $content;
    public $date;

    public function __construct() {
        parent::__construct();
    }

    public function get($data){

        //select Meta.FieldValue, Fields.Name from Meta
        //join Fields_Relationships on Fields_Relationships.id = Meta.fieldrelationshipid
        //join Fields on Fields.id = Fields_Relationships.fieldid
        //join Resume on Resume.id = Fields.resumeid 
        //Join User on User.Userid = Resume.Userid
        //where User.Username = 'KevinBollman'
        //and Resume.id = 1

        $this->db->select('Meta.FieldValue, Fields.Name, Fields.eleid');
        $this->db->join('Fields_Relationships', 'Fields_Relationships.id = Meta.fieldrelationshipid');
        $this->db->join('Fields', 'Fields.id = Fields_Relationships.fieldid');
        $this->db->join('Resume', 'Resume.id = Fields.resumeid');
        $this->db->join('User', 'User.Userid = Resume.Userid');

        $query = $this->db->where(array('User.Username'=>$data['username'], 'Resume.id'=> $data['resumeid']));
        $query = $this->db->get('Meta');
        return $query->result();
        //return $this->db->get_where('posts', array('id' => $id))->row();
    }

    public function get_all() {
        $query = $this->db->get('User');
        return $query->result();
    }

    public function auth($data) {
        $this->db->where('Username', $data['username']);
        $query = $this->db->get('User');
        return $query->result();
    }

}