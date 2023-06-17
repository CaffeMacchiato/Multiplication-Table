/*
File: script.js
GUI Assignment 3: Creating an Interactive Dynamic Table
Masha Tsykora, UMass Lowell Computer Science, mary_tsykora@student.uml.edu
Copyright (c) 2023 by Masha Tsykora. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Updated on 6/17/23 at 7:00am.
Instructor: Professor Wenjin Zhou
Sources of Help: W3Schools, MDN Web Docs, CodingTheSmartway, C# Corner, the example Javascript programs provided by Professor Wenjin Zhou
Brief Overview: I created a webpage that lets a user enter a column lower bound, a column upper bound,
a row lower bound, and a row upper bound. If the user doesn't enter a valid input in any of the forms, 
then an appropriate error message will be displayed underneath the "Submit" button.
Unfortunately, I wasn't able to figure out how to make the table scrollable, so it will stretch across
the page for larger inputs. I've left extensive comments detailing each part of my code.
*/



/* Here, I made a function called isEmpty that checks if any of my form fields are empty or Not a Number */
function isEmpty() {
    var clbound = parseInt(document.getElementById('clbound').value);
    var cubound = parseInt(document.getElementById('cubound').value);
    var rlbound = parseInt(document.getElementById('rlbound').value);
    var rubound = parseInt(document.getElementById('rubound').value);

    if (clbound == "" || isNaN(clbound)){
        return "Column Lower Bound is empty or NaN, please fill out this field correctly.";
    }

    if (cubound == "" || isNaN(cubound)){
        return "Column Upper Bound is empty or NaN, please fill out this field correctly.";
    }

    if (rlbound == "" || isNaN(rlbound)){
        return "Row Lower Bound is empty or NaN, please fill out this field correctly.";
    }

    if (rubound == "" || isNaN(rubound)){
        return "Row Upper Bound is empty or NaN, please fill out this field correctly.";
    }

    return true; /* If my code reaches here, that means yes, at least one of my form fields are empty or Not a Number */
}



/* Here, I made a function called lowerBoundLarger that gets all the values from my forms and checks if the column & row lower bounds are larger than the column & row upper bounds */
function lowerBoundLarger() {
    var clbound = parseInt(document.getElementById('clbound').value);
    var cubound = parseInt(document.getElementById('cubound').value);
    var rlbound = parseInt(document.getElementById('rlbound').value);
    var rubound = parseInt(document.getElementById('rubound').value);

    if (clbound > cubound) {
        return "Column Lower Bound is larger than the Column Upper Bound.";
    }

    if (rlbound > rubound) {
        return "Row Lower Bound is larger than the Row Upper Bound.";
    }

    return true; /* If my code reaches here, that means no, I don't have any larger lower bounds */
}



/* Here, I made a function called rangeValidation that gets all the values from my forms and checks if they are between 1 and 50 */
function rangeValidation() {
    var clbound = parseInt(document.getElementById('clbound').value);
    var cubound = parseInt(document.getElementById('cubound').value);
    var rlbound = parseInt(document.getElementById('rlbound').value);
    var rubound = parseInt(document.getElementById('rubound').value);
    
    if (clbound < 1 || clbound > 50) {
        return "Column Lower Bound should be between 1 and 50.";
    }

    if (cubound < 1 || cubound > 50) {
        return "Column Upper Bound should be between 1 and 50.";
    }

    if (rlbound < 1 || rlbound > 50) {
        return "Row Lower Bound should be between 1 and 50.";
    }

    if (rubound < 1 || rubound > 50) {
        return "Row Upper Bound should be between 1 and 50.";
    }

    return true; /* If my code reaches here, that means no, I don't have any invalid ranges */
}



