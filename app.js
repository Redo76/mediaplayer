const musics =[
{
    name : "Blue_Skies",
    URLmusic : "./media/Blue_Skies.mp3",
    pochettes : "./pochettes/250/1.jpg",
    artist : "Silent Partner"
},
{
    name : "Cartoon Hoedown",
    URLmusic : "./media/Cartoon_Hoedown.mp3",
    pochettes : "./pochettes/250/2.jpg",
    artist : "Media Right Productions"
},
{
    name : "Earthy Crust",
    URLmusic : "./media/Earthy_Crust.mp3",
    pochettes : "./pochettes/250/3.jpg",
    artist : "Jingle Punks"
},
{
    name : "Hold On a Minute",
    URLmusic : "./media/Hold_On_a_Minute.mp3",
    pochettes : "./pochettes/250/4.jpg",
    artist : "Silent Partner"
},
{
    name : "JohnDunbar Theme",
    URLmusic : "./media/JohnDunbarTheme.mp3",
    pochettes : "./pochettes/250/5.jpg",
    artist : "City of Prague Philharmonic"
},
{
    name : "Stay with You",
    URLmusic : "./media/Stay_with_You.mp3",
    pochettes : "./pochettes/250/6.jpg",
    artist : "Silent Partner"
},
{
    name : "Symphony No 5 by Beethoven",
    URLmusic : "./media/Symphony_No_5_by_Beethoven.mp3",
    pochettes : "./pochettes/250/7.jpg",
    artist : "Beethoven"
}
]


const btnBack = document.querySelector('.mediaplayer_back');
const btnPlay = document.querySelector('.mediaplayer_play');
const btnNext = document.querySelector('.mediaplayer_next');
const btnVolumeMute = document.querySelector('.mediaplayer_mute');
const progressionVolume = document.querySelector('.mediaplayer_volume_progression');
const progressionMusic = document.querySelector('.mediaplayer_music_progression');

const musicCard = document.querySelector(".music_card");

const img = document.querySelector(".music_cover");
const artistName = document.querySelector(".artist");
const title = document.querySelector(".title");
const divDuration = document.querySelector(".duration");
const p = divDuration.children;


let audioIndex = Math.floor(Math.random() * 7);
const audio = new Audio(musics[audioIndex].URLmusic);

let playing = false;
let notMuted = true;
let currentVolume = audio.volume;

console.log(musics[audioIndex].URLmusic);

audio.load();



btnPlay.addEventListener("click", () =>{
    if (!playing) {
        audio.play();
        playing = true;
    } else {
        audio.pause();
        playing = false
    }
})

btnVolumeMute.addEventListener("click", () => {
    if (notMuted) {
        currentVolume = audio.volume;
        audio.volume = 0;
        progressionVolume.value = 0; 
        notMuted = false;
    } else {
        audio.volume = currentVolume;
        progressionVolume.value = currentVolume; 
        notMuted = true
    }
})

progressionVolume.addEventListener("change", (e) =>{
    audio.volume = e.target.value;
    e.target.value == "0" ? notMuted = false : notMuted = true; 
})

btnBack.addEventListener("click", () => {
    audioIndex--
    if (audioIndex < 0) {
        audioIndex = musics.length - 1
    }
    audio.src = musics[audioIndex].URLmusic;
    audio.load();
})

btnNext.addEventListener("click", () => {
    audioIndex++;
    if (audioIndex == musics.length) {
        audioIndex = 0;
    }
    audio.src = musics[audioIndex].URLmusic;
    audio.load();
})

audio.addEventListener("loadeddata", () =>{
    if (playing) {
        audio.play()
    }
    displayCurrentMusic();
})

audio.addEventListener("timeupdate", ()=>{
    let minutes = Math.floor(audio.currentTime / 60);
    let secondes = Math.floor(audio.currentTime % 60);
    
    p[0].textContent = minutes + " : " + secondes ;
    
    let pourcentage = (audio.currentTime /  audio.duration) * 100;
    
    progressionMusic.value = pourcentage;
})

progressionMusic.addEventListener("change", (e) =>{
    audio.currentTime = (e.target.value / 100) * audio.duration;
    console.log(audio.currentTime);
})

displayCard();



function displayCurrentMusic(){
    img.src= musics[audioIndex].pochettes;
    
    artistName.textContent = musics[audioIndex].artist
    title.textContent = musics[audioIndex].name;
    
    p[0].textContent = 0;
    
    
    let minutes = Math.floor(audio.duration / 60);
    let secondes = Math.floor(audio.duration % 60);
    p[2].textContent = minutes + " : " + secondes ;
    
    progressionMusic.value = 0;
}

function displayCard() {
    let template = document.querySelector("#temp_card"); 
    for (let i = 0; i < musics.length; i++) {
        let clone = document.importNode(template.content, true);
        
        let img = clone.querySelector(".card-img-top");
        let artist = clone.querySelector(".card-title");
        let title = clone.querySelector(".card-artist");
        let btn = clone.querySelector(".card_play");
        let icone = clone.querySelector(".fa-play")
        
        img.src = musics[i].pochettes;
        
        title.textContent = musics[i].name;
        
        
        artist.textContent = musics[i].artist;
        
        btn.dataset.index = i;
        icone.dataset.index = i;
        
        musicCard.appendChild(clone);

        btn.addEventListener("click", (e)=>{
            audioIndex = e.target.dataset.index;
            audio.src = musics[audioIndex].URLmusic;
            audio.load();
            playing = true;
            
        })
    }
}

