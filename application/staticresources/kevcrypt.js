function kevcrypt(e){for(i=0;i<e.length;i++){var a="";switch(e[i]){case"1":a="9";break;case"2":a="8";break;case"3":a="7";break;case"4":a="6";break;case"5":a="0";break;case"6":a="4";break;case"7":a="3";break;case"8":a="2";break;case"9":a="1";break;case"0":a="5";break;case"a":a="z";break;case"b":a="y";break;case"c":a="x";break;case"d":a="w";break;case"e":a="v";break;case"f":a="u";break;case"g":a="t";break;case"h":a="s";break;case"i":a="r";break;case"j":a="q";break;case"k":a="p";break;case"l":a="o";break;case"m":a="n";break;case"n":a="m";break;case"o":a="l";break;case"p":a="k";break;case"q":a="j";break;case"r":a="i";break;case"s":a="h";break;case"t":a="g";break;case"u":a="f";break;case"v":a="e";break;case"w":a="d";break;case"x":a="c";break;case"y":a="b";break;case"z":a="a";break;case"A":a="B";break;case"B":a="C";break;case"C":a="D";break;case"D":a="E";break;case"E":a="F";break;case"F":a="G";break;case"G":a="H";break;case"H":a="I";break;case"I":a="J";break;case"J":a="K";break;case"K":a="L";break;case"L":a="M";break;case"M":a="N";break;case"N":a="O";break;case"O":a="P";break;case"P":a="Q";break;case"Q":a="R";break;case"R":a="S";break;case"S":a="T";break;case"T":a="U";break;case"U":a="V";break;case"V":a="W";break;case"W":a="X";break;case"X":a="Y";break;case"Y":a="Z";break;case"Z":a="A";break;default:a=e[i]}e=e.replace(e[i],a)}return convertToHex(e)}function kevdecrypt(e){for(i=0;i<e.length;i++){var a="";switch(e[i]){case"1":a="9";break;case"2":a="8";break;case"3":a="7";break;case"4":a="6";break;case"5":a="0";break;case"6":a="4";break;case"7":a="3";break;case"8":a="2";break;case"9":a="1";break;case"0":a="5";break;case"a":a="z";break;case"b":a="y";break;case"c":a="x";break;case"d":a="w";break;case"e":a="v";break;case"f":a="u";break;case"g":a="t";break;case"h":a="s";break;case"i":a="r";break;case"j":a="q";break;case"k":a="p";break;case"l":a="o";break;case"m":a="n";break;case"n":a="m";break;case"o":a="l";break;case"p":a="k";break;case"q":a="j";break;case"r":a="i";break;case"s":a="h";break;case"t":a="g";break;case"u":a="f";break;case"v":a="e";break;case"w":a="d";break;case"x":a="c";break;case"y":a="b";break;case"z":a="a";break;case"A":a="Z";break;case"B":a="A";break;case"C":a="B";break;case"D":a="C";break;case"E":a="D";break;case"F":a="E";break;case"G":a="F";break;case"H":a="G";break;case"I":a="H";break;case"J":a="I";break;case"K":a="J";break;case"L":a="K";break;case"M":a="L";break;case"N":a="M";break;case"O":a="N";break;case"P":a="O";break;case"Q":a="P";break;case"R":a="Q";break;case"S":a="R";break;case"T":a="S";break;case"U":a="T";break;case"V":a="U";break;case"W":a="V";break;case"X":a="W";break;case"Y":a="X";break;case"Z":a="Y";break;default:a=e[i]}e=e.replace(e[i],a)}return convertFromHex(e)}function convertToHex(e){for(var a="",r=0;r<e.length;r++)a+=""+e.charCodeAt(r).toString(16);return a}function convertFromHex(e){e=e.toString();for(var a="",r=0;r<e.length;r+=2)a+=String.fromCharCode(parseInt(e.substr(r,2),16));return a}