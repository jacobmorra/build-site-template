Enter file contents here//var currPath = "C:\\Users\\mzlnl4\\Documents\\Alex-mystuff\\Student-stuff\\Builds-Tutorial\\www\\";

//Define some global variables
var currPath = "";
var displayScroll = 0;
var editScroll = 0;

$(document).ready(function(){
    console.debug("Loaded DOM");
    init();
    main();
});

//-------------------INITIALIZE-----------------
var init = function(){
    //$("#navHome").click();
    currPath = getCurrPath();
};

//-------------------MAIN/NAVBAR---------------------

var main = function(){     
    //navigation Debugo
    $("#navDebugo").click(function(){
	console.debug("Logo Clicked");
	resetNavbarActive();
	$("#navHome").addClass("active");
	$("#navHome").click();
    });

    //HOME - nav
    $("#navHome").click(function(){
	//Set the Nav
	console.debug("Home Clicked");
	resetNavbarActive();
	$(this).addClass("active");

	//Scroll the window to the top
	window.scrollTo(0,0);
	
	//Remove the main content and show the jumbotron
	displayMode();
	$("#mainContent").hide();
	$(".jumbotron").show();
	$(".onboardRefreshRadio").hide();
	$("#editButton").hide();
    });

    //ABOUT - nav
    $("#navAbout").click(function(){
	console.debug("About Clicked");
	resetNavbarActive();
	$(this).addClass("active");
    });

    //Contact - nav
    $("#navContact").click(function(){
	console.debug("Contact Clicked");
	resetNavbarActive();
	$(this).addClass("active");
    });

    //Online - nav
    $("#navGMOnline").click(function(){
	console.debug("GM Online Clicked");
	//Set the hash in the URL
	window.location.hash = "online-onboard";

	//Visually display the correct Navigation button clicked
	resetNavbarActive();
	$(this).addClass("active");

	//Enter Display mode and load the main content to be displayed
	displayMode();
	loadMainContent();
    });

    //EDWS - nav
    $("#navEDWS").click(function(){
	console.debug("EDWS Clicked");
	//set the hash in URL
	window.location.hash = "edws-onboard";

	//Visually display the correct Navigation button clicked
	resetNavbarActive();
	$(this).addClass("active");

	//Enter Display mode and load the main content to be displayed
	displayMode();
	loadMainContent();
    });

    //Function that resets the active class for the left navbar
    var resetLeftNavbarActive = function(){
	$(".navbar-left li").removeClass("active");
    };

    //Function that resets the active class for the right navbar
    var resetRightNavbarActive = function(){
	$(".navbar-right li").removeClass("active");
    };

    //Funciton that resets the active class for the whole navbar
    var resetNavbarActive = function(){
	$(".navbar li").removeClass("active");
    };

    //RADIO ONBOARD/REFRESH Button
    $('input[type=radio]').change(function(){
	//obtain the current hash of the url
	var currHash = window.location.hash;
	//placeholder for a new hash
	var newHash = "";

	//Check to see which of the radio buttons is clicked
	
	//ONBOARD
	if($('#option1-onboard').is(':checked')){
	    console.debug("option1-onboard");
	    //ONLINE
	    if (currHash.indexOf("online") >= 0){
		newHash = "online-onboard";
		//EDWS
	    }else{
		newHash = "edws-onboard";
	    }
	    //set the new hash and load the main content
	    window.location.hash = newHash;
	    loadMainContent();
	    //REFRESH	
	} else if ($('#option2-refresh').is(':checked')){
	    console.debug("option2-refresh");
	    //ONLINE
	    if (currHash.indexOf("online") >= 0){
		newHash = "online-refresh";
		//EDWS
	    }else{
		newHash = "edws-refresh";
	    }
	    //set the new hash and load the main content
	    window.location.hash = newHash;
	    loadMainContent();
	}
    });

    //EDIT
    $("#editButton").click(function(){
	console.debug("edit button clicked");	
	//Enable Edit Mode
	editMode();
    });

    //LIVE
    $("#liveButton").click(function(){
	console.debug("liveButton clicked");

	editMode();
//	$("#mainContent").show();
	//$("#mainContent,#editMDTextArea").css("background-color", "skyblue");
	$("#editMDTextArea,#mainContent").css("height", "680px");
	$("#mainContent").css("overflow-y", "auto");
	$("#editMDTextArea,#mainContent").css("width", "50%");
	$("#editMDTextArea,#mainContent").css("margin", "0");
	$("#editMDTextArea").css("left", "0");
	//	$("#editMDTextArea").css("height", document.documentElement.scrollHeight);
	$("#mainContent").hide();
	$("#mainContent").show();
    });

    //SAVE
    $("#saveButton").click(function(){
	console.debug("saveButton clicked");
	saveEditTextArea();
	displayMode();
    });

    //CANCEL
    $("#cancelButton").click(function(){
	console.debug("cancelButton clicked");
	displayMode();
    });


    //TEMP -  Testbutton used for debugging
    $("#testButton").click(function(){
	console.debug("Test clicked");
	
	//obtain the name of the markdown file
	var mdFile = getMDFilenameFromHash();
	console.log("mdFile: " + mdFile); //TEMP
	
	//save to file
//	writeFileInIE(currPath + mdFile, $("#editMDTextArea").val());
	console.log("currPath + mdFile: " + currPath + mdFile); //TEMP

	//refresh main content
//	fileMDtoHTML("#mainContent", mdFile);
    });
};

