ArrayFirst = ["bl","bc","br","ml","mc","mr","tl","tc","tr"];
KeyCheck = "0";
control = 0;
DrawPoints = 0;
xPoints = 0;
oPoints = 0;
BoardCount = 0;
SwitchI = 0;
deg = 0;
ColorCheck = 0;
theme = "dark";
MusicControl = 0;
SettingsCount = 0;
MusicValue = 50;
WinCount = 0;
Table = "1379";
Table2 = "2468";
function START() {
    WinCount = 0;
    count = 0;
    CheckArray = [0,1,2,3,4,5,6,7,8];
    for(s in ArrayFirst) {
        document.getElementById(ArrayFirst[s]).style.pointerEvents = "auto";
    }
    for(s in ArrayFirst) {
        document.getElementById(ArrayFirst[s]).innerHTML = "";
    }
    document.getElementById("Announcement").innerHTML = "";
    document.body.onkeydown = function() {KeyPressed(event)};
}
function check(a) {
    TurnPlayed(0.1);
    if(control == 0) {
        control++;
        START();
    }
    if(count%2 == 0){
        document.getElementById(ArrayFirst[a-1]).innerHTML = "X";
        document.getElementById(ArrayFirst[a-1]).style.pointerEvents = "none";
        CheckArray[a-1] = "X";
        document.getElementById("favicon").href="circle.png";
    }else {
        document.getElementById(ArrayFirst[a-1]).innerHTML = "O";
        document.getElementById(ArrayFirst[a-1]).style.pointerEvents = "none";
        CheckArray[a-1] = "O";
        document.getElementById("favicon").href="cross.png";
    }
    count++;
    WinCase(a);
}
function LightMode() {
    DropDown(0.01);
    StyleRoot = document.querySelector(':root');
    switch(SwitchI) {
        case 0:
            SaveOpacity = 0.8;
            SaveAOpacity = 1;
            BoardOpacity = 0.8;
            SwitchI++;
            document.getElementById("Switch").classList.remove("rotate");
            document.getElementById("Switch").classList.add("rotate2");
            document.getElementById("Switch").style.transform = "rotate(-80deg)";
            theme="light";
            Colors();
            break;
        case 1:
            SaveOpacity = 0.5;
            SaveAOpacity = 0.8;
            BoardOpacity = 0.3;
            SwitchI--;
            document.getElementById("Switch").classList.remove("rotate2");
            document.getElementById("Switch").classList.add("rotate");
            document.getElementById("Switch").style.transform = "rotate(0deg)";
            theme="dark";
            Colors();
            break;
    }
    StyleRoot.style.setProperty("--SaveOpacity", SaveOpacity);
    StyleRoot.style.setProperty("--SaveAOpacity", SaveAOpacity);
    StyleRoot.style.setProperty("--BoardOpacity", BoardOpacity);
    /*StylesRoots = getComputedStyle(document.querySelector(':root'));
    StylesRoots.getPropertyValue('--black')*/
}
function TIC() {
    
}
function TAC() {

}
function WinCase(a) {
    b = CheckArray;
    if((b[0] == b[1] && b[2] == b[0]) || (b[3] == b[4] && b[5] == b[3]) || (b[6] == b[7] && b[8] == b[6]) || (b[0] == b[3] && b[6] == b[0]) || (b[1] == b[4] && b[7] == b[1]) || (b[2] == b[5] && b[8] == b[2]) || (b[0] == b[4] && b[8] == b[0]) ||  (b[2] == b[4] && b[6] == b[2])) {
        Win(b[a-1]);
        WinCount = 1;
        WinSound(0.2);
        document.getElementById("favicon").href="loading.png";
        document.body.onkeydown = "";
        KeyCheck = "0";
        Table = "1379";
        Table2 = "2468";
        document.body.onkeydown = function() {NextEnter(event)};
    }else if(count == 9){
        document.getElementById("Announcement").innerHTML = "It looks like draw <div id='Again' onclick='NextRound()'>Play Again</div>";
        DrawPoints++;
        document.getElementById("draws").innerHTML = DrawPoints;
        document.getElementById("Save").style.visibility = "visible";
        document.getElementById("favicon").href="loading.png";
        document.body.onkeydown = "";
        KeyCheck = "0";
        Table = "1379";
        Table2 = "2468";
        document.body.onkeydown = function() {NextEnter(event)};
        WinSound(0.2);
    }
}
function Win(a) {
    document.getElementById("Announcement").innerHTML = "Winner: "+ a + "<div id='Again' onclick='NextRound()'>Play Again</div>";
    for(s in ArrayFirst) {
        document.getElementById(ArrayFirst[s]).style.pointerEvents = "none";
    }
    if(a == "X") {
        xPoints++;
        document.getElementById("xys").innerHTML = xPoints;
    }else {
        oPoints++;
        document.getElementById("oys").innerHTML = oPoints;
    }
    document.getElementById("Save").style.visibility = "visible";
}
function NextRound () {
    TurnPlayed(0.03);
    document.getElementById("ScoreBoard").style.display = "flex";
    document.body.onkeydown = function() {};
    START();
}
function Score() {
    DropDown(0.02);
    if(BoardCount == 0){
        document.getElementById("board").style.display = "flex";
        BoardCount++;
        document.getElementById("arrowD").style.transform = "scaleY(-1)";
        document.getElementById("button").style.top = "100px";
    }else {
        document.getElementById("board").style.display = "none";
        BoardCount = 0;
        document.getElementById("arrowD").style.transform = "scaleY(1)";
        document.getElementById("button").style.top = "5px";
    }
    
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function Save() {
    document.getElementById("Save").style.visibility = "hidden";
    TurnPlayed(0.03);
} 
function Color() {
    DropDown(0.01);
    deg+=90;
    document.querySelector(':root').style.setProperty("--FirstColor",deg-90+"deg");
    document.querySelector(':root').style.setProperty("--EndColor",deg+"deg");
    switch(ColorCheck%2) {
        case 0:
            document.getElementById("Color").classList.remove("ColorRotate");
            document.getElementById("Color").classList.add("Colored");
            ColorCheck++;
            break;
        case 1:
            document.getElementById("Color").classList.remove("Colored");
            document.getElementById("Color").classList.add("ColorRotate");
            if(ColorCheck==3) ColorCheck=-1;
            ColorCheck++;
            break;    
    }
    document.getElementById("Color").style.transform = "rotate("+deg+"deg)";
    if(deg==360){
        deg=0;
    }
    Colors();
}
function Colors() {
    StyleRoot = document.querySelector(':root');
    switch(ColorCheck){
        case 0:
            if(theme=="light"){
                MainBg = "rgb(256,256,256)";
                MainFont = "rgb(0,0,0)";
                GameTrueBorder = "rgb(0,0,0)";
                GameTrueBgHover = "rgb(220,220,220)";
                GameTrueBorderHover = "rgb(100,100,100)";
                AgainBgBorder = "rgb(196,196,196)";
                SaveBg = "rgb(166,166,166)";
            }else {
                MainBg = "rgb(0,0,0)";
                MainFont = "rgb(256,256,256)";
                GameTrueBorder = "rgb(40,40,40)";
                GameTrueBgHover = "rgb(5,5,5)";
                GameTrueBorderHover = "rgb(27,27,27)";
                AgainBgBorder = "rgb(30,30,30)";
                SaveBg = "rgb(40,40,40)";
            }
            document.getElementById("Color").style.filter = "none";
            break;
        case 1:
            if(theme=="light"){
                MainBg = "#34ff1a";
                MainFont = "#094d00";
                GameTrueBorder = "#0f8000";
                GameTrueBgHover = "#18cc00";
                GameTrueBorderHover = "#129900";
                AgainBgBorder = "#15b300";
                SaveBg = "#129900";
            }else {
                MainBg = "#063300";
                MainFont = "#34ff1a";
                GameTrueBorder = "#094d00";
                GameTrueBgHover = "#0f8000";
                GameTrueBorderHover = "#15b300";
                AgainBgBorder = "#129900";
                SaveBg = "#18cc00";
            }
            document.getElementById("Color").style.filter = "opacity(0.5) drop-shadow(0 0 0 green)";
            break;    
        case 2:
            if(theme=="light"){
                MainBg = "#1a47ff";
                MainFont = "#001466";
                GameTrueBorder = "#001466";
                GameTrueBgHover = "#0029cc";
                GameTrueBorderHover = "#001a80";
                AgainBgBorder = "#0033ff";
                SaveBg = "#002ee6";
            }else {
                MainBg = "#001466";
                MainFont = "#1a47ff";
                GameTrueBorder = "#002ee6";
                GameTrueBgHover = " #001f99";
                GameTrueBorderHover = "#0024b3";
                AgainBgBorder = "#0033ff";
                SaveBg = "#335cff";
            }
            document.getElementById("Color").style.filter = "opacity(0.5) drop-shadow(0 0 0 darkblue)";
            break;
        case 3:
            if(theme=="light"){
                MainBg = "#8a00e6";
                MainFont = "#3d0066";
                GameTrueBorder = "#4c0080";
                GameTrueBgHover = "#6b00b3";
                GameTrueBorderHover = "#5c0099";
                AgainBgBorder = "#7a00cc";
                SaveBg = "#a31aff";
            }else {
                MainBg = "#2e004d";
                MainFont = "#7a00cc";
                GameTrueBorder = "#6b00b3";
                GameTrueBgHover = "#5c0099";
                GameTrueBorderHover = "#4c0080";
                AgainBgBorder = "#5c0099";
                SaveBg = "#4c0080";
            }
            document.getElementById("Color").style.filter = "opacity(0.5) drop-shadow(0 0 0 violet)";
            break;
    }
    StyleRoot.style.setProperty("--MainBg",MainBg);
    StyleRoot.style.setProperty("--MainFont",MainFont);
    StyleRoot.style.setProperty("--GameTrueBorder",GameTrueBorder);
    StyleRoot.style.setProperty("--GameTrueBgHover",GameTrueBgHover);
    StyleRoot.style.setProperty("--GameTrueBorderHover",GameTrueBorderHover);
    StyleRoot.style.setProperty("--AgainBgBorder",AgainBgBorder);
    StyleRoot.style.setProperty("--SaveBg",SaveBg);
}
function KeyPressed(key) {
    x = key.code;
    if(x.substring(0,6) == "Numpad" && x != "Numpad0" && x.length == 7){
        if(!KeyCheck.includes(x.substring(6,7))){
            KeyCheck+= x.substring(6,7);
            Replace(x.substring(6,7));
            check(x.substring(6,7));
            if(WinCount == 0) Bot();
        }
    }
}
function NextEnter(key) {
    x = key.code;
    if(x.includes("Enter")) NextRound();
}
function WinSound(a) {
    x=a*MusicValue/50;
    document.getElementById("Win").volume = x;
    document.getElementById("Win").play();
}
function TurnPlayed(a) {
    x=a*MusicValue/50;
    document.getElementById("Hover").volume = x;
    document.getElementById("Hover").play();
}
function DropDown(a) {
    x=a*MusicValue/50;
    document.getElementById("DropDown").volume = x;
    document.getElementById("DropDown").play();
}
function Settings() {
    DropDown(0.02);
    if(SettingsCount == 0){
        document.getElementById("LightControl").style.display = "flex";
        document.getElementById("ColorControl").style.display = "flex";
        document.getElementById("MusicControl").style.display = "flex";
        document.getElementById("SoundControl").style.display = "flex";
        document.getElementById("Settings").style.width = "140px";
        document.getElementById("Settings").style.height = "270px";
        SettingsCount++;
        document.getElementById("arrowD2").style.transform = "scaleY(-1)";
        document.getElementById("button2").style.top = "260px";
    }else {
        document.getElementById("LightControl").style.display = "none";
        document.getElementById("ColorControl").style.display = "none";
        document.getElementById("MusicControl").style.display = "none";
        document.getElementById("SoundControl").style.display = "none";
        document.getElementById("Settings").style.width = "0px";
        document.getElementById("Settings").style.height = "0px";
        SettingsCount = 0;
        document.getElementById("arrowD2").style.transform = "scaleY(1)";
        document.getElementById("button2").style.top = "5px";
    }
}
function Music() {
    DropDown(0.01);
    document.getElementById("BackgroundMusic").volume = 0.05*MusicValue/50;
    if(MusicControl==0){
        document.getElementById("BackgroundMusic").play();
        MusicControl++;
        document.getElementById("Music").src = "Music.png";
    }else {
        document.getElementById("BackgroundMusic").pause();
        MusicControl--;
        document.getElementById("Music").src = "MusicOff.png";
    }
}
function Sound() {
    DropDown(0.01);
    document.getElementById("inputed").style.display = "flex";
}
function SliderLight() {
    document.getElementById("inputed").style.opacity = 0.7;
}
function SliderDark() {
    document.getElementById("inputed").style.opacity = 0.5;
}
function Hide() {
    document.getElementById("inputed").style.display = "none";
}
function Click(klik) {
    KeyCheck+=klik;
    check(klik);
    Replace(klik);
    if(WinCount == 0) Bot();
}
function Change() {
    MusicValue = document.getElementById("vol").value*100;
    if(MusicValue/100==0) {
        document.getElementById("Sound").src = "SoundOff.png";
    }else {
        document.getElementById("Sound").src = "Sound.png";
    }
    document.getElementById("BackgroundMusic").volume = 0.05*MusicValue/50
    document.getElementById("AudioCount").innerHTML = MusicValue;
}
function Bot() {
    if(!KeyCheck.includes("5")) {
        BotClick = 5;
    }else if(Table.length){
        BotClick = Table[Math.floor(Math.random() * Table.length)];
    }else {
        BotClick = Table2[Math.floor(Math.random() * Table2.length)];
    }
    KeyCheck += BotClick;
    Replace(BotClick);
    setTimeout(check,200,BotClick);
    console.log("asd");
}
function Replace(a){
    if(a%2!= 0 && a != 5) {
        Table = Table.replace(a,"");
        console.log(Table);
    }else {
        Table2 = Table2.replace(a,"");
        console.log(Table2);
    }
}
//Sztuczna inteligencja
//Dodatki (blossom tree)