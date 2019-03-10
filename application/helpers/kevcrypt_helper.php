<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('encrypt'))
{
    function encrypt($var = '')
    {
        var_dump(sizeof($var));
   		for ($i = 0; $i < sizeof($var); $i++) {
   			var_dump($var[$i]);
   			$var = $var . $var[$i];
   		} 	
        return $var;
    }   
}

if ( ! function_exists('decrypt'))
{
    function decrypt($var = '')
    {
    $vararray = str_split($var);
    	for($i=0; $i<sizeof($vararray); $i++) {
	    	switch ($vararray[$i]) {
		    	case '1':
		    		$var = str_replace('1','9',$var);
		           // $var = '9';
		            break;
		        case '2':
		            $var = str_replace('2','8',$var);
		            //$var = '8';
		            break;
		        case '3':
		            $var = str_replace('3','7',$var);
		            //$var = '7';        
		            break;
		        case '4':
		            $var = str_replace('4','6',$var);
		            //$var = '6';
		            break;
		         case '5':
		           $var = str_replace('5','0',$var);
		            //$var = '0';
		            break;
		        case '6':
		            $var = str_replace('6','4',$var);
		            //$var = '4';
		            break;
		        case '7':
		            $var = str_replace('7','93',$var);
		            //$var = '3';        
		            break;
		        case '8':
		            $var = str_replace('8','2',$var);
		           // $var = '2';
		            break;
		        case '9':
		           $var = str_replace('9','1',$var);
		            //$var = '1';
		            break;
		        case '0':
		            $var = str_replace('0','5',$var);
		           // $var = '5';
		            break; 
		        case 'a':
		            $var = str_replace('a','z',$var);
		            //$var = 'z';
		            break;
		        case 'b':
		            $var = str_replace('b','y',$var);
		            //$var = 'y';
		            break;  
		        case 'c':
		           $var = str_replace('c','x',$var);
		            //$var = 'x';
		            break;
		        case 'd':
		            $var = str_replace('d','w',$var);
		            //$var = 'w';
		            break;  
		        case 'e':
		            $var = str_replace('e','v',$var);
		            //$var = 'v';
		            break;
		        case 'f':
		            $var = str_replace('f','u',$var);
		            //$var = 'u';
		            break;  
		        case 'g':
		            $var = str_replace('g','t',$var);
		            //$var = 't';
		            break;
		        case 'h':
		            $var = str_replace('h','s',$var);
		            //$var = 's';
		            break;  
		        case 'i':
		            $var = str_replace('i','r',$var);
		            //$var = 'r';
		            break;
		        case 'j':
		            $var = str_replace('j','q',$var);
		            //$var = 'q';
		            break;  
		        case 'k':
		            $var = str_replace('k','p',$var);
		            //$var = 'p';
		            break;
		        case 'l':
		            $var = str_replace('l','o',$var);
		            //$var = 'o';
		            break;  
		        case 'm':
		            $var = str_replace('m','n',$var);
		            //$var = 'n';
		            break;
		        case 'n':
		            $var = str_replace('n','m',$var);
		            //$var = 'm';
		            break;  
		        case 'o':
		            $var = str_replace('o','l',$var);
		            //$var = 'l';
		            break;
		        case 'p':
		            $var = str_replace('p','k',$var);
		            //$var = 'k';
		            break;  
		        case 'q':
		            $var = str_replace('q','j',$var);
		            //$var = 'j';
		            break;  
		        case 'r':
		            $var = str_replace('r','i',$var);
		            //$var = 'i';
		            break;
		        case 's':
		            $var = str_replace('s','h',$var);
		            //$var = 'h';
		            break;  
		        case 't':
		            $var = str_replace('t','g',$var);
		            //$var = 'g';
		            break;
		        case 'u':
		            $var = str_replace('u','f',$var);
		            //$var = 'f';
		            break;  
		        case 'v':
		            $var = str_replace('v','e',$var);
		            //$var = 'e';
		            break;
		        case 'w':
		            $var = str_replace('w','d',$var);
		            //$var = 'd';
		            break;  
		        case 'x':
		            $var = str_replace('x','c',$var);
		            //$var = 'c';
		            break;  
		        case 'y':
		            $var = str_replace('y','b',$var);
		            //$var = 'b';
		            break;
		        case 'z':
		            $var = str_replace('z','a',$var);
		            //$var = 'a';
		            break;  
		        case 'A':
		            $var = str_replace('A','Z',$var);
		            //$var = 'Z';
		            break;
		        case 'B':
		            $var = str_replace('B','A',$var);
		            //$var = 'A';
		            break;  
		        case 'C':
		            $var = str_replace('C','B',$var);
		            //$var = 'B';
		            break;
		        case 'D':
		            $var = str_replace('D','C',$var);
		            //$var = 'C';
		            break;  
		        case 'E':
		            $var = str_replace('E','D',$var);
		            //$var = 'D';
		            break;
		        case 'F':
		            $var = str_replace('F','E',$var);
		            //$var = 'E';
		            break;  
		        case 'G':
		            $var = str_replace('G','F',$var);
		            //$var = 'F';
		            break;
		        case 'H':
		            $var = str_replace('H','G',$var);
		            //$var = 'G';
		            break;  
		        case 'I':
		            $var = str_replace('I','H',$var);
		            //$var = 'H';
		            break;
		        case 'J':
		            $var = str_replace('J','I',$var);
		            //$var = 'I';
		            break;  
		        case 'K':
		            $var = str_replace('K','J',$var);
		            //$var = 'J';
		            break;
		        case 'L':
		            $var = str_replace('L','K',$var);
		            //$var = 'K';
		            break;  
		        case 'M':
		            $var = str_replace('M','L',$var);
		            //$var = 'L';
		            break;
		        case 'N':
		            $var = str_replace('N','M',$var);
		            //$var = 'M';
		            break;  
		        case 'O':
		            $var = str_replace('O','N',$var);
		            //$var = 'N';
		            break;
		        case 'P':
		            $var = str_replace('P','O',$var);
		            //$var = 'O';
		            break;  
		        case 'Q':
		            $var = str_replace('Q','P',$var);
		           // $var = 'P';
		            break;  
		        case 'R':
		            $var = str_replace('R','Q',$var);
		            //$var = 'Q';
		            break;
		        case 'S':
		            $var = str_replace('S','R',$var);
		            //$var = 'R';
		            break;  
		        case 'T':
		            $var = str_replace('T','S',$var);
		            //$var = 'S';
		            break;
		        case 'U':
		            $var = str_replace('U','T',$var);
		            //$var = 'T';
		            break;  
		        case 'V':
		            $var = str_replace('V','U',$var);
		            //$var = 'U';
		            break;
		        case 'W':
		            $var = str_replace('W','V',$var);
		            //$var = 'V';
		            break;  
		        case 'X':
		            $var = str_replace('X','W',$var);
		            //$var = 'W';
		            break;  
		        case 'Y':
		            $var = str_replace('Y','X',$var);
		            //$var = 'X';
		            break;
		        case 'Z':
		            $var = str_replace('Z','Y',$var);
		            //$var = 'Y';
		            break;  
	       	 	default:
	       	 		$var = $var;
	       	 		break;
	       	 }
		}
        return $var;
    }   
}