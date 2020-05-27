
function go(mode)
{
const words=["TEST","EARTH","VOCABULARY","DOG","HANGMAN"];
const applause=new Audio("media/applause.mp3");
const groan=new Audio("media/crowd-groan.mp3");
let placeHolder="-";        // Default place holder is dash character
let alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let remainingMistakes;    // Holds the total number of allowed mistakes
if(mode=="easy")
	remainingMistakes=10;
else
	remainingMistakes=6;
let lives="";               // String representing total remaining lives with Unicode of heart character
for(k=1;k<=remainingMistakes;k++)
{
	lives+=String.fromCharCode(0x2665);  
}
const alphabetic=/[A-Za-z]/;              // Regular expression used in "isAlphabetic()" function that matches a single alphabetic letter.
document.getElementById("guess").focus();   // Activate the input box on program start up
let timer=setInterval(animateBanner,100);   // Timer for the banner animation
let word=getRandomWord();  // get a random word
// *** If the chosen word is for example "DOG" the following code assigns the "---" string (three dashes) to the "letters" variable and displays that ***
let letters="";
for(let i=0;i<word.length;i++)
{
	letters+=placeHolder;
}
document.getElementById("letters").innerHTML=letters;
document.getElementById("lives").innerHTML=lives;
document.getElementById("alphabet").innerHTML=alphabet;

// *** Return a random word from the "words" array ***
function getRandomWord()
{
	let index=Math.floor(Math.random() * words.length);
	return words[index];
}
// *** Animate HANGMAN banner on top of the page ***
function animateBanner()
{
	left=parseInt(document.getElementById("banner").style.left);
	if(left>window.innerWidth)
	{
		left=-10;
	}
	left+=10;
	document.getElementById("banner").style.left=`${left}px`;
}
// *** Convert typed letter to upper case ***
function toUpper()
{
	let typedLetter=document.getElementById("guess").value;
	document.getElementById("guess").value=typedLetter.toUpperCase();
}
// *** Check whether x is an alphabetic letter or not ***
function isAlphabetic(x)
{
	if(x.match(alphabetic))
		return true;
	else
		return false;
}
// *** This is the main function of the program.Checks whether the chosen random word contains the typed letter or not and also checks if the player won or lost ***
function check()
{
	let letter=document.getElementById("guess").value.toUpperCase();
	if(isAlphabetic(letter))
	{
		if(alphabet.includes(letter))              // If letter has not already been used
		{
			alphabet=alphabet.replace(letter,"*");  // Replaces entered letter with the "*" character in Alphabet list marking it as used
			if(word.includes(letter))               // If chosen word contains entered letter
			{
				applause.play();
				var lettersArray=letters.split("");    // Convert "letters" string to an Array
				// *** The following code unhides all occurrences of the entered letter ***
				// *** For example if the chosen word was "TEST" and player entered the "T" letter, this code section generates array ["T","-","-","T"]
				for(let j=0;j<word.length;j++)
				{
					if(word.charAt(j)==letter)
					{
						lettersArray.splice(j,1,letter);
					}
				}
				// *** Convert back the Array "lettersArray" to string. For example convert array ["T","-","-","T"] to string "T--T" and display that ***
				letters="";
				for(let j=0;j<lettersArray.length;j++)
				{
					letters+=lettersArray[j];	
				}
				document.getElementById("letters").innerHTML=letters;
				$("#letters").css("color","#830D3B");
				// *** If the player guessed all the letters correctly and there is no more placeholders "-" remaining player wins. ***
				if(!letters.includes(placeHolder))
				{
					document.getElementById("guess").style.display="none";
					document.getElementById("losewin").innerHTML="You Win!";
					document.getElementById("check").style.display="none";
					$("#losewin").css({"color":'#8B0000',"font-size" :'37px'}).fadeOut(500).fadeIn(1000);
					$("#lives").css("color",'#800000').fadeOut(1000).fadeIn(1000);
				}
			
			}
			else  // Else if chosen word does not contain entered letter
			{
				groan.play();
				remainingMistakes-=1;
				lives="";
				for(k=1;k<=remainingMistakes;k++)
				{
					lives+=String.fromCharCode(0x2665);   // Recreate "lives" string with Unicode heart character
				}
				
				document.getElementById("lives").innerHTML=lives;
				if(remainingMistakes==0)
				{
					document.getElementById("guess").style.display="none";
					document.getElementById("losewin").innerHTML="You Lose!";
					document.getElementById("check").style.display="none";
					$("#losewin").css({"color":'#FFFF00',"font-size" :'37px'}).fadeOut(500).fadeIn(1000);
				
				}
			
			}
		}
		else      // Entered letter already used
		{
			alert(`Letter "${letter}" already used! Try another letter.`);
		}
	}
	else    // Else if entered character is not an alphabetic letter
	{
		alert("Enter a single alphabetic letter!");
	}
	
	document.getElementById("alphabet").innerHTML=alphabet;
	document.getElementById("guess").value="";
	document.getElementById("guess").focus();
}


var second = 0;
var wind = 120;


var tim = document.getElementById('timer');
tim.innerHTML= seconds (wind - second);


function score(){
second++;
tim.innerHTML= seconds (wind - second);
}
var d = setInterval(score, 1000);


function seconds (q){

var t = Math.floor(q/60);
var w = q % 60;
if (t < 0 && w <0) { 
        clearInterval(d); 
        alert("Game Over");
    } 
else


return (t<10 ? '0' : '') + t + " : " + (w<10 ? '0' : '') + w;



}

}