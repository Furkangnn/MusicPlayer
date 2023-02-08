///////// data
let songs = [
  "Where Are You",
  " Turn of the Lights",
  "Red",
  "Until Now",
  "Your Time Capsule",
  "Best Decade For You",
  " Discover Weekley",
  "Indie Music",
];
let Writter = [
  "Calum Scot",
  "By Larin",
  "Taylor Swift",
  "Burak Yeter",
  "Devi Lacoota",
  "Edwige Lauern",
  "Swedish Houe",
  "Erwin Arneald",
];

//////// declaretion part

const rowSong = document.querySelectorAll(".row-song");
let totalSongsCount = 8;
let currentSongIndex = 1;
let ismusicPlaying = false;
const btnplay = document.querySelector("#play");
const btnpback = document.querySelector("#back");
const btnskip = document.querySelector("#skip");
const currentsong = document.querySelector("#music");
const currentime = document.querySelector("#current-time");
const duration = document.querySelector("#song-duration");
const progresBar = document.querySelector("#progresbar");
const songInfoName = document.querySelector("#song-info-name");
const songInfoImg = document.querySelector("#song-info-img");
const songInfoWriter = document.querySelector("#song-info-writer");
const personInfoIcon = document.querySelector("#icon-person-info");
const personInfo = document.querySelector("#person-info");
const library = document.querySelector(".library");
const songList = document.querySelector(".song-list");
const songQueue = document.querySelector(".song-queue");

/////////Functions
function choosenSong() {
  rownindex = Math.floor(currentSongIndex / 5);
  songindex = currentSongIndex % 4 == 0 ? 4 : currentSongIndex % 4;

  for (i = 0; i < 2; i++) {
    for (j = 0; j < 4; j++) {
      rowSong[i].children[j].classList.remove("addstyle");
    }
  }

  rowSong[rownindex].children[songindex - 1].classList.add("addstyle");
}

function playmusic(_currentSongIndex) {
  let _ismusicPlaying = true;
  currentsong.src = `music/music${_currentSongIndex}.mp3`;
  choosenSong();
  currentsong.play();
  controller(_ismusicPlaying);
  songInfoImg.src = `img/Rectangle${_currentSongIndex}.png`;
  songInfoName.textContent = Writter[_currentSongIndex - 1];
  songInfoWriter.textContent = songs[_currentSongIndex - 1];
  songQueueCustum(` <p><a href=""> ${Writter[currentSongIndex - 1]}</a></p>`);
}

function controller(_ismusicPlaying) {
  if (_ismusicPlaying) {
    btnplay.classList.add("gg-play-stop-o");
    btnplay.classList.remove("gg-play-button-o");
  } else {
    btnplay.classList.add("gg-play-button-o");
    btnplay.classList.remove("gg-play-stop-o");
  }
}

function pickSong(_currentSongIndex) {
  currentSongIndex = _currentSongIndex;
  playmusic(currentSongIndex);
}

//////Event Listeners
btnplay.addEventListener("click", function () {
  if (!ismusicPlaying) {
    ismusicPlaying = true;
    this.classList.add("gg-play-stop-o");
    this.classList.remove("gg-play-button-o");
    choosenSong();
    currentsong.play();
  } else {
    ismusicPlaying = false;
    this.classList.add("gg-play-button-o");
    this.classList.remove("gg-play-stop-o");
    currentsong.pause();
  }
});

currentsong.addEventListener("timeupdate", (e) => {
  //song duration
  songDuration = e.target.duration;
  durationMin = Math.floor(songDuration / 60);
  sec = Math.floor(songDuration % 60);
  durationSecnd = sec < 10 ? `0${sec}` : sec;
  duration.textContent = `${durationMin}:${durationSecnd}`;

  //current time
  currentMin = Math.floor(e.target.currentTime / 60);
  currSecnd = Math.floor(e.target.currentTime % 60);
  currentSecnd = currSecnd < 10 ? `0${currSecnd}` : currSecnd;
  currentime.textContent = `${currentMin}:${currentSecnd}`;

  oran = (e.target.currentTime / e.target.duration) * 100;
  progresBar.value = oran;
  progresBar.style.background = `linear-gradient(
    90deg,
    rgba(117, 252, 117) ${progresBar.value}% ,
    rgb(214, 214, 214) ${0}%
  )`;
});

progresBar.oninput = function () {
  currentsong.currentTime = (progresBar.value * currentsong.duration) / 100;
};

btnskip.addEventListener("click", () => {
  currentSongIndex = Number(currentSongIndex) + 1;
  if (currentSongIndex == totalSongsCount + 1) {
    currentSongIndex = 1;
  }
  playmusic(currentSongIndex);
});

btnpback.addEventListener("click", () => {
  currentSongIndex = currentSongIndex - 1;
  if (currentSongIndex == 0) {
    currentSongIndex = totalSongsCount;
  }
  playmusic(currentSongIndex);
});

personInfoIcon.addEventListener("click", () => {
  personInfo.classList.toggle("passife");
});

////Auto Fill Row-songdiv
for (i = 1; i < 9; i++) {
  if (i <= 4) {
    const songdiv = ` <div>
        <img src="img/Rectangle${i}.png"  id="${i}"  alt="" />
        <h4>${Writter[i - 1]}</h4>
        <p>${songs[i - 1]}</p>
        </div>`;

    rowSong[0].insertAdjacentHTML("beforeend", songdiv);
  } else {
    const songdiv = ` <div>
        <img src="img/Rectangle${i}.png" id="${i}" alt="" />
        <h4>${Writter[i - 1]}</h4>
        <p>${songs[i - 1]} </p>
        </div>`;
    rowSong[1].insertAdjacentHTML("beforeend", songdiv);
  }
}
// picking song

for (i = 0; i < totalSongsCount; i++) {
  if (i < 4) {
    rowSong[0].children[i].addEventListener("click", (e) => {
      pickSong(e.target.id);
    });
  } else {
    rowSong[1].children[i - 4].addEventListener("click", (e) => {
      pickSong(e.target.id);
    });
  }
}

//library

for (i = 0; i < library.children.length; i++) {
  library.children[i].addEventListener("click", (e) => {
    pickSong(e.target.id);
  });
}

// song list
songList;
for (i = 0; i < songList.children.length; i++) {
  songList.children[i].addEventListener("click", (e) => {
    e.preventDefault();
    pickSong(e.target.id);
  });
}

//quuee
function songQueueCustum(newSong) {
  a = songQueue.children[1].innerHTML;
  b = songQueue.children[2].innerHTML;

  songQueue.children[2].innerHTML = a;
  songQueue.children[3].innerHTML = b;

  songQueue.children[1].innerHTML = newSong;
}