function multiplicationTable(clbound, rlbound, numRows, numCols) {
    /* Here, I'm first making a variable for my multiTable */
    var multiTable = document.getElementById("multiTable");
    multiTable.innerHTML = ""; 
    
    var table = document.createElement("table");

    /* Here, I'm making and initializing variables to create my multiplication table */
    var i = 0;
    var j = 0;
    var row;
    var multiCell;
    var currentRowVal;
    var currentColVal;

    for (i = 0; i < numRows; i++) {
        /* Here, I'm creating a new table row element */
        row = document.createElement("tr");

        for (j = 0; j < numCols; j++) {
            /* Here, I'm creating a new table cell element */
            multiCell = document.createElement("td");

            /* Here, I am making the first cell of my table empty (setting it to 'X') */
            if (i == 0 && j == 0) {
                multiCell.innerHTML = "X";
            } 
            /* After this code, I have to subtract 1 from everything in order to account for the extra row and column I made to display the ranges */
            
            /* Here, I'm making the extra row to display the column range */
            else if (i == 0) {
                currentColVal = clbound + j - 1;
                multiCell.innerHTML = currentColVal;
            }

            /* Here, I'm making the extra column to display the row range */
            else if (j == 0) {
                currentRowVal = rlbound + i - 1;
                multiCell.innerHTML = currentRowVal;
            }

            else {
                currentRowVal = rlbound + i - 1; /* Here, I start from the beginning row value and add 0, 1, 2, etc (in i) to get the current row value */
                currentColVal = clbound + j - 1; /* Here, I start from the beginning column value and add 0, 1, 2, etc (in j) to get the current column value */
                
                multiCell.innerHTML = currentRowVal * currentColVal;
            }
            row.appendChild(multiCell);
        }
        table.appendChild(row);
    }
    multiTable.appendChild(table);
}



/* Here, I add an Event Listener that activates when I hit the "submit" button */
document.addEventListener("submit", function(event) {
    /* Here, I have to stop the program from immediately doing anything, so I prevent the default actions */
    event.preventDefault(); 

    /* Here, I'm getting rid of previous error messages and my table if I reenter values in general or to address errors without refreshing the page */
    document.getElementById("isEmptyError").innerHTML = "";
    document.getElementById("validationError").innerHTML = "";
    document.getElementById("lowerBoundError").innerHTML = "";
    document.getElementById("multiTable").innerHTML = "";

    
    /* Here, I'm checking if any of my forms weren't filled in */
    var isEmptyError = isEmpty(); 

    /* Here, if our isEmpty function returns any error message, then we update the value of isEmptyError to display said error message on the screen */
    if (isEmptyError !== true) {
        document.getElementById("isEmptyError").innerHTML = isEmptyError;
        return; /* This stops the program from progressing if I get an empty field error */
    
    }


    /* Here, I'm making and setting the variable validationError equal to the string result message from my rangeValidation function */
    var validationError = rangeValidation();

    /* Here, if our rangeValidation function returns any error message, then we update the value of validationError to display said error message on the screen */
    if(validationError !== true) {
        document.getElementById("validationError").innerHTML = validationError;
        return; /* This stops the program from progressing if I get a validation error */
    }


    /* Here, I'm making and setting the variable lowerBoundError equal to the string result message from my lowerBoundLarger function */
    var lowerBoundError = lowerBoundLarger();
    
    /* Here, if our lowerBoundLarger function returns any error message, then we update the value of lowerBoundError to display said error message on the screen */
    if(lowerBoundError !== true) {
        document.getElementById("lowerBoundError").innerHTML = lowerBoundError;
        return; /* This stops the program from progressing if I get a lower bound error */
    }



    /* Here, I'm getting the variable values for the column & row upper and lower bounds */
    var clbound = parseInt(document.getElementById('clbound').value);
    var cubound = parseInt(document.getElementById('cubound').value);
    var rlbound = parseInt(document.getElementById('rlbound').value);
    var rubound = parseInt(document.getElementById('rubound').value);

    /* Here, I'm making variables numRows and numCols, and setting them equal to their respective upper bounds minus their lower bounds plus two.
    ORIGINALLY, it would be plus one and not plus two, but I have to account for the extra row and extra column to display the row and column ranges.
    If I leave it as plus one instead of plus two, then my table will be missing a full row and column */
    var numRows = rubound - rlbound + 2;
    var numCols = cubound - clbound + 2;

    /* Here, I'm making a multiplication table by inputting all of the variables I used above */
    multiplicationTable(clbound, rlbound, numRows, numCols);
});