
<!--FULL SCREEN NAV-->
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
<!--FULL SCREEN NAV-end-->
<!--GAME OVER-->
function openNavGame() {
    document.getElementById("myNavGame").style.width = "100%";
}

function closeNavGame() {
    document.getElementById("myNavGame").style.width = "0%";
}
<!--GAME OVER-end-->

    let score = 1000;
    music = () => {
        let audio = new Audio('8bit.mp3');
        audio.play();
    };
    // music();


    randomColor = () => {
        let arrayColor = ['#dd4d46','#ddd5b5','#9e967d','#659e92','#35adcf','#cf7ea4',
            '#cf9a35'];
        let temp = Math.floor(Math.random() * arrayColor.length) + 1;
        let chosenColor = arrayColor[temp];
        console.log(chosenColor);
        // background-color: #dd4d46;
        // return chosenColor;
        $('.blockOn').css('background-color', chosenColor);
    };




    scoreCalc = () => {
        let updateScore = $('#displayScore');
        updateScore.css('font-size', '20px');
        let updateScoreTwo = $('#wynikFull');
        updateScore.text(score);

        updateScore.css('font-family', 'Apple SD Gothic Neo');
    };
    scoreCalc();
    // $('#macierz').hide();

    // console.log(myArrayOfArrays[1][1]);

    let macierz = [
        [0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ];
    // console.log(macierz[0][3]);
    /////////////////////////////



    /////////////////////////////
    randomCube = () => {
        // let randomTetromino=Math.floor((Math.random() * 4) + 1);


        if (zIn==0){
            // i
            macierz[0]= [0,0,0,1,0,0,0,0];
            // macierz[1]= [0,0,0,1,0,0,0,0];
            // macierz[2]= [0,0,0,1,0,0,0,0];
            // macierz[3]= [0,0,0,1,0,0,0,0];
            return;
        }else if (zIn==1){
            // O
            macierz[0]= [0,0,0,1,1,1,0,0];
            macierz[1]= [0,0,0,1,0,1,0,0];
            macierz[2]= [0,0,0,1,1,1,0,0];
            // macierz[3]= [0,0,0,0,0,0,0,0];
            return;
        }else if (zIn==2){
            // +
            macierz[0]= [0,0,0,0,1,0,0,0];
            macierz[1]= [0,0,0,1,1,1,0,0];
            macierz[2]= [0,0,0,0,1,0,0,0];
        }else if(zIn==3){
            // X
            macierz[0]= [0,0,0,1,0,1,0,0];
            macierz[1]= [0,0,0,0,1,0,0,0];
            macierz[2]= [0,0,0,1,0,1,0,0];
            // macierz[3]= [0,0,0,0,0,0,0,0];
        }

    };
    /////////////////////////////
    let scoreTwo=0;
    check = () => {
        for(var y=macierz.length-1; y>=0; y--) {
            isLineFull = true;
            for(var x=0; x<macierz[y].length; x++) {
                if(macierz[y][x] < 10) {
                    isLineFull = false;
                }
            }
            if (isLineFull) {
                randomColor();

                macierz.splice(y, 1);
                macierz.splice(0, 0, [0,0,0,0,0,0,0,0]);
                y++;
                scoreTwo=(scoreTwo+1)*10;
                $('#wynikFull').text(scoreTwo);
                // randomCube();
                moveDown();
                rysuj();
            }
        }
    };
    /////////////////////////////


    /*RYSUJ*/
    rysuj = () => {

        document.getElementById('macierz').innerHTML = "";
        for (let y = 0; y < macierz.length; y++) {
            for (let x=0; x<macierz[y].length ;x++) {
                if (macierz[y][x] ===0 ) {
                    document.getElementById('macierz').innerHTML += "<div class='empty'></div>";
                }else if (macierz[y][x]=== 1 || macierz[y][x]=== 11){
                    document.getElementById('macierz').innerHTML += "<div class='blockOn'></div>";
                }
            }
            //koniec linijki
            document.getElementById('macierz').innerHTML += "<br>";

        };

    };
    /*RYSUJ-end*/
    ////////////////
    moveDown = () => {
        let possibilityMove = true;


        for (let y = 0; y < macierz.length; y++) {
            for (let x=0; x<macierz[y].length ;x++) {
                if (macierz[y][x] > 0 && macierz[y][x] < 10 )  {
                    if(y === macierz.length-1 || macierz[y+1][x] > 10) {
                        possibilityMove = false;
                        zablokuj();
                    }
                }
            }
        }
        if(possibilityMove){
            for(let y=macierz.length-1;y>=0;y--) {
                for (let x = 0; x < macierz[y].length; x++){
                    if(macierz[y][x] > 0 && macierz[y][x] < 10){
                        macierz[y+1][x] = macierz[y][x];
                        macierz[y][x] = 0;
                    }
                }
                // rysuj();
            }
            rysuj();
        }
        check();
    };
    ////////////////////
    /*--LEFT--*/
    leftMove = () => {
        var possibilityMove = true;

        for (let y = 0; y < macierz.length; y++) {
            for (let x=0; x<macierz[y].length ;x++) {
                if (macierz[y][x] > 0 && macierz[y][x] < 10 )  {
                    if(x === 0 || macierz[y][x] > 10) {
                        possibilityMove = false;
                    }
                }
            }
        }
        if(possibilityMove){
            for(let y=macierz.length-1;y>=0;y--) {
                for (let x = 0; x < macierz[y].length; x++){
                    if(macierz[y][x] > 0 && macierz[y][x] < 10){
                        macierz[y][x-1] = macierz[y][x];
                        macierz[y][x] = 0;
                    }
                }
            }
        }
    };
    ////////////////////
    /*--RGHT--*/
    rightMove = () => {
        possibilityMove = true;

        for (let y = macierz.length-1; y >= 0; y--) {
            for (let x=0; x<macierz[y].length ;x++) {
                if (macierz[y][x] > 0 && macierz[y][x] < 10 )  {
                    if(x === 7 || macierz[y][x+1] > 10) {
                        possibilityMove = false;
                    }
                }
            }
        }
        if(possibilityMove){
            for(let y=macierz.length-1;y>=0;y--) {
                for (let x = macierz[y].length; x >= 0; x--){
                    if(macierz[y][x] > 0 && macierz[y][x] < 10){
                        macierz[y][x+1] = macierz[y][x];
                        macierz[y][x] = 0;
                    }
                }
            }
        }
    };
    /*--RGHTend--*/
    ////////////////////
    /*--INKREMENT--*/
    let zIn = 0;
    // let xIn = 0;
    inkremento = () => {
        score=score-100;
        zIn+=1;
        if (zIn>3){
            zIn =0;
        }
        /* $('#analog').text(zIn); */
        // alert(zIn);
        /* $("#my_image").attr("src","second.jpg"); */
            if (zIn==0){
                $('#changePic').attr('src','0.png');
            }else if (zIn == 1){
                $('#changePic').attr('src','1.png');

            }else if (zIn == 2){
                $('#changePic').attr('src','2.png');

            }else if (zIn == 3){
                $('#changePic').attr('src','3.png');

            }


    console.log(zIn);
    };
    decremento = () => {
        score=score-100;
        zIn-=1;
        if (zIn<0){
            zIn=3;
        }
    /* $('#analog').text(zIn); */

        // alert(zIn);
    /* console.log(zIn); */
    if (zIn==0){
                $('#changePic').attr('src','0.png');
            }else if (zIn == 1){
                $('#changePic').attr('src','1.png');

            }else if (zIn == 2){
                $('#changePic').attr('src','2.png');

            }else if (zIn == 3){
                $('#changePic').attr('src','3.png');

            }
    };
    /*--INKREMENT-end--*/
    ////////////////////
    /*--EVENTY--*/
    document.onkeydown = function(e) {
        if (e.keyCode === 37){
            leftMove();
        } else if (e.keyCode === 39){
            rightMove();
        } else if (e.keyCode === 40){
            score=score+100;
            scoreCalc();
            moveDown();
        }else if (e.keyCode == 13){
            location.reload();
        }else if (e.keyCode == 38){
            // 32 -spacja?
            // SLOWMO
            slowMo();

        }else if (e.keyCode == 27){
            // alert("GAME OVER\nYOUR SCORE: "+ scoreTwo);
            // openNav();
            openNavGame();
        }else if (e.keyCode == 90){
            // Z - DEKREMENTUJ
            decremento();
            scoreCalc();

        }else if (e.keyCode == 88){
            // X - INKREMENTUJ
            inkremento();
            scoreCalc();

        }
    }

    /*--EVENTY-reset-*/

    //SLOWMO RESET
    $(document).keyup(function (e) {
        if (e.keyCode == 38){
            fastMo();
        }
    });





    /*--EVENTY-end--*/
    ////////////////////
    zablokuj = () =>{
        for (let y = 0; y < macierz.length; y++) {
            for (let x=0; x<macierz[y].length ;x++) {
                if(macierz[y][x] > 0 && macierz[y][x] < 10){
                    macierz[y][x]=macierz[y][x]+10;
                }
            }
        }


        randomCube();
        check();

    };



    /*BULLET TIME*/
    let time = 250;


    slowMo = () => {
        time= 1000;

        // filter: blur(4px);
        $('.empty').css('filter', 'blur(2px)');
        $('.blockOn').css('filter', 'contrast(200%)');
        $('.blockOn').css('filter', 'contrast(200%)');
        $('#displayScore').css('filter', 'contrast(200%)');
        $('#displayScore').css('color', 'red');
        $('#displayScore').css('filter', 'brightness(200%');


    };


    fastMo = () => {
        time=250;
        score=score-500;
        scoreCalc();
        $('.empty').css('filter', 'none');
        $('.blockOn').css('filter', 'none');
        $('.blockOn').css('filter', 'none');
        $('#displayScore').css('filter', 'none');
        $('#displayScore').css('color', '#d8cfea');
        $('#displayScore').css('filter', 'none');

    };


    sharpnessMoveDown = () => {
        $('#displayScore').css('color', 'orange');
        score=score+50;
        scoreCalc();
    };

    /*BULLET TIME-end*/
    /*AUDIO*/


    /*AUDIO-end*/

    /*GAME OVER*/
    gameOver = () => {
      if (score < 0){
          // alert("GAME OVER\nYOUR SCORE: "+ scoreTwo);
          $('#wynikFull').text(scoreTwo);
            $('#wynikFull').css('color','lightcoral');
            openNavGame();
      }

    };
    /*GAME OVER-end*/

    function mainCycle() {
        // console.log('CYKL działa');

        moveDown();
        rysuj();
        gameOver();
        setTimeout(mainCycle,time);
    };
    rysuj();
    mainCycle();

    /////////////

//less than 900
mediaJS = (max700) => {
    if(max700.matches){
        // document.body.style.transform = 'scale(0.66)';
        document.body.style.display = 'none';
        alert('This device has too small screen.');



    }
};

let max700 = window.matchMedia("(max-width: 450px)");
mediaJS(max700);
max700.addListener(mediaJS);
//less than 700-end

//more than 900
mediaJS = (more700) => {
    if(more700.matches){
        document.body.style.display = 'block';

    }
};
let more700 = window.matchMedia("(min-width: 450px)");
mediaJS(more700);
more700.addListener(mediaJS);
//more than 700-end
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
window.onresize = function (event) {
    applyOrientation();
}

function applyOrientation() {
    if (window.innerHeight > window.innerWidth) {
        alert(" please stay landscape.");
    }
    // else {
    //     alert("You are now in landscape");
    // }
}