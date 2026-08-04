/* =====================================================
   OYKAWA HUB V2
   SCRIPT.JS
===================================================== */


/* ================= ELEMENT ================= */

const clock = document.getElementById("clock");

const date = document.getElementById("date");

const greeting = document.getElementById("greeting");

const heroCard = document.getElementById("heroCard");

const themeButton = document.getElementById("theme");

const noteArea = document.getElementById("noteArea");

const shortcutsBox = document.getElementById("shortcuts");

const addShortcut = document.getElementById("addShortcut");


/* ================= CLOCK + GREETING ================= */


function updateTime(){

    const now = new Date();


    clock.innerHTML =
    now.toLocaleTimeString("id-ID");


    date.innerHTML =
    now.toLocaleDateString("id-ID",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });


    const hour = now.getHours();


    heroCard.classList.remove(
        "morning",
        "afternoon",
        "evening",
        "night"
    );


    if(hour < 11){

        heroCard.classList.add("morning");

        greeting.innerHTML = `
            <div class="greeting-icon">
            🌅
            </div>
        </div>

        <div class="greeting-text">
            Selamat Pagi,
        </div>

        `;


    }

    else if(hour < 15){

        heroCard.classList.add("afternoon");


        greeting.innerHTML = `
            <div class="greeting-icon">
            ☀️
            </div>
        </div>

        <div class="greeting-text">
            Selamat Siang,
        </div>

        `;


    }

    else if(hour < 18){

        heroCard.classList.add("evening");


        greeting.innerHTML = `
            <div class="greeting-icon">
            🌇
            </div>
        </div>

        <div class="greeting-text">
            Selamat Sore,
        </div>

        `;


    }

    else{

        heroCard.classList.add("night");


        greeting.innerHTML = `
            <div class="greeting-icon">
            🌙
            </div>
        </div>

        <div class="greeting-text">
            Selamat Malam,
        </div>

        `;

    }

}


setInterval(updateTime,1000);

updateTime();



/* ================= DARK MODE ================= */


if(localStorage.darkMode === "true"){

    document.body.classList.add("dark");

}


themeButton.addEventListener("click",()=>{


    document.body.classList.toggle("dark");


    localStorage.darkMode =
    document.body.classList.contains("dark");


});



/* ================= GOOGLE SEARCH ================= */


document
.getElementById("search")
.addEventListener("keydown",(e)=>{


    if(e.key==="Enter"){


        const query=e.target.value;


        window.open(

        "https://www.google.com/search?q="
        +
        query

        );


    }


});



/* ================= NOTES ================= */


noteArea.value =
localStorage.getItem("notes") || "";


noteArea.addEventListener(
"input",
()=>{


localStorage.setItem(
"notes",
noteArea.value
);


});



/* ================= HABIT ================= */


const habits =
document.querySelectorAll(".habit");


habits.forEach((habit,index)=>{


const saved =
localStorage.getItem(
"habit-"+index
);


habit.checked =
saved==="true";



habit.addEventListener(
"change",
()=>{


localStorage.setItem(

"habit-"+index,

habit.checked

);


});


});



/* ================= SHORTCUT ================= */


let shortcutData =
JSON.parse(
localStorage.getItem("shortcuts")
)
||
[
{
name:"Google",
url:"https://google.com"
},

{
name:"YouTube",
url:"https://youtube.com"
},

{
name:"ChatGPT",
url:"https://chat.openai.com"
}

];



function renderShortcut(){


shortcutsBox.innerHTML="";


shortcutData.forEach((item)=>{


const link =
document.createElement("a");


link.className="shortcut";


link.href=item.url;


link.target="_blank";


link.innerHTML=`

<span>
🌐 ${item.name}
</span>

`;


shortcutsBox.appendChild(link);


});


}



renderShortcut();



addShortcut.addEventListener(
"click",
()=>{


const name =
prompt(
"Nama website:"
);


const url =
prompt(
"Link website:"
);



if(name && url){


shortcutData.push({

name:name,

url:url

});


localStorage.setItem(

"shortcuts",

JSON.stringify(shortcutData)

);



renderShortcut();


}


});
/* ===========================
   HIDDEN VAULT
=========================== */

const vault=document.getElementById("vault");
const logo=document.querySelector(".logo");
const closeVault=document.getElementById("closeVault");

