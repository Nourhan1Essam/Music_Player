let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let title = document.querySelector(".title");
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector(".volume_show");
let slider = document.querySelector("#duration_slider");
let show_duration = document.querySelector("#show_duration");
let track_image = document.querySelector(".track_img");
let auto_play = document.querySelector("#auto");
let present = document.querySelector(".present");
let total = document.querySelector(".total");
let artist = document.querySelector(".artist");

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//create an audio element
let track = document.createElement('audio');

//all songs list
let all_song = 
[
    {
        name: "first song",
        path: "songs/1.mp3",
        img: "images/1.jpg",
        singer: "first singer",
    },
    {
        name: "second song",
        path: "songs/2.mp3",
        img: "images/2.jpg",
        singer: "second singer",
    },
    {
        name: "third song",
        path: "songs/3.mp3",
        img: "images/3.jpg",
        singer: "third singer",
    },
    {
        name: "fourth song",
        path: "songs/4.mp3",
        img: "images/4.jpg",
        singer: "fourth singer"
    },
    {
        name: "fifth song",
        path: "songs/5.mp3",
        img: "images/5.jpg",
        singer: "fifth singer",
    }
];

//All function

//function load the track
function load_track(index_no)
{
    clearInterval(timer);
    reset_slider()
    track.src = all_song[index_no].path;
    title.innerHTML = all_song[index_no].name;
    track_image.src = all_song[index_no].img;
    artist.innerHTML = all_song[index_no].singer;
    track.load();

    total.innerHTML = all_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);

function mute_sound()
{
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

//reset song slider
function reset_slider()
{
    slider.value = 0; 
}

function justplay()
{
    if(playing_song == false)
    {
        playsong();
    }
    else 
    {
        pausesong();
    }
}

function playsong()
{
    track.play();
    playing_song = true;
    play.innerHTML = "<i class='bx bx-pause-circle'></i>";
}

function pausesong()
{
    track.pause();
    playing_song = false;
    play.innerHTML = "<i class='bx bx-play-circle'></i>";
}

function next_song()
{
    if(index_no < all_song.length - 1)
    {
        index_no += 1;
        load_track(index_no);
        playsong();
    }
    else
    {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

function previous_song()
{
    if(index_no > 0)
    {
        load_track(index_no);
        playsong();
    }
    else
    {
        index_no = all_song.length - 1;
        load_track(index_no);
        playsong();
    }
}

//change volume
function volume_change()
{
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100; 
}

//change slider position
function change_duration()
{
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function range_slider()
{
    let position = 0;

    if(!isNaN(track.duration))
    {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //function will run when the song is over
    if (track.ended)
    {
        play.innerHTML = '<i class = "fa fa-play"></i>';
        if(autoplay == 1)
        {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}

