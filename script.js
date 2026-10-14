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

/* =====================================================
   OYKAWA LIBRARY — SUPABASE CLOUD PDF READER
   File disimpan online di bucket Supabase "books".
===================================================== */
(() => {
    const $ = (id) => document.getElementById(id);
    const upload = $('pdfUpload');
    const bookGrid = $('pdfBookGrid');
    const libraryStatus = $('pdfLibraryStatus');
    const reader = $('pdfReader');
    const viewport = $('pdfPageViewport');
    if (!upload || !bookGrid || !reader || !viewport) return;

    // Project URL dan publishable key Supabase milik Oykawa Hub.
    // Publishable key memang digunakan di frontend; jangan masukkan sb_secret/service_role.
    const SUPABASE_URL = 'https://acturiuoozaaxzablpqw.supabase.co';
    const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_BJTcbLlZN9zA5NfMIoxRHQ_QQpgUQt7';
    const BUCKET = 'books';
    const supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    let currentUser = null;
    let currentBook = null;
    let pdfDocument = null;
    let currentPage = 1;
    let zoom = 1;
    let renderToken = 0;
    let pageElements = [];
    const pagePositions = new Map();
    let pageObserver = null;

    if (window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    if (!supabase) {
        $('cloudAuthStatus').textContent = 'Library tidak dapat terhubung. Periksa koneksi internet dan muat ulang halaman.';
        libraryStatus.textContent = 'Supabase SDK belum termuat. Pastikan koneksi internet aktif.';
        return;
    }

    function formatSize(bytes) {
        if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    function safeText(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
    function progressKey(path) { return `oykawa-cloud-progress:${path}`; }
    function getProgress(book) {
        try { return JSON.parse(localStorage.getItem(progressKey(book.path)) || '{}'); }
        catch { return {}; }
    }
    function setProgress(book, patch) {
        const old = getProgress(book);
        localStorage.setItem(progressKey(book.path), JSON.stringify({ ...old, ...patch }));
    }
    function setAuthUi(user) {
        currentUser = user || null;
        $('cloudAuthForm').hidden = !!user;
        $('cloudUserControls').hidden = !user;
        $('cloudUserEmail').textContent = user?.email || '';
        $('cloudAuthStatus').textContent = user
            ? `Login sebagai ${user.email}. PDF milik akun ini tersimpan online.`
            : 'Login atau daftar untuk menyimpan dan membaca PDF secara online.';
        upload.disabled = !user;
        upload.closest('.pdf-upload-button')?.classList.toggle('upload-disabled', !user);
        $('pdfLibraryStatus').textContent = user ? 'Memuat perpustakaan online…' : 'Silakan login untuk melihat perpustakaan online.';
        bookGrid.innerHTML = '';
        if (user) renderLibrary();
    }

    async function refreshSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error(error);
        setAuthUi(data?.session?.user || null);
    }
    async function authAction(kind) {
        const email = $('cloudEmail').value.trim();
        const password = $('cloudPassword').value;
        if (!email || !password) { $('cloudAuthStatus').textContent = 'Isi email dan password terlebih dahulu.'; return; }
        if (password.length < 6) { $('cloudAuthStatus').textContent = 'Password minimal 6 karakter.'; return; }
        $('cloudLogin').disabled = $('cloudSignup').disabled = true;
        $('cloudAuthStatus').textContent = kind === 'signup' ? 'Membuat akun…' : 'Sedang login…';
        try {
            const result = kind === 'signup'
                ? await supabase.auth.signUp({ email, password })
                : await supabase.auth.signInWithPassword({ email, password });
            if (result.error) throw result.error;
            if (kind === 'signup' && !result.data.session) {
                $('cloudAuthStatus').textContent = 'Akun dibuat. Cek email untuk konfirmasi, lalu login di sini.';
            } else {
                $('cloudAuthStatus').textContent = 'Berhasil. Menyiapkan perpustakaan…';
                setAuthUi(result.data.user || result.data.session?.user);
            }
        } catch (error) {
            $('cloudAuthStatus').textContent = `Gagal: ${error.message || 'Periksa email, password, dan pengaturan Supabase.'}`;
        } finally {
            $('cloudLogin').disabled = $('cloudSignup').disabled = false;
        }
    }
    $('cloudLogin').addEventListener('click', () => authAction('login'));
    $('cloudSignup').addEventListener('click', () => authAction('signup'));
    $('cloudPassword').addEventListener('keydown', e => { if (e.key === 'Enter') authAction('login'); });
    $('cloudLogout').addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut();
        if (error) $('cloudAuthStatus').textContent = `Gagal keluar: ${error.message}`;
        else setAuthUi(null);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
        // Avoid heavy work directly in the auth callback.
        setTimeout(() => setAuthUi(session?.user || null), 0);
    });

    async function listBooks() {
        if (!currentUser) return [];
        const { data, error } = await supabase.storage.from(BUCKET).list(currentUser.id, {
            limit: 100, offset: 0, sortBy: { column: 'name', order: 'desc' }
        });
        if (error) throw error;
        return (data || []).filter(item => item.name && !item.name.endsWith('/')).map(item => {
            const path = `${currentUser.id}/${item.name}`;
            const meta = item.metadata || {};
            const progress = getProgress({ path });
            return { id: path, path, name: item.name.replace(/^\d+-[a-f0-9-]+-/i, ''), size: meta.size || 0,
                pageCount: progress.pageCount || 0, lastPage: progress.lastPage || 1, startPage: progress.startPage || 1,
                addedAt: item.created_at ? new Date(item.created_at).getTime() : 0 };
        }).sort((a,b) => b.addedAt - a.addedAt);
    }

    async function renderLibrary() {
        if (!currentUser) return;
        try {
            const books = await listBooks();
            bookGrid.innerHTML = '';
            libraryStatus.textContent = books.length ? `${books.length} PDF tersimpan online di akun ini.` : 'Belum ada buku online. Klik “Tambah PDF” untuk mengunggah.';
            books.forEach(book => {
                const card = document.createElement('article');
                card.className = 'pdf-book-card';
                card.innerHTML = `
                    <div class="pdf-book-cover"><span>PDF</span><div class="book-cover-lines"></div><small>OYKAWA LIBRARY</small></div>
                    <div class="pdf-book-details"><h3>${safeText(book.name)}</h3><p>${formatSize(book.size)} · ${book.pageCount ? `${book.pageCount} halaman` : 'Dokumen PDF'}</p><p class="book-progress">${book.lastPage > 1 ? `Terakhir dibaca: halaman ${book.lastPage}` : 'Belum dibaca'}${book.startPage > 1 ? ` · Awal: ${book.startPage}` : ''}</p>
                    <div class="pdf-book-actions"><button class="open-pdf-book" type="button">Baca buku</button><button class="delete-pdf-book" type="button" aria-label="Hapus ${safeText(book.name)}">🗑</button></div></div>`;
                card.querySelector('.open-pdf-book').addEventListener('click', () => openBook(book));
                card.querySelector('.delete-pdf-book').addEventListener('click', async () => {
                    if (!confirm(`Hapus "${book.name}" dari Oykawa Library online?`)) return;
                    const { error } = await supabase.storage.from(BUCKET).remove([book.path]);
                    if (error) {
                        libraryStatus.textContent = `Tidak dapat menghapus file: ${error.message}. Periksa Storage DELETE policy di Supabase.`;
                        return;
                    }
                    localStorage.removeItem(progressKey(book));
                    if (currentBook?.path === book.path) closeReader();
                    await renderLibrary();
                });
                bookGrid.appendChild(card);
            });
        } catch (error) {
            console.error(error);
            libraryStatus.textContent = `Gagal memuat perpustakaan online: ${error.message || 'periksa koneksi dan Storage policies Supabase.'}`;
        }
    }

    upload.addEventListener('change', async () => {
        if (!currentUser) { libraryStatus.textContent = 'Login terlebih dahulu untuk mengunggah PDF.'; upload.value = ''; return; }
        const files = [...upload.files].filter(file => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
        if (!files.length) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            libraryStatus.textContent = `Mengunggah ${i + 1}/${files.length}: ${file.name}…`;
            try {
                let pageCount = 0;
                if (window.pdfjsLib) {
                    const testDoc = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
                    pageCount = testDoc.numPages;
                    await testDoc.destroy();
                }
                const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').slice(-100) || 'document.pdf';
                const path = `${currentUser.id}/${Date.now()}-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}-${safeName}`;
                const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: 'application/pdf', upsert: false });
                if (error) throw error;
                setProgress({ path }, { pageCount, lastPage: 1, startPage: 1 });
            } catch (error) {
                console.error('Gagal upload PDF:', error);
                libraryStatus.textContent = `Gagal mengunggah ${file.name}: ${error.message || 'periksa ukuran file dan Storage policies.'}`;
                upload.value = '';
                await renderLibrary();
                return;
            }
        }
        upload.value = '';
        await renderLibrary();
    });

    async function openBook(book) {
        try {
            if (!window.pdfjsLib) { alert('Pembaca PDF belum termuat. Periksa koneksi internet lalu muat ulang.'); return; }
            currentBook = book;
            $('readerBookTitle').textContent = book.name;
            $('readerBookMeta').textContent = `${formatSize(book.size)} · Oykawa Library Online`;
            $('pdfReaderStatus').textContent = 'Mengunduh PDF dari penyimpanan online…';
            reader.classList.add('show');
            reader.setAttribute('aria-hidden', 'false');
            document.body.classList.add('pdf-reader-open');
            viewport.innerHTML = '';
            pageElements = [];
            const { data: blob, error } = await supabase.storage.from(BUCKET).download(book.path);
            if (error) throw error;
            pdfDocument = await pdfjsLib.getDocument({ data: await blob.arrayBuffer() }).promise;
            const progress = getProgress(book);
            book.pageCount = pdfDocument.numPages;
            $('pdfPageTotal').textContent = `/ ${pdfDocument.numPages}`;
            $('pdfPageInput').max = pdfDocument.numPages;
            currentPage = Math.min(Math.max(1, progress.lastPage || 1), pdfDocument.numPages);
            zoom = 1;
            $('pdfZoomLabel').textContent = '100%';
            await renderAllPages(currentPage);
            $('pdfReaderStatus').textContent = `${pdfDocument.numPages} halaman · Halaman awal tersimpan: ${progress.startPage || 1}`;
            setProgress(book, { pageCount: pdfDocument.numPages });
        } catch (error) {
            console.error(error);
            $('pdfReaderStatus').textContent = `PDF gagal dibuka: ${error.message || 'periksa akses bucket dan Storage SELECT policy.'}`;
        }
    }

    async function renderAllPages(pageToFocus = 1) {
        if (!pdfDocument) return;
        const token = ++renderToken;
        if (pageObserver) { pageObserver.disconnect(); pageObserver = null; }
        viewport.innerHTML = '';
        pageElements = [];
        pagePositions.clear();
        const mode = $('pdfScrollMode').value;
        viewport.classList.toggle('horizontal', mode === 'horizontal');
        viewport.classList.toggle('vertical', mode === 'vertical');
        $('pdfReaderStatus').textContent = 'Menyiapkan halaman PDF…';
        pageObserver = new IntersectionObserver(async entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting || token !== renderToken) continue;
                const wrapper = entry.target;
                if (wrapper.dataset.rendered === 'true' || wrapper.dataset.rendering === 'true') continue;
                wrapper.dataset.rendering = 'true';
                const number = Number(wrapper.dataset.page);
                try {
                    const page = await pdfDocument.getPage(number);
                    const baseViewport = page.getViewport({ scale: 1 });
                    const availableWidth = Math.max(300, Math.min(viewport.clientWidth - 50, 1050));
                    const fitScale = mode === 'horizontal' ? Math.min(1.05, (window.innerHeight - 230) / baseViewport.height) : Math.min(1.35, availableWidth / baseViewport.width);
                    const scale = Math.max(0.35, fitScale * zoom);
                    const pageViewport = page.getViewport({ scale });
                    const canvas = wrapper.querySelector('canvas');
                    const context = canvas.getContext('2d', { alpha: false });
                    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
                    canvas.width = Math.floor(pageViewport.width * outputScale);
                    canvas.height = Math.floor(pageViewport.height * outputScale);
                    canvas.style.width = `${pageViewport.width}px`;
                    canvas.style.height = `${pageViewport.height}px`;
                    wrapper.style.width = `${pageViewport.width + 24}px`;
                    wrapper.style.minHeight = `${pageViewport.height + 42}px`;
                    await page.render({ canvasContext: context, viewport: pageViewport, transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null }).promise;
                    wrapper.dataset.rendered = 'true';
                } catch (error) { if (token === renderToken) console.warn(`Gagal merender halaman ${number}`, error); }
                finally { wrapper.dataset.rendering = 'false'; }
            }
        }, { root: viewport, rootMargin: '900px' });

        for (let number = 1; number <= pdfDocument.numPages; number++) {
            if (token !== renderToken) return;
            const page = await pdfDocument.getPage(number);
            const baseViewport = page.getViewport({ scale: 1 });
            const availableWidth = Math.max(300, Math.min(viewport.clientWidth - 50, 1050));
            const fitScale = mode === 'horizontal' ? Math.min(1.05, (window.innerHeight - 230) / baseViewport.height) : Math.min(1.35, availableWidth / baseViewport.width);
            const scale = Math.max(0.35, fitScale * zoom);
            const pageViewport = page.getViewport({ scale });
            const wrapper = document.createElement('section');
            wrapper.className = 'pdf-rendered-page'; wrapper.dataset.page = number;
            wrapper.style.width = `${pageViewport.width + 24}px`; wrapper.style.minHeight = `${pageViewport.height + 42}px`;
            const label = document.createElement('div'); label.className = 'pdf-page-number'; label.textContent = `Halaman ${number}`;
            const canvas = document.createElement('canvas'); canvas.style.width = `${pageViewport.width}px`; canvas.style.height = `${pageViewport.height}px`;
            wrapper.append(label, canvas); viewport.appendChild(wrapper); pageElements[number] = wrapper; pagePositions.set(number, wrapper); pageObserver.observe(wrapper);
        }
        if (token !== renderToken) return;
        $('pdfReaderStatus').textContent = `${pdfDocument.numPages} halaman · Halaman dimuat saat terlihat untuk menghemat memori.`;
        goToPage(pageToFocus, false);
    }

    function goToPage(value, save = true) {
        if (!pdfDocument) return;
        const page = Math.min(pdfDocument.numPages, Math.max(1, Number(value) || 1));
        currentPage = page; $('pdfPageInput').value = page;
        const target = pagePositions.get(page);
        if (target) {
            if ($('pdfScrollMode').value === 'horizontal') viewport.scrollTo({ left: target.offsetLeft - viewport.offsetLeft, behavior: 'smooth' });
            else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (save && currentBook) { setProgress(currentBook, { lastPage: page }); renderLibrary().catch(console.error); }
    }
    function closeReader() {
        renderToken++;
        if (pageObserver) { pageObserver.disconnect(); pageObserver = null; }
        reader.classList.remove('show'); reader.setAttribute('aria-hidden', 'true'); document.body.classList.remove('pdf-reader-open');
        if (pdfDocument) { pdfDocument.destroy().catch(() => {}); pdfDocument = null; }
        currentBook = null;
    }
    $('openLibrary').addEventListener('click', () => $('pdfLibrarySection').scrollIntoView({ behavior: 'smooth' }));
    $('closePdfReader').addEventListener('click', closeReader);
    $('closePdfReaderTop').addEventListener('click', closeReader);
    $('goPdfPage').addEventListener('click', () => goToPage($('pdfPageInput').value));
    $('pdfPageInput').addEventListener('keydown', e => { if (e.key === 'Enter') goToPage(e.target.value); });
    $('prevPdfPage').addEventListener('click', () => goToPage(currentPage - 1));
    $('nextPdfPage').addEventListener('click', () => goToPage(currentPage + 1));
    $('setStartPage').addEventListener('click', () => {
        if (!currentBook) return;
        setProgress(currentBook, { startPage: currentPage });
        $('pdfReaderStatus').textContent = `Halaman ${currentPage} ditetapkan sebagai halaman awal buku ini.`;
        renderLibrary();
    });
    $('goPdfStart').addEventListener('click', () => goToPage(getProgress(currentBook || {}).startPage || 1));
    $('pdfScrollMode').addEventListener('change', () => renderAllPages(currentPage));
    $('pdfZoomIn').addEventListener('click', () => { zoom = Math.min(2.2, zoom + 0.15); $('pdfZoomLabel').textContent = `${Math.round(zoom * 100)}%`; renderAllPages(currentPage); });
    $('pdfZoomOut').addEventListener('click', () => { zoom = Math.max(0.5, zoom - 0.15); $('pdfZoomLabel').textContent = `${Math.round(zoom * 100)}%`; renderAllPages(currentPage); });
    viewport.addEventListener('scroll', () => {
        if (!pdfDocument || !pageElements.length) return;
        let bestPage = currentPage, bestDistance = Infinity;
        pageElements.forEach((el, index) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const distance = $('pdfScrollMode').value === 'horizontal' ? Math.abs(rect.left - viewport.getBoundingClientRect().left) : Math.abs(rect.top - viewport.getBoundingClientRect().top);
            if (distance < bestDistance) { bestDistance = distance; bestPage = index; }
        });
        if (bestPage > 0 && bestPage !== currentPage) {
            currentPage = bestPage; $('pdfPageInput').value = currentPage;
            if (currentBook) setProgress(currentBook, { lastPage: currentPage });
        }
    }, { passive: true });
    document.addEventListener('keydown', e => {
        if (!reader.classList.contains('show') || ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        if (e.key === 'Escape') closeReader();
        if (e.key === 'ArrowRight' && $('pdfScrollMode').value === 'horizontal') goToPage(currentPage + 1);
        if (e.key === 'ArrowLeft' && $('pdfScrollMode').value === 'horizontal') goToPage(currentPage - 1);
    });
    window.addEventListener('resize', () => { if (reader.classList.contains('show')) renderAllPages(currentPage); });
    refreshSession();
})();