let tapCount=0;

/* ===== BUKA DENGAN TAP LOGO 5x ===== */

logo.addEventListener("click",()=>{

tapCount++;

if(tapCount>=5){

vault.classList.add("show");

tapCount=0;

}

setTimeout(()=>{

tapCount=0;

},1500);

});

/* ===== DESKTOP ===== */

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()=="o"){

vault.classList.add("show");

}

});

/* ===== TUTUP ===== */

closeVault.onclick=()=>{

vault.classList.remove("show");

};

/* ===========================
   TAB
=========================== */

const tabs=document.querySelectorAll(".tab");

tabs.forEach(tab=>{

tab.onclick=()=>{

tabs.forEach(t=>t.classList.remove("active"));

tab.classList.add("active");

document.querySelectorAll(".vault-page").forEach(page=>{

page.style.display="none";

});

document.getElementById(tab.dataset.tab).style.display="flex";

};

});

/* ===========================
   PRIVATE DIARY
=========================== */

const diary=document.getElementById("diaryText");

diary.value=

localStorage.getItem("vaultDiary")||"";

diary.addEventListener("input",()=>{

localStorage.setItem(

"vaultDiary",

diary.value

);

});

/* ===========================
   QUOTE STUDIO
=========================== */

const quoteText=document.getElementById("quoteText");

const quoteAuthor=document.getElementById("quoteAuthor");

const saveQuote=document.getElementById("saveQuote");

const quoteList=document.getElementById("quoteList");

let quoteData=

JSON.parse(

localStorage.getItem("quotes")

)||[];

/* ===== TAMPILKAN ===== */

function renderQuotes(){

quoteList.innerHTML="";

quoteData.forEach((q,index)=>{

quoteList.innerHTML+=`

<div class="quote-item">

<div>"${q.text}"</div>

<b>- ${q.author}</b>

<br>

<button onclick="editQuote(${index})">

✏ Edit

</button>

<button onclick="deleteQuote(${index})">

🗑 Hapus

</button>

</div>

`;

});

}

/* ===== TAMBAH ===== */

saveQuote.onclick=()=>{

if(

quoteText.value.trim()==""||

quoteAuthor.value.trim()==""

)return;

quoteData.push({

text:quoteText.value,

author:quoteAuthor.value

});

localStorage.setItem(

"quotes",

JSON.stringify(quoteData)

);

quoteText.value="";

quoteAuthor.value="";

renderQuotes();
loadDailyQuote();
};

/* ===== HAPUS ===== */

window.deleteQuote=(i)=>{

quoteData.splice(i,1);

localStorage.setItem(

"quotes",

JSON.stringify(quoteData)

);

renderQuotes();
loadDailyQuote();

};

/* ===== EDIT ===== */

window.editQuote=(i)=>{

quoteText.value=

quoteData[i].text;

quoteAuthor.value=

quoteData[i].author;

quoteData.splice(i,1);

localStorage.setItem(

"quotes",

JSON.stringify(quoteData)

);

renderQuotes();
loadDailyQuote();

};

renderQuotes();
loadDailyQuote();
/* ===========================
   QUOTE OF THE DAY
=========================== */

function loadDailyQuote(){

let savedQuotes=JSON.parse(

localStorage.getItem("quotes")

)||[];

if(savedQuotes.length==0){

savedQuotes=[

{

text:"Allah melihat usaha sebelum hasil.",

author:"QS. An-Najm : 39"

},

{

text:"Tidak semua reaksi berlangsung cepat. Begitu juga impian.",

author:"Kausyeo"

},

{

text:"Kesabaran adalah reaksi paling lambat, tetapi hasilnya paling stabil.",

author:"Kausyeo"

}

];

}

const oneDay = 24 * 60 * 60 * 1000;
const dayNumber = Math.floor(Date.now() / oneDay);

const q = savedQuotes[dayNumber % savedQuotes.length];

document.getElementById("dailyQuote").innerHTML=

`"${q.text}"`;

document.getElementById("dailyQuoteAuthor").innerHTML=

`— ${q.author}`;

}
renderQuotes();
loadDailyQuote();

document.querySelectorAll(".project-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const item=btn.parentElement;

item.classList.toggle("active");

});

});