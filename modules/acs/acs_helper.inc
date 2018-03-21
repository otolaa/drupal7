<?php

class acs_helper {
  public static function city($mesto) {
    // ...
    $output = "";
     if(isset($mesto[2]['tid'])){
	      $output .= l("г.".$mesto[2]['hs_lineages'][0]['label'], 'mesto/'.$mesto[2]['tid'], array('attributes' => array('class' => array('city_')), 'html'=>true )). " ";
	      //print l('Cсылка на проблему', 'node/'.$form_state['nid'], array('attributes' => array('class' => array('q_')), 'absolute'=>true, 'html'=>true ));
	      }

	 if(isset($mesto[3]['tid'])){
	      $output .= " ".l("(м.".$mesto[3]['hs_lineages'][0]['label'].")", 'mesto/'.$mesto[3]['tid'], array('attributes' => array('class' => array('city_')), 'html'=>true ));
	      }

	 print $output;
  }
  public static function territory($aid) {
    // ...
   $output = "";
   //$output .= "---";
   //$vid_ = 3;
   //$parent_ = 0;
   //$put = "service";
    $td_ = array();
    foreach($aid as $aids_){
      //echo "<pre>"; print_r($tids_['tid']); echo "</pre>";
      $td_[$aids_['tid']] = $aids_['tid'];
    }


   $class_ = "";
   ///$tree_ = array();
   $terms_ =  taxonomy_get_tree($vid_ = 7, $parent_ = 0, $max_depth = 2, $load_entities_ = FALSE);
   foreach ( $terms_ as $term_ ) {
        //echo "<pre>"; print_r($term_); echo "</pre>";
        if(isset($td_[$term_->tid])){$class_ = "yes";}else{$class_ = "no";}
        //if($term_->parents[0] == 0){
           //$names_ = '<span class="srvc_header">'.$term_->name.'</span>';
         //}else{
           $output .= l('<span class="srvc_">'.$term_->name.'</span>', 'girl', array('attributes' => array('class' => array('service_', $class_)), 'absolute'=>true, 'query'=>array('territory'=>$term_->tid), 'html'=>true )) . "<br>";
        // }
        //$tree_[] = array('name' => $names_,     'id' => $term_->tid,  'pid' => $term_->parents[0]);
   }

   print $output;
  }
   public static function get_tree($tree, $pid) {
	  $html = '<ul>' . "\n";
	  $ul = false;
	  foreach ($tree as $row)
	  {
	        if ($row['pid'] == $pid)
	        {
	            $html .= '	<li>' . "\n";
	            $html .= '	' . $row['name'] . "\n";
	            $html .= '		' . acs_helper::get_tree($tree, $row['id']);
	            $html .= '	</li>' . "\n";
				$ul = true;
	        }
	    }

	 $html .= '</ul>' . "\n";
	 $html = ($ul) ? $html : "";
	 return $html;
  }
  public static function table_tree($tree, $pid) {
	  $html = "<table cellpadding='4' cellspacing='4' border='0' width='100%' align='center'>";
	  $LINE_ELEMENT_COUNT = 3;
	  $counter = -1;

	  $ul = false;
	  foreach ($tree as $row)
	  {
	        if ($row['pid'] == $pid)
	        {

		        //$html .= '	<li>' . "\n";
		        $counter++;
		        //echo "<pre> "; print_r($term); echo "</pre>";
		        if (($LINE_ELEMENT_COUNT == 1) || ($counter % $LINE_ELEMENT_COUNT == 0)){ $html .= "<tr>";}
		        //$term_list_html .=  $term_list_obj['name'];
		        $html .= "<td valign='top' width='".IntVal(100 / $LINE_ELEMENT_COUNT)."%' align='left'>";

	            $html .= "" . $row['name'] . "";
	            $html .= acs_helper::get_tree($tree, $row['id']);
	            //$html .= '	</li>' . "\n";
	            $html .= "</td>";
	            if (($LINE_ELEMENT_COUNT == 1) || ($counter % $LINE_ELEMENT_COUNT == $LINE_ELEMENT_COUNT - 1)){ $html .= "<tr>"; }
				$ul = true;
	        }
	    }
	  if (($LINE_ELEMENT_COUNT != 1) && ($counter % $LINE_ELEMENT_COUNT != $LINE_ELEMENT_COUNT - 1))
						{
							for ($i = $counter % $LINE_ELEMENT_COUNT; $i < $LINE_ELEMENT_COUNT - 1; $i++)
								$html .= "<td>&nbsp;</td>";
							$html .= "</tr>";
						}

	 $html .= "</table>";
	 $html = ($ul) ? $html : "";
	 return $html;
  }
  public static function service($aid) {
     //$output = "";
   //$output .= "---";
   //$vid_ = 3;
   //$parent_ = 0;
   //$put = "service";
    $td_ = array();
    foreach($aid as $aids_){
      //echo "<pre>"; print_r($tids_['tid']); echo "</pre>";
      $td_[$aids_['tid']] = $aids_['tid'];
    }


   $class_ = "";
   $tree_ = array();
   $terms_ =  taxonomy_get_tree($vid_ = 3, $parent_ = 0, $max_depth = 2, $load_entities_ = FALSE);
   foreach ( $terms_ as $term_ ) {
        //echo "<pre>"; print_r($term_); echo "</pre>";
        if(isset($td_[$term_->tid])){$class_ = "yes";}else{$class_ = "no";}
        if($term_->parents[0] == 0){
           $names_ = '<span class="srvc_header">'.$term_->name.'</span>';
         }else{
           //$names_ = "" . l('<span class="srvc_">'.$term_->name.'</span>', 'taxonomy/term/' . $term_->tid, array('attributes' => array('class' => array('service_', $class_)), 'absolute'=>true, 'html'=>true )) . "";
           $names_ = "" . l('<span class="srvc_">'.$term_->name.'</span>', 'girl', array('attributes' => array('class' => array('service_', $class_)), 'absolute'=>true, 'query'=>array('service'=>$term_->tid), 'html'=>true )) . "";
         }
        $tree_[] = array('name' => $names_,     'id' => $term_->tid,  'pid' => $term_->parents[0]);
   }

   print acs_helper::table_tree($tree_, 0);
  }
  public static function get_ip_info($ip) {
     $postData = "
        <ipquery>
            <fields>
                <all/>
            </fields>
            <ip-list>
                <ip>$ip</ip>
            </ip-list>
        </ipquery>
    ";

    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, 'http://194.85.91.253:8090/geo/geo.html');
    curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $responseXml = curl_exec($curl);
    curl_close($curl);

