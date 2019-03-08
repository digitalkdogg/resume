<?php 
 if (!defined('BASEPATH'))
        exit('No direct script access allowed');

class MetaModel extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_by_user($resumeid) {

    	/****************************************
    	/*todo : get resume name onto the page 
    	******************************************/

    	//select FieldValue, Resume.Name from Meta
		//join Fields_Relationships on Fields_Relationships.id = Meta.fieldrelationshipid 
		//join Fields on Fields.id = Fields_Relationships.fieldid
		//join Resume on Resume.id = Fields.resumeid
		//where Fields.resumeid = '1'
		
		$this->db->select('*');
		$this->db->from('Meta');
		$this->db->join('Fields_Relationships', 'Fields_Relationships.id = Meta.fieldrelationshipid');
		$this->db->join('Fields', 'Fields.id = Fields_Relationships.fieldid');

		$this->db->where('Fields.resumeid', $resumeid);
		 
		$query = $this->db->get();

		return $query->result();

    }

    public function save_meta($data) {
    	try {
			$this->db->update_batch('Meta', $data, 'metaid');
			return 'success';
		} catch (Exception $e) {
			return 'error : ' . $e->getMessage();
		}    
    }

}
?>