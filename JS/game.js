/* This is the array that contains the main deck (52 cards) */
var deck=[
	'AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC',
	'AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD',
	'AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH',
	'AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS'];
/* The two decks containing a subset of X cards */
var deck1=[];
var deck2=[];
/* The arrays that contain the cards that have been matched so far */
var deckMatched=[];

/* Variables that contain the value of the card picked from each deck /*/
var deck1flipped='';
var deck2flipped='';
/* Variables that identify the 2 divs for the decks */
var deck1div=document.getElementById('deck1');
var deck2div=document.getElementById('deck2');

/*
    Initialize a new game
*/
function startGame(){
    /* Get the difficulty of the game */
    var element=document.getElementById('difficulty');
    var value=element.options[element.selectedIndex].value;
    console.log(value);
    /* Initialize the board*/
    initializeBoard();
    /* Shuffle the deck with 52 cards */
    deck=shuffle(deck);
    /* Populate the 2 decks with X cards based on difficulty level */
    for(i=0;i<value;i++){
        deck1.push(deck[i]);
        deck2.push(deck[i]);
    }
    console.log(deck1);
    console.log(deck2);
    /* Shuffle the second deck */
    shuffle(deck2);
    /* Add the cards to the webpage */
    for(i=0;i<value;i++){
        /* Create the image elements*/
        card1='<div class="col-4 mb-2"><img class="card" data-card="' +deck1[i] +'" src="img/red_back.png" style="width:100%" /></div>';
        card2='<div class="col-4 mb-2"><img class="card" data-card="' +deck2[i] +'" src="img/yellow_back.png" style="width:100%" /></div>';
        /*Add images to the 2 decks */
        deck1div.innerHTML+=card1;
        deck2div.innerHTML+=card2;
    }
}

/* Clears all the elements when a new game is started */
function initializeBoard(){
    /* Clear the content of the divs that hold the 2 decks */
    deck1div.innerHTML='';
    deck2div.innerHTML='';
    /* Clear the content of the 2 decks */
    deck1=[];
    deck2=[];
    /* Clear the cards that have been matched */
    deckMatched=[];

    /* Clear the variables that contain the cards that have been flipped */
    deck1flipped='';
    deck2flipped='';
}

/* When the user clicks on deck1 */
deck1div.addEventListener('click',function(event){
    /* If the user clicks outside a card, don't do anything */
    if(event.target.getAttribute('data-card')==undefined) return;
    /* Check if the card has already been matched */
    if(deckMatched.includes(event.target.getAttribute('data-card'))) return;
    /* get the value of the card and set it as flipped */
    deck1flipped=event.target.getAttribute('data-card');
    console.log("deck1flipped - "+deck1flipped);
    console.log("deck2flipped - "+deck2flipped);
    /*Flip all the cards */
    flipUnmatchedCards('deck1', 'red_back');
    /* Flip the selected card */
    event.target.src='img/'+event.target.getAttribute('data-card')+'.png';
    if(deck2flipped.length>0){
        checkMatch(event.target.getAttribute('data-card'));
    }
    console.log(event.target.getAttribute('data-card'));
});

/* When the user clicks on deck2 */
deck2div.addEventListener('click',function(event){
    /* If the user clicks outside a card, don't do anything */
    if(event.target.getAttribute('data-card')==undefined) return;
    /* Check if the card has already been matched */
    if(deckMatched.includes(event.target.getAttribute('data-card'))) return;
    /* get the value of the card and set it as flipped */
    deck2flipped=event.target.getAttribute('data-card');
    console.log("deck1flipped - "+deck1flipped);
    console.log("deck2flipped - "+deck2flipped);
    /*Flip all the cards */
    flipUnmatchedCards('deck2', 'yellow_back');
    /* Flip the selected card */
    event.target.src='img/'+event.target.getAttribute('data-card')+'.png';
    if(deck1flipped.length>0){
        checkMatch(event.target.getAttribute('data-card'));
    }
});

/* Flip all the cards that have not been matched yet */
function flipUnmatchedCards(deck, back=''){
    /* Select one of the two decks */
    var deck=document.getElementById(deck);
    /* Select all the cards in the deck */
    var cards = deck.getElementsByClassName('card');
    var currentCard;
    /* Flip all the cards */
    for(i=0;i<cards.length;i++){
        currentCard=cards[i].getAttribute('data-card');
        /* Check if the card has been matched so that we dont flip it */
        if(deck=='deck1'){
            if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
        }else{
            if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
        }
    }
}

function checkMatch(cardValue) {
    if(deck2flipped==deck1flipped){
            /* We have a match*/
            /* Add the cards to the matched array */
            deckMatched.push(cardValue);
            console.log(deckMatched);
            /* Clear the flipped cards */
            deck1flipped='';
            deck2flipped='';

            /* Check if player won */
            checkIfEndGame();
        }else{
            /* We don't have a match*/
            /* Flip cards after 1000 ms */
            setTimeout(function() {
                /* Flip the card that havent been matched */
                flipUnmatchedCards('deck1', 'red_back');
                flipUnmatchedCards('deck2', 'yellow_back');
            }, 1000);
            /* Clear flipped Cards */
            deck1flipped='';
            deck2flipped='';
        }
}

function checkIfEndGame() {
    setTimeout(function() {
        if (deck1.length == deckMatched.length) {
            alert('Congratulations! You won!');
        }
    }, 2000 );
}
