let music_list=[
    {
        name:"Aankho Mein Teri",
        artist:"KK",
        img:"img1",
        src:"music4"
    },
    {
        name:"Tum Mile",
        artist:"Javed Ali",
        img:"img12",
        src:"music2"
    },
    {
        name:"Bheegi Si Bhaagi Si",
        artist:"Mohit Chauhan",
        img:"img9",
        src:"music5"
    },
    {
        name:"Deewana Kar Raha Hai",
        artist:"Rashid Khan,Javed Ali",
        img:"img6",
        src:"music6"
    },
    {
        name:"Falak Tak Chal Sath Mere",
        artist:"Unknow",
        img:"img11",
        src:"music7"
    },
    {
        name:"Tum Bin",
        artist:"Unknow",
        img:"img6",
        src:"music12"
    },
    {
        name:"Mann Mera",
        artist:"Gajendra Verma",
        img:"img4",
        src:"music9"
    },
    {
        name:"Baby Baby",
        artist:"Justin Bieber",
        img:"img5",
        src:"music15"
    },
    {
        name:"Pretty Girl",
        artist:"Maggie Linde",
        img:"img5",
        src:"music10"
    },
    

    
];
const container=document.querySelector('.container');
const img=document.getElementById('img');
const musicname=document.getElementById('name');
const musicartist=document.getElementById('artist');
const music=document.getElementById('audio');
const play=document.querySelector('.play-pause');
const nextbtn=document.getElementById('next');
const prevbtn=document.getElementById('prev');
let progressbar=document.querySelector('.progress-bar');
let progressarea=document.querySelector('.progress-area');
let more_musicbtn=document.querySelector('#list');
let closebtn=document.querySelector('#close');
let musiclist=document.querySelector('.music-list');

let music_index=1;

function loadMusic(index)
{
    musicname.innerHTML=music_list[index-1].name;
    musicartist.innerHTML=music_list[index-1].artist;
    img.src=`images/${music_list[index-1].img}.jpg`;
    music.src=`music/${music_list[index-1].src}.mp3`;
    

}
function playMusic()
{
    container.classList.add('paused');
    play.querySelector('i').innerText="pause";
    music.play();
}
function pause_music()
{
    container.classList.remove('paused');
    play.querySelector('i').innerText="play_arrow";
    music.pause();
}



play.addEventListener('click',()=>{
const ispaused=container.classList.contains('paused')
// console.log(ispaused)
ispaused?pause_music():playMusic();
});

function play_next()
{
    if(music_index==music_list.length)
    {
        music_index=0;
    }
    music_index++;
    loadMusic(music_index);
    playMusic();
}
nextbtn.addEventListener('click',()=>{
    play_next();
})
function play_prev()
{
    if(music_index<1)
    {
        music_index=music_list.length;
    }
    else
    {
        music_index--;
    }
    loadMusic(music_index);
    playMusic();
}
prevbtn.addEventListener('click',()=>{
    play_prev();
})

music.addEventListener('timeupdate',(e)=>{
    // console.log(e);
    const currenttime=e.target.currentTime;
    const duration=e.target.duration;
    progressbar.style.width=`${(currenttime/duration)*100}%`;
    let current=document.querySelector('.start');
    let end_time=document.querySelector('.end');
    music.addEventListener('loadeddata',()=>{
        let main_duration=music.duration;
        let total_min=Math.floor(main_duration/60);
        let total_sec=Math.floor(main_duration%60);
        if(total_sec<10)
        {
            total_sec=`0${total_sec}`;
            
        }
        end_time.innerHTML=`${total_min}:${total_sec}`;
        
    });
    let currentmin=Math.floor(currenttime/60);
    let currentsec=Math.floor(currenttime%60);
    if(currentsec<10)
    {
        currentsec=`0${currentsec}`;
    }
    current.innerHTML=`${currentmin}:${currentsec}`;
})

progressarea.addEventListener('click',(e)=>{
    let progresswidth=progressarea.clientWidth;
    let clickedoffsetx=e.offsetX;
    let songduration=music.duration;
    music.currentTime=(clickedoffsetx/progresswidth)*songduration;
    playMusic();
});

const repeatbtn=document.getElementById('repeat');
repeatbtn.addEventListener('click',()=>{
    let gettext=repeatbtn.innerHTML;
    switch(gettext)
    {
        case "repeat":
        repeatbtn.innerHTML='repeat_one';
        repeatbtn.setAttribute('title','song looped');
        break;
        case "repeat_one":
        repeatbtn.innerHTML='shuffle';
        repeatbtn.setAttribute('title','playback shuffled');
        break;
        case "shuffle":
        repeatbtn.innerHTML='repeat';
        repeatbtn.setAttribute('title','playlist looped');
        break;
    }
});
music.addEventListener('ended',()=>{
    let gettext=repeatbtn.innerHTML;
    switch(gettext)
    {
        case "repeat":
        play_next();
        break;
        case "repeat_one":
            music.currentTime=0;
        loadMusic(music_index);
        playMusic();
        repeatbtn.setAttribute('title','playback shuffled');
        break;
        case "shuffle":
            let randindex=Math.floor(Math.random()*music_list.length)+1;
        do{
            randindex=Math.floor(Math.random()*music_list.length)+1;
        }
        while(music_index===randindex);
        music_index=randindex;
        loadMusic(music_index);
        playMusic();
        break;
    }
});

// music list

more_musicbtn.addEventListener('click',()=>{
    musiclist.classList.toggle('show');
});
closebtn.addEventListener('click',()=>{
    more_musicbtn.click();
})

window.addEventListener('load',()=>{
    loadMusic(music_index);
} );

const ultag=document.querySelector('ul');
for(let i=0;i<music_list.length;i++)
{
    let litag=`
    <li li-index=${i+1}>
       <div class="row">
        <span>${music_list[i].name}</span>
        <p>${music_list[i].artist}</p>
        </div>
        <audio class="${music_list[i].src}" src="music/${music_list[i].src}"></audio>
        <span id="${music_list[i].src}" class="audio-duration">04:03</span>
    </li>
    `
    ultag.insertAdjacentHTML('beforeend',litag);
    

}
// play particular song from list

const alllitag=document.querySelectorAll('li');
for(let i=0;i<alllitag.length;i++)
{
    alllitag[i].setAttribute('onclick',"clicked(this)");
    console.log(alllitag[i]);

}
function clicked(e)
{
    console.log(e);
    let getindex=e.getAttribute('li-index');
    console.log(getindex);
    loadMusic(getindex);
    playMusic();
}
