<?php 
 if (!defined('BASEPATH'))
        exit('No direct script access allowed');

class UpdateModel extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function save_meta($data) {
    	try {
			$this->db->update_batch('Section_Details', $data, 'Section_Details_Id');
			return 'success';
		} catch (Exception $e) {
			return 'error : ' . $e->getMessage();
		}    
    }

    public function insert_meta($data) {
        try {
            $this->db->insert('Section_Details', $data);
            $id = $this->db->insert_id();
            return $id;
        } catch (Exception $e) {
            return 'error : ' . $e->getMessage();
        }  
    }

}
?>