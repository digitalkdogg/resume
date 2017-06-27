<?php

class Projects extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get($id){

        return $this->db->get_where('Project', array('Userid' => $id))->row();
    }

    Public function get_project_for_skill($id){

        $this->db->select('proj.id');
        $this->db->select('ProjectName');
        $this->db->select('ProjectDetails');
        $this->db->select('DateCompleted');
        $this->db->from('Skill AS skill');
        $this->db->where(array('skill.id'=>$id));
        $this->db->join('SkillProject AS SKP', 'skill.ID = SKP.Skillid', 'INNER');
        $this->db->join('Project AS proj', 'proj.ID = SKP.Projectid', 'INNER');
        
        $result = $this->db->get()->result();
    
        return $result;
  //select Name, Project.ProjectName from Skill inner join SkillProject on Skill.id = SkillProject.Skillid inner join Project on SkillProject.Projectid = Project.id

}
    public function get_all() {
        $query = $this->db->get('Project');
        return $query->result();
    }
}