    if (substr($responseXml, 0, 5) == '<?xml')
    {
        $ipinfo = new SimpleXMLElement($responseXml);
        return $ipinfo->ip;
    }

    return false;
  }
  public static function get_ip_info_mesto($ip) {
    $terms_perent_ = array();

    $ipinfo = acs_helper::get_ip_info($ip);
     //echo $ipinfo->city." "; // город
     //echo $ipinfo->region." "; // регион
     //echo $ipinfo->district." "; // федеральный округ
     //
     if(isset($ipinfo->city)){
        $result = db_query("SELECT * FROM  {taxonomy_term_data} WHERE  name LIKE  (:name) LIMIT 0 , 1", array( ':name' => $ipinfo->city."%" ));
        if(isset($result)){
		      foreach ($result as $row) { /* ... */
				 //
				 //echo "<pre>"; print_r($row); echo "</pre>";
				 $terms_perent_ =  array_reverse(taxonomy_get_parents_all($row->tid));
				 //echo "<pre>"; print_r($terms_perent_); echo "</pre>";

			  }
        }
     }
    return $terms_perent_;   //возвращяем tid словаря
  }
  public static function get_sity_tid() {
    //$tid_ = "";
    $field_sity_tid_ = array();
    $field_sity = global_filter_get_session_value('field_sity');
    if($field_sity){$field_sity_tid_ = $field_sity; }else{ $field_sity_tid_ = array(0 => 1, 1 => 221,  2 => 2558, 3 => 26127,); }
	$tid_ = implode(",", $field_sity_tid_);
	$zamena = array(",26127",",26301");
	$tid_ = str_replace($zamena, "", $tid_);
	return $tid_;

  }
  public static function calculate_age($birthday) {
	 $birthday_timestamp = strtotime($birthday);
	 $age = date('Y') - date('Y', $birthday_timestamp);
	 if (date('md', $birthday_timestamp) > date('md')) {
	   $age--;
	 }
	 return $age;
  }
  public static function acs_taxonomy_tree($vid, $parent) {
    // ...
    //$output = "";

	  $terms = db_query("
	    SELECT td.tid, td.name, th.parent, (
	      SELECT COUNT(*) FROM {taxonomy_index} ti
	      LEFT JOIN {node} n ON ti.nid = n.nid
	      WHERE ti.tid = td.tid AND n.status = 1
	    ) node_count FROM {taxonomy_term_data} td
	    INNER JOIN {taxonomy_term_hierarchy} th ON th.tid = td.tid
	    WHERE vid = :vid AND parent = :parent
	    ORDER BY weight, name
	  ", array(':vid' => $vid, ':parent' => $parent))->fetchAll();

	 return $terms;
  }
}