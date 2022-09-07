const audio = document.getElementById("audio");
const menu = document.getElementById("click-menu");
const control = document.getElementById("control");

const range = document.getElementById("my-range");
const timeStart = document.getElementById("time-start");
const timeEnd = document.getElementById("time-end");

const action_pause = document.getElementById("a-pause");
const action_continue = document.getElementById("a-continue");
const next = document.getElementById("next");
const lui = document.getElementById("lui");

const action_repeat = document.getElementById("repeat");
const action_random = document.getElementById("random");
const action_speed = document.getElementById("speed");
const action_sleep = document.getElementById("sleep");

const note = document.getElementById("note");
const note_content = document.getElementById("note-content");
const minute = document.getElementById("minute");

const list = document.getElementById("list");
const list1 = document.getElementById("list1");
const count = document.getElementById("count");
const songName = document.getElementById("song-name");
const singer = document.getElementById("singer");


// const app = {
//     tay: 'aaaaaa',
//     chan: 'cccc',
//     c: function () {
//         this.tay;
//     }
// }




// const listSong = [
//     {
//         name: '',
//         path: '',

//     }
// ]

// let isPlaying = true;

// const playSong = () => {
//     control.click(() => {
//         audio.play()
//     })
// }

// const pauseSong = () => {
//     control.click(() => {
//         audio.pause()
//         isPlaying = false;
//     })
// }

// const prive = () => {

// }

// const getDefaultSong = listSong.find(v => v.name = '');


// const arr = [];
// arr.forEach(v => v, ldfjfsdf)

// function fdfhj() {
//     fsafdhfdfh
// }


