<?php

class cbrClass{
    public static function getXML(){
        $cbr_arr = NULL;
        $date_ = date("d/m/Y", time());
        $url = "http://www.cbr.ru/scripts/XML_daily.asp";
        $xml = simplexml_load_file($url);
        if($xml ===  FALSE){
            // deal with error
            return FALSE;
        }
        //
        $dt = (string)$xml->attributes()->Date;
        $cbr = [];
        $i=0;
        foreach ($xml->Valute AS $currency){
            foreach ($currency AS $val){
                $cbr[$i][] = (string)$val;
            }
            $i++;
        }
        $cbr_arr = ["DATE"=>$dt, "ITEMS"=>$cbr];
        return $cbr_arr;
    }
}