//fill the edit area with the correct markdown file
function loadEditTextArea(scrollPercent){
    //get the name of the markdown file
    var mdFile = getMDFilenameFromHash()
    
    //Fill it in with markdown data    
    jQuery.get(mdFile, function(data) {
	$("#editMDTextArea").val(data);	
    })
	.done(function(){
	    //Set the scroll for the editMDTextArea
	    var const_scrollAdjustment = 100; //constant value to increase percision of guess
	    var editMDTextArea = document.getElementById('editMDTextArea');
//	    console.log("scrollPercent: " + scrollPercent);
//	    console.log("editMDTextArea.scrollHeight: " + editMDTextArea.scrollHeight);
//	    console.debug("[before]editMDTextArea.scrollTop: " + editMDTextArea.scrollTop); //TEMP
//	    console.debug("[scrollHeight]" + editMDTextArea.scrollHeight + "*" + scrollPercent + "[scrollPercent]" + " = " + editMDTextArea.scrollHeight * scrollPercent);
	    editMDTextArea.scrollTop = editMDTextArea.scrollHeight * scrollPercent - const_scrollAdjustment;
//	    console.debug("[after]editMDTextArea.scrollTop: " + editMDTextArea.scrollTop); //TEMP
	});
}

//Loads the #mainContent element with the correct markdown file
//Markdown file based on the hash # in the url
function loadMainContent(){
    //obtain the name of the markdown file
    var mdFile = getMDFilenameFromHash();
    //convert the markdown file contents into HTML and store them in #mainContent
    fileMDtoHTML("#mainContent", mdFile);  
}

//saves the markdown text to the correct markdown file
function saveEditTextArea(){
    console.debug("saveEditTextArea() called");
    
    //obtain the name of the markdown file
    var mdFile = getMDFilenameFromHash();
    
    //save to file
    writeFileInIE(currPath + mdFile, $("#editMDTextArea").val());

    //refresh main content
    fileMDtoHTML("#mainContent", mdFile);
}

//Obtain the markdown filename that is to be loaded based on the hash in the URL
//For example, a hash with #online-onboard wiill map to markdown-online-onboard.md
function getMDFilenameFromHash(){
    //obtain the hash frmo the url
    var hash = window.location.hash
    //concatinate the strings to get the name of the markdown file
    var mdFile = "markdown-"+ hash.substring(1)  +".md"; //get the name of the markdown file
    return mdFile;
    console.debug(mdFile);
}

//Takes a filepath and some raw string content and saves it to that file
function writeFileInIE(filePath, fileContent) {
    try {
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var file = fso.OpenTextFile(filePath, 2, true);
	file.WriteLine(fileContent);
	file.Close();
    } catch (e) {
	if (e.number == -2146827859) {
            alert('Unable to access local files due to browser security settings. ' + 
		  'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
		  'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
        }
    }
}

//removes all the edit information 
function displayMode(){
    $(".jumbotron").hide();
    $("#mainContent").show();
    $("#editButton").show(); 
    $("#editMDTextArea").hide();
    $("#saveButton").hide();
    $("#cancelButton").hide();
    $(".onboardRefreshRadio").show();
    $("#editBtnGroup").show(); //TEMP

    //recover the old display scroll location
    document.documentElement.scrollTop = displayScroll;
}

//Shows only things needed for editing
function editMode(){
    //Save the displayMode scroll location
    displayScroll = document.documentElement.scrollTop
    
    //calculate the scroll of the editTextArea
    var scrollPercent = calcPercentScroll();

    //Hide/Show the necessary elements
    $("#mainContent").hide();
    $("#editButton").hide();
    $("#editMDTextArea").show();
    $("#saveButton").show();
    $("#cancelButton").show();
    $(".onboardRefreshRadio").hide();

    //scroll to top
    window.scrollTo(0,0);
    	
    //Load in the Edit Text Area with markdown
    loadEditTextArea(scrollPercent);
}

//Takes in a markdown (.md) filename and an HTML element and converts all the markdown to html and inserts it into the element specified
function fileMDtoHTML(element, mdFilename){    
    jQuery.get(mdFilename, function(data) {
	var converter = new showdown.Converter();
	html = converter.makeHtml(data);
	$(element).html(html);
    });
}


//Obtains the current path in windows '\' format
function getCurrPath(){
    var serverPath = "\\\\cachqvs2fsh01\\";
    //console.debug("getCurrPath() called"); //TEMP
    var rawPath = window.location.pathname;
    //Get rid fo the filename in the end
    rawPath = rawPath.replace("index.html", "");
    //Remove the first occurence of '/' before the filename
    rawPath = rawPath.replace("/", "");
    //Replace all forward '/' with backward ones '\'
    rawPath = rawPath.replace(/\//g, '\\')
    //check if the path is on the server (prefixed with groups4 - must prefix with \\cachqvs2fsh01)
    if (rawPath.indexOf("groups4") >= 0){
	rawPath = serverPath + rawPath;
    }    
    console.log("Current Path: " + rawPath);
    return rawPath;
}

//Calculates the percentage of the scroll of mainContent which will be used to calculate the scroll of the edit screen
function calcPercentScroll(){
    //console.debug("document.documentElement.scrollTop / document.documentElement.scrollHeight: " + document.documentElement.scrollTop + "/" + document.documentElement.scrollHeight); //TEMP
    var scrollPercent = document.documentElement.scrollTop / document.documentElement.scrollHeight;
    return scrollPercent;
}