const app = {
    i: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isSleep: false,
    speedDefault: 1,
    currentIndex: 0,
    songs: [

        {
            'songName': `Anh nen yeu co ta 1`,
            'singer': 'Bich Huu1',
            'patch': './media/BenTrenTangLauVersion2-TangDuyTan-7655070.mp3',
        },
        {
            'songName': 'Anh nen yeu co ta 2',
            'singer': 'Du Thien1',
            'patch': './media/ViMeAnhBatChiaTay-MiuLe-7503053.mp3',
        },
        {
            'songName': 'Anh nen yeu co ta 3',
            'singer': 'Bich Huu1',
            'patch': './media/BenTrenTangLauVersion2-TangDuyTan-7655070.mp3',
        },
        {
            'songName': 'Anh nen yeu co ta 4',
            'singer': 'Du Thien1',
            'patch': './media/q1.mp3',
        },
        {
            'songName': 'Anh nen yeu co ta 5 ',
            'singer': 'Bich Huu1',
            'patch': './media/BenTrenTangLauVersion2-TangDuyTan-7655070.mp3',
        },
        {
            'songName': 'Anh nen yeu co ta 6',
            'singer': 'Du Thien1',
            'patch': './media/q1.mp3',
        },


    ],
    render: function () {
        let listSong = '';
        listSong = this.songs.map((item, index) => {
            return `
            <div class="song list-01 ${index === this.currentIndex ? "active" : ""
                }" data-index = "${index}">
                <div class="primary-song">
                    <p class="">${item.songName}</p>
                    <span class="">${item.singer}</span>
                </div>
                 <div class="current-sonng"></div>
          </div>`
        })
        listSong = listSong.toString().replace(/,/g, '');
        list.innerHTML = listSong;

    },

    defineProperties: function () {
        Object.defineProperty(app, "currentSong",
            {
                get: function () {
                    return this.songs[this.currentIndex]
                }
            });
    },
    //

    handleEvents: function () {
        const _this = this;
        let isChange = false;
        let currentTimeApp = 0;
        let currentDown = 0;
        // => show/hidden list song
        menu.onclick = function () {
            list.classList.toggle("is-menu-active")
        }

        // handle list 
        list.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {
                }
            }
        };

        // => control play Music
        control.onclick = function () {
            _this.isPlaying ? audio.pause() : audio.play();
            // console.log('_this.isPlaying', _this.isPlaying);
        };

        audio.onplay = function () {
            // console.log('chay');
            range.max = 100;
            _this.isPlaying = true;

            control.classList.add("is-playing");
            audio.playbackRate = _this.speedDefault;
            return;

        };
        audio.onpause = function () {
            // console.log(`dung`);
            // console.log('onpause');
            _this.isPlaying = false;
            control.classList.remove("is-playing");
            return;
        };



        // => when song fished.
        audio.onended = function () {
            range.max = 0; // ve gia tri ban dau khi het bai nhung van con event onMouseDown
            timeStart.innerHTML = `00:00`;
            console.log("het bai");
            control.classList.add("is-playing");
            _this.check();
            
            // if (_this.isRepeat) {
            //     action_repeat.click();
            //     return;
            // }
            if (_this.isRandom) {
                console.log(`co ram dom`);
                let randomNumber =0 ;

                do {
                    randomNumber = _this.getRandomNumber();
                } while (randomNumber == _this.currentIndex);
                _this.currentIndex = randomNumber;
            }else{
                (_this.currentIndex == _this.songs.length - 1) ? (_this.currentIndex = 0) : _this.currentIndex += 1;
            }

            // _this.currentIndex =  (_this.currentIndex == _this.songs.length-1) ? (_this.currentIndex = 0) : _this.currentIndex +=1;

            console.log(_this.currentIndex)
            _this.loadCurrentSong();
            audio.play();
            _this.render();


        }
        // _this.defineProperties();
        // console.log(_this.currentIndex);

        // console.log(audio.play());
        //update time
        audio.onloadedmetadata = function () {


            let songTime = Math.floor(audio.duration);
            if (songTime < 60) {
                timeEnd.innerHTML = (songTime < 10) ? `00:0${songTime}` : `00:${songTime}`;
            } else {
                let minuteCurrentSong = Math.trunc(songTime / 60);
                minuteCurrentSong = (minuteCurrentSong < 10) ? `0${minuteCurrentSong}` : `${minuteCurrentSong}`;
                let secondCurrentSong = songTime - minuteCurrentSong * 60;
                secondCurrentSong = (secondCurrentSong < 10) ? `0${secondCurrentSong}` : `${secondCurrentSong}`;
                timeEnd.innerHTML = `${minuteCurrentSong}:${secondCurrentSong}`;
            }
        }

        range.onchange = function () {
            control.classList.add("is-playing");
            // alert(1)
            // console.log(range.value);
            //  audio.controls = true;
            audio.currentTime = Math.floor(range.value / 100 * audio.duration);
            // return range.value;
            return;
        };

        range.onmousedown = function () {
            audio.ontimeupdate = false;
            audio.play();

        }
        range.onmouseup = function () {
            audio.ontimeupdate = function () {
                // console.log(this.currentTime)
                let currentTime = Math.floor(this.currentTime);
                range.value = (currentTime / Math.floor(audio.duration) * 100);
                if (currentTime < 60) {
                    timeStart.innerHTML = (currentTime < 10) ? `00:0${currentTime}` : `00:${currentTime}`;
                } else {
                    let minuteCurrentSong = Math.trunc(currentTime / 60);
                    minuteCurrentSong = (minuteCurrentSong < 10) ? `0${minuteCurrentSong}` : `${minuteCurrentSong}`;
                    let secondCurrentSong = currentTime - minuteCurrentSong * 60;
                    secondCurrentSong = (secondCurrentSong < 10) ? `0${secondCurrentSong}` : `${secondCurrentSong}`;
                    timeStart.innerHTML = `${minuteCurrentSong}:${secondCurrentSong}`;
                }
            };
        };
        range.oninput = function () {
            // timeStart.innerHTML = this.value;
            let currentTime = Math.floor(this.value / 100 * audio.duration);
            if (currentTime < 60) {
                timeStart.innerHTML = (currentTime < 10) ? `00:0${currentTime}` : `00:${currentTime}`;
            } else {
                let minuteCurrentSong = Math.trunc(currentTime / 60);
                minuteCurrentSong = (minuteCurrentSong < 10) ? `0${minuteCurrentSong}` : `${minuteCurrentSong}`;
                let secondCurrentSong = currentTime - minuteCurrentSong * 60;
                secondCurrentSong = (secondCurrentSong < 10) ? `0${secondCurrentSong}` : `${secondCurrentSong}`;
                timeStart.innerHTML = `${minuteCurrentSong}:${secondCurrentSong}`;
            }
        }
        audio.ontimeupdate = function () {
            // console.log(this.currentTime)
            let currentTime = Math.floor(this.currentTime);
            range.value = (currentTime / Math.floor(audio.duration) * 100);
            if (currentTime < 60) {
                timeStart.innerHTML = (currentTime < 10) ? `00:0${currentTime}` : `00:${currentTime}`;
            } else {
                let minuteCurrentSong = Math.trunc(currentTime / 60);
                minuteCurrentSong = (minuteCurrentSong < 10) ? `0${minuteCurrentSong}` : `${minuteCurrentSong}`;
                let secondCurrentSong = currentTime - minuteCurrentSong * 60;
                secondCurrentSong = (secondCurrentSong < 10) ? `0${secondCurrentSong}` : `${secondCurrentSong}`;
                timeStart.innerHTML = `${minuteCurrentSong}:${secondCurrentSong}`;
            }
        };

        // => Next song
        next.onclick = function () {
            audio.onended();
        };

        // => lui` song
        lui.onclick = function () {
            _this.currentIndex--;

            if (_this.currentIndex < 0) {
                _this.currentIndex = _this.songs.length - 1;
            }
            // console.log(_this.currentIndex);
            _this.loadCurrentSong();
            audio.play();
            _this.render();
        };

        // => Repeat song
        action_repeat.onclick = function (e) {

            action_repeat.classList.toggle("is-active");
            const repeatNode = e.target.closest(".is-active")
            _this.isRepeat = (repeatNode) ? true : false;
            audio.loop = _this.isRepeat;
        };

        // => Speed song
        action_speed.onclick = () => {

            _this.speedDefault += 0.25;
            if (_this.speedDefault >= 4.5) {
                _this.speedDefault = 1;
            }
            // console.log(_this.speedDefault);
            audio.playbackRate = _this.speedDefault;
            count.innerHTML = _this.speedDefault;
        }

        //  => sleep mode
        action_sleep.onclick = function (e) {
            this.classList.toggle("is-active");
            note.classList.toggle("note-active")
            const sleepNode = e.target.closest(".is-active");
            _this.isSleep = (sleepNode) ? true : false;
            if (sleepNode) {

                // console.log(sleepNode);
                let setMinute = 5000;
                note_content.innerHTML = `Dừng phát nhạc sau: ` + setMinute / 1000 + ` giay`;
                const myTimeout = setTimeout(myGreeting, setMinute);
                function myGreeting() {
                    if (_this.isSleep) {

                        audio.pause();
                        action_sleep.classList.remove("is-active");
                        note.classList.remove("note-active");
                    } else {

                        clearTimeout(myTimeout);
                    }
                };
            }
        };

        // => random song
        action_random.onclick = function (e) {

            this.classList.toggle("is-active");
            const randomNode = e.target.closest(".is-active");
            _this.isRandom = (randomNode) ? true : false;
        };
    },

    // getCurrentTime: (currentDown) => {
    //     let time = Math.floor(audio.duration);
    //     let currentTime = Math.floor(currentDown / 100 * time);
    //     // console.log(currentTime);
    //     return currentTime;
    // },

    getRandomNumber: function () {
        return Math.floor(Math.random() * this.songs.length);
    }
    ,
    check: function () {
        if (this.isRepeat) {
            action_repeat.classList.add("is-active");

        }
        if (this.isRandom) {
            action_random.classList.add("is-active");

        }
    },
    loadCurrentSong: function () {
        // console.log(this.currentIndex);
        // console.log(cur);
        songName.innerText = this.currentSong.songName;
        singer.innerText = this.currentSong.singer;
        audio.src = this.currentSong.patch;
    },

    start: function () {

        this.defineProperties();

        this.handleEvents();
        this.loadCurrentSong();
        this.render();
        this.check();

        // console.log(`number random`,Math.floor(Math.random() * 6));
    }
}
app.start();
