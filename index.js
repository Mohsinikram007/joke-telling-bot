//import { readFile } from "/fs";
var voiceList = document.querySelector('#voiceList');
var btnSpeak = document.querySelector('#btnSpeak');
var btnlisten = document.querySelector('#listenbtn');
var joke = document.querySelector('#joke');

var txtInput = document.querySelector('#txtInput');
var voiceList = document.querySelector('#voiceList');
var btnSpeak = document.querySelector('#btnSpeak');
var synth = window.speechSynthesis;
var voices = [];
var keyj;
let arr;
arr=["What did one pirate say to the other when he beat him at chess?<>Checkmatey.",
"I burned 2000 calories today<>I left my food in the oven for too long.",
"I startled my next-door neighbor with my new electric power tool. <>I had to calm him down by",
"I broke my arm in two places. <>My doctor told me to stop going to those places.",
"I quit my job at the coffee shop the other day. <>It was just the same old grind over and ",
"I used to work at a soft drink can crushing company...<>it was soda pressing.",
"I wondered why the frisbee kept on getting bigger. <>Then it hit me.",
"I was going to tell you a fighting joke...<>but I forgot the punch line.",
"What is the most groundbreaking invention of all time? <>The shovel. ",
"I’m starting my new job at a restaurant next week. <>I can’t wait.",
"I visited a weight loss website...<>they told me I have to have cookies disabled.",
"Did you hear about the famous Italian chef that recently died? <>He pasta way.",
"Broken guitar for sale<>no strings attached.",
"I could never be a plumber<>it’s too hard watching your life’s work go down the drain.",
"What time did you go to the dentist yesterday?<>Tooth-hurty.",
"What kind of music do astronauts listen to?<>Neptunes.",
"Rest in peace, boiled water. <>You will be mist."]
var x=arr.length
console.log(x);
setj()
PopulateVoices();
        if(speechSynthesis !== undefined){
            speechSynthesis.onvoiceschanged = PopulateVoices;
        }

btnSpeak.addEventListener('click',Listenjoke);
function Listenjoke()
{
    var  y=arr[Math.floor((Math.random() * x) + 1)]
    var toSpeak = new SpeechSynthesisUtterance(y);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
    joke.innerHTML=y
    console.log(joke);
    location.reload
};

function PopulateVoices(){
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}


function setj(){
    document.addEventListener('keydown', function(event)
    {
        if(event.key=='j'|| event.key=='J')
        {
            Listenjoke();
        }
        



    });
}

btnlisten.addEventListener('click',Listenme);
function Listenme()
{
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
            
// This runs when the speech recognition service starts
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

recognition.onspeechend = function() {
    // when user is done speaking
    recognition.stop();
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    //var confidence = event.results[0][0].confidence;
    console.log(transcript);
    if(transcript== "Tell me a joke"|| transcript== "Tell me jokes"||transcript== "Tell me joke"||transcript== "tell me a joke"|| transcript== "tell me jokes"||transcript== "tell me joke")
    {
        alert(transcript)
        Listenjoke();
    }
};
              
// start recognition
recognition.start();
}