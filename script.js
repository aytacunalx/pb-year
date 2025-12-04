// ==========================================
// 1. DATA
// ==========================================
const rawData = {
    totalKills: 12415774,
    totalDeaths: 9415774,
    totalMatches: 5417157,
    totalWins: 2054309,
    totalHeadshots: 6456202,
    assaultKills: 1231560
};

const calculateKD = (k, d) => (k / d).toFixed(1);
const calculateWinRate = (w, m) => ((w / m) * 100).toFixed(0) + '%';
const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
};

const userData = {
    username: "OPERATÖR",
    generalStats: {
        matches: formatNumber(rawData.totalMatches),
        winRate: calculateWinRate(rawData.totalWins, rawData.totalMatches),
        kd: calculateKD(rawData.totalKills, rawData.totalDeaths),
        totalKillsOriginal: rawData.totalKills
    },
    headshotStats: {
        count: formatNumber(rawData.totalHeadshots),
        rate: ((rawData.totalHeadshots / rawData.totalKills) * 100).toFixed(1) + '%'
    },
    topWeapon: {
        name: "T77",
        kills: formatNumber(rawData.assaultKills),
        img: "https://pb.tamgame.com/upload/image/weaponInfo/20250417/161806714.png" 
    },
    topMap: {
        name: "KÜTÜPHANE",
        matches: "87K+",
        winRate: "93.376"
    },
    duo: {
        name: "511.697 Saat",
        synergy: "ÖLÜM MAÇI"
    }
};

// ==========================================
// 2. LOGIN & INIT
// ==========================================
function submitLogin() {
    const input = document.getElementById('nicknameInput');
    const name = input.value.trim().toUpperCase();
    
    if(name === "") {
        input.style.borderBottomColor = "red";
        input.placeholder = "İSİM GİRİNİZ!";
        return;
    }

    userData.username = name;
    
    // UI Güncelle
    document.getElementById('intro-username-display').innerText = userData.username;
    document.getElementById('share-username-display').innerText = userData.username;

    // Login ekranını kapat
    document.getElementById('login-overlay').classList.add('hidden');

    // Müzik Başlat
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().then(() => {
        bgMusic.volume = 0.4;
        document.getElementById('soundText').innerText = "SES AÇIK";
        document.querySelectorAll('.equalizer .bar').forEach(b => b.style.animationPlayState = 'running');
    }).catch(e => console.log("Otomatik müzik engellendi:", e));

    // Animasyonları başlat
    initPageAnimations();
}

// Enter tuşu desteği
document.getElementById('nicknameInput').addEventListener("keypress", function(event) {
    if (event.key === "Enter") submitLogin();
});

// ==========================================
// 3. DOM GENERATION
// ==========================================
const container = document.getElementById('dynamic-slides');

const slidesHTML = `
    <section class="slide" id="slide-1">
        <div class="bento-container">
            <div class="bento-box box-large" style="background: linear-gradient(to bottom right, rgba(204,255,0,0.1), rgba(20,20,25,0.5));" data-tilt>
                <div class="deco-crosshair-advanced"><div class="dca-ring"></div><div class="dca-inner"></div></div>
                <span class="label accent-text"><i class="ri-trophy-line"></i> GENEL PERFORMANS</span>
                <h2 class="big-stat giant-stat-num accent-text scramble-target" data-value="${formatNumber(rawData.totalKills)}" style="margin-top:auto;">0</h2>
                 <span class="label" style="margin-top:-10px;">TOPLAM ONAYLI LEŞ</span>
            </div>
            <div class="bento-box" data-tilt>
                <div class="deco-radar"></div>
                <span class="label">OYNANAN MAÇ</span>
                <h2 class="big-stat">${userData.generalStats.matches}</h2>
            </div>
            <div class="bento-box" data-tilt>
                <div class="deco-pulse-graph"></div>
                <span class="label">K/D ORANI</span>
                <h2 class="big-stat purple-text">${userData.generalStats.kd}</h2>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-mot-1">
        <div style="text-align:center;">
            <div class="year-badge" style="background:transparent; border: 1px solid white; color:white; transform:none;">ADRENALİN HİÇ DÜŞMEDİ</div>
            <h1 class="giant-text" style="font-size: 9vw; margin-top:20px;">SAHANIN<br><span class="purple-text" style="text-shadow: 0 0 40px rgba(112,0,255,0.4);">HAKİMİYDİN</span></h1>
            <p style="font-family:var(--font-head); letter-spacing: 5px; margin-top: 30px; opacity:0.8;">RAKİPLERİNİN KORKULU RÜYASI.</p>
        </div>
    </section>

    <section class="slide" id="slide-2">
        <div class="bento-container" style="display:block; text-align:center;">
             <span class="label cyan-text" style="font-size:1.2rem; letter-spacing:4px;">UZMANLIK ALANI</span>
            <h1 class="giant-text" style="font-size: 10vw; color:var(--accent-cyan); text-shadow: 0 0 30px rgba(0,240,255,0.3);">KAFA<br>AVCISI</h1>
            <div class="bento-container" style="height: 30vh; margin-top:40px;">
                 <div class="bento-box" data-tilt style="border-color:var(--accent-cyan);">
                    <div class="deco-crosshair" style="border-color:var(--accent-cyan); opacity:0.5;"></div>
                    <span class="label">HS SAYISI</span>
                    <h2 class="big-stat cyan-text">${userData.headshotStats.count}</h2>
                </div>
                <div class="bento-box" data-tilt style="background:var(--accent-cyan); color:black;">
                    <span class="label" style="color:rgba(0,0,0,0.6)">İSABET ORANI</span>
                    <h2 class="big-stat" style="color:black;">${userData.headshotStats.rate}</h2>
                </div>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-mot-2">
         <div style="text-align:center;">
            <h1 class="giant-text" style="font-size: 8vw;">HEDEFİ ASLA<br><span class="cyan-text">ŞAŞIRMADIN</span></h1>
            <div class="deco-pulse-graph" style="width: 50%; left:25%; position:relative; margin-top:20px;"></div>
        </div>
    </section>

    <section class="slide" id="slide-3">
        <div class="bento-container" style="display:block; text-align:center;">
            <span class="label">FAVORİ SİLAH</span>
            <h1 class="giant-text" style="font-size: 8vw;">${userData.topWeapon.name}</h1>
            <div class="bento-box box-wide" style="height: 350px; margin-top:20px; border:none; background: transparent;" data-tilt>
                <div class="weapon-blueprint-container">
                    <img src="${userData.topWeapon.img}" class="weapon-blueprint-img" alt="Weapon Blueprint">
                    <div class="blueprint-overlay"></div>
                    <div class="deco-scan" style="background: linear-gradient(to bottom, transparent, var(--accent-volt), transparent); opacity:0.3;"></div>
                </div>
                <div style="position:absolute; bottom:30px; left:30px; text-align:left; z-index:2;">
                    <div class="big-stat accent-text" style="text-shadow: 0 0 10px black;">${userData.topWeapon.kills}</div>
                    <span class="label" style="text-shadow: 0 0 5px black;">BU SİLAHLA ALINAN LEŞ</span>
                </div>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-pbic-1">
        <div class="bento-container" style="display:block; text-align:center;">
            <div class="year-badge" style="background:#e10600; color:white; transform:none; box-shadow: 5px 5px 0 white;">GLOBAL SAHNE</div>
            <h1 class="giant-text" style="font-size: 8vw; margin-top:20px;">DÜNYA<br><span style="color:#e10600; text-shadow: 0 0 50px rgba(225,6,0,0.6);">İSTANBUL'DA</span></h1>
            
            <div class="bento-box box-wide" style="height: 300px; margin-top:20px; background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('https://scontent-sof1-2.xx.fbcdn.net/v/t39.30808-6/487310342_1077892251043185_7415930684124418905_n.jpg?_nc_cat=103&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=f727a1&_nc_ohc=z6bpWg_rA_oQ7kNvwG-WCnH&_nc_oc=Admz9pXJ2HEfms6AAWebPqZWDDrWm8JumGd1aJamR1_cq27EqDsjqfJLALuqzgypb68&_nc_zt=23&_nc_ht=scontent-sof1-2.xx&_nc_gid=t4wzpMk388n-AIY-RdnHpg&oh=00_AfkHVDsAVKXOuS3ZR8j_Q542HVYs4SmK_XbTSAEL2aYpgA&oe=6937CF30') center/cover;" data-tilt>
                <div style="position:relative; z-index:2; margin-top:auto;">
                    <h2 class="big-stat" style="font-size:4rem; color:white;">PBIC 2025</h2>
                    <span class="label" style="color:#e10600; font-weight:900; letter-spacing:3px;">EV SAHİBİ TÜRKİYE</span>
                </div>
                <div class="deco-scan" style="background: linear-gradient(to bottom, transparent, #e10600, transparent); opacity:0.2;"></div>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-pbic-2">
        <div class="bento-container">
             <div class="bento-box box-large" style="background: linear-gradient(to top, black, transparent), url('https://scontent-sof1-1.xx.fbcdn.net/v/t39.30808-6/487374391_1077888447710232_6915515017505365523_n.jpg?_nc_cat=100&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=f727a1&_nc_ohc=21mf56G0jFEQ7kNvwFfKMKg&_nc_oc=AdmGLPR0yOCvMnkrIpTbouDnKGbUyn-mlpp_Pwp4NTEwaIDtRPSBqeJTEAzq_5DRdEE&_nc_zt=23&_nc_ht=scontent-sof1-1.xx&_nc_gid=9Oe-UmqtOHT-EwQDX7oCPg&oh=00_AfkOVmt_6SvHZe2ijeoW_2XfffAeMIASIql12H_BfaS6tg&oe=6937C8FA') center/cover;" data-tilt>
                <div style="z-index:2; margin-top:auto;">
                    <h2 class="big-stat" style="font-size:3rem;">TARİH<br><span style="color:#e10600;">YAZILDI</span></h2>
                    <p style="font-family:var(--font-head); letter-spacing:2px; margin-top:10px; opacity:0.8;">BU HEYECANA TANIKLIK ETTİK.</p>
                </div>
            </div>
            
            <div class="bento-box" style="background: #e10600; color:white;" data-tilt>
                 <span class="label" style="color:rgba(255,255,255,0.8)">ATMOSFER</span>
                 <h2 class="big-stat" style="font-size:2.5rem;">EFSANEYDİ</h2>
            </div>
            
            <div class="bento-box" style="background: url('https://scontent-sof1-1.xx.fbcdn.net/v/t39.30808-6/487495912_1077893251043085_8337364965410709938_n.jpg?_nc_cat=108&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=f727a1&_nc_ohc=y3ar7P66rvUQ7kNvwF_pzPc&_nc_oc=AdkE4E-TbPS4-S88f7Gw3xEHnLk_8NVmTymx0WWQaHMAIpu56Udj6fDRIwmy__MtvH0&_nc_zt=23&_nc_ht=scontent-sof1-1.xx&_nc_gid=vk0aMOzTfbl4olUuqw3iJA&oh=00_Afk5hop1Qq7sr3StiuxAZciAzOOVsEDBKhSOgORpjgUaRg&oe=6937E145') center/cover;" data-tilt>
                 <div class="deco-pulse-graph"></div>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-mot-3">
         <div style="text-align:center;">
             <div class="year-badge" style="background:white; color:black; transform:none;">BİRLİKTE GÜÇLÜYÜZ</div>
            <h1 class="giant-text" style="font-size: 7vw; margin-top:30px;">SENİNLE<br><span class="accent-text" style="text-shadow: 0 0 50px rgba(204,255,0,0.5);">ÇOK İYİYDİK</span></h1>
            <p style="font-size: 1.2rem; margin-top: 20px; opacity:0.7;">BU SADECE BİR OYUN DEĞİL, BİR TUTKU.</p>
        </div>
    </section>

    <section class="slide" id="slide-4">
        <div class="bento-container">
             <div class="bento-box box-large" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('https://cdn2.pointblank.id/Web/upload/image/mapInfo/20240208/114034842636.jpg') center/cover;" data-tilt>
                <div style="z-index:2; margin-top:auto;">
                    <span class="label accent-text">EV SAHİBİ</span>
                    <h2 class="big-stat" style="font-size:3.5rem;">${userData.topMap.name}</h2>
                    <div class="big-stat accent-text" style="font-size:2rem;">${userData.topMap.winRate} Saat Oynandı</div>
                </div>
            </div>
            <div class="bento-box" data-tilt>
                 <span class="label purple-text">TÜM HARİTALARDA OYNAMA SÜRESİ</span>
                 <h2 class="big-stat" style="font-size:2rem;">${userData.duo.name}</h2>
            </div>
             <div class="bento-box" data-tilt style="background:var(--accent-purple);">
                 <span class="label" style="color:rgba(255,255,255,0.7)">EN ÇOK OYNANAN MOD</span>
                 <h2 class="big-stat">${userData.duo.synergy}</h2>
            </div>
        </div>
    </section>


    <section class="slide" id="slide-extra-1">
        <div class="bento-container">
            <div class="bento-box box-wide" style="background: linear-gradient(to right, rgba(204,0,0,0.2), rgba(0,0,0,0.6));" data-tilt>
                <div class="deco-scan"></div>
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                    <div>
                        <span class="label" style="color:#ff3333; font-size:1.2rem;">SAVAŞ MAKİNESİ</span>
                        <h2 class="big-stat" style="font-size:4rem; margin-top:10px;">SERİ KATİL</h2>
                    </div>
                    <div style="text-align:right;">
                        <h2 class="big-stat" style="color:#ff3333;">125K+</h2>
                        <span class="label">DOUBLE KILL</span>
                    </div>
                </div>
            </div>

            <div class="bento-box" data-tilt>
                <span class="label">BOMBACI</span>
                <h2 class="big-stat">783K+</h2>
                <span class="label" style="margin-top:5px; font-size:0.7rem; opacity:0.6;">EL BOMBASI İLE KILL</span>
            </div>

            <div class="bento-box" style="background: #ff3333; color:white;" data-tilt>
                <span class="label" style="color:rgba(255,255,255,0.8);">CHAIN KILLER</span>
                <h2 class="big-stat">EFSANE</h2>
                <i class="ri-fire-fill" style="position:absolute; right:20px; bottom:20px; font-size:3rem; opacity:0.3;"></i>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-coupon">
        <div class="bento-container" style="display:flex; justify-content:center; align-items:center; flex-direction:column; text-align:center;">
            
            <h1 class="giant-text" style="font-size: 6vw; margin-bottom: 40px;">TEŞEKKÜRLER<br><span class="accent-text">SAVAŞÇI</span></h1>
            
            <div class="bento-box box-wide" style="width:100%; max-width:600px; height:auto; border: 2px dashed var(--accent-volt); background: rgba(204,255,0,0.05);" data-tilt>
                <div class="deco-crosshair" style="opacity:0.2;"></div>
                <span class="label accent-text" style="letter-spacing:5px;">2025 ÖZEL HEDİYE KODU</span>
                
                <h2 class="big-stat" style="font-size: 3.5rem; margin: 20px 0; font-family:'Courier New', monospace; letter-spacing:-2px; background:black; padding:10px 20px; border-radius:10px;">
                    PB-2025-GIFT
                </h2>
                
                <p style="font-family:var(--font-head); font-size:1rem; opacity:0.7;">BU KODU KUPON SAYFASINDA KULLANABİLİRSİN.</p>
                <div class="year-badge" onclick="copyCoupon(this)" style="margin-top:20px; transform:none; cursor:pointer;">KODU KOPYALA</div>
            </div>
        </div>
    </section>

    <section class="slide" id="slide-5">
        <div style="text-align:center; position:relative; z-index:10;">
            <div class="year-badge" style="transform:none; margin-bottom:20px; background:white;">SONUÇ RAPORU</div>
            <h1 class="giant-text" style="font-size: 11vw; line-height:0.9;">MUTLAK<br><span class="accent-text">HAKİMİYET</span></h1>
            <p style="margin-top:30px; font-family:var(--font-head); letter-spacing:3px; font-size:1.2rem;">2026 SENİ BEKLİYOR.</p>
            <button class="share-btn tilt-effect" onclick="generateShareCard()" style="margin: 50px auto; transform:scale(1.2);">
                <i class="ri-instagram-line"></i><span>HİKAYENİ İNDİR</span>
            </button>
            <p style="margin-top:20px; opacity:0.5; font-size:0.8rem; cursor:pointer;" onclick="location.reload()">TEKRAR İZLE</p>
        </div>
    </section>
`;

container.innerHTML = slidesHTML;

// ==========================================
// 4. NAVIGATION & ANIMATIONS
// ==========================================
let currentSlide = 0;
const totalSlides = 13;
const slides = document.querySelectorAll('.slide');
const progressLine = document.getElementById('progressLine');
const currentStepEl = document.querySelector('.current-step');
const bgMusic = document.getElementById('bgMusic');
const introText = document.querySelector('#slide-0 .giant-text');

let autoPlayInterval;
const AUTO_PLAY_DURATION = 10000;

function startAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            nextSlide(true);
        } else {
            clearInterval(autoPlayInterval);
        }
    }, AUTO_PLAY_DURATION);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

function updateUI() {
    const percent = ((currentSlide + 1) / totalSlides) * 100;
    progressLine.style.width = percent + '%';
    currentStepEl.innerText = `0${currentSlide + 1}`;
    
    document.getElementById('prevBtn').classList.toggle('disabled', currentSlide === 0);
    document.getElementById('nextBtn').classList.toggle('disabled', currentSlide === totalSlides - 1);
}

function animateSlide(fromIndex, toIndex) {
    const fromSlide = slides[fromIndex];
    const toSlide = slides[toIndex];

    if (fromIndex === 0) introText.classList.remove('animate-intro');
    
    const tl = gsap.timeline({
        onComplete: () => {
            fromSlide.classList.remove('active');
            toSlide.classList.add('active');
            
            if (toIndex === 0) {
                void introText.offsetWidth; 
                introText.classList.add('animate-intro');
            }

            const scrambleEls = toSlide.querySelectorAll('.scramble-target');
            scrambleEls.forEach(el => animateScramble(el));
            
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 10, speed: 400, glare: true, "max-glare": 0.2
            });
        }
    });

    tl.to(fromSlide.children, { opacity: 0, y: -50, duration: 0.4, stagger: 0.05 });
    
    const nextTl = gsap.timeline({ delay: 0.4 });
    nextTl.fromTo(toSlide, { opacity: 0 }, { opacity: 1, duration: 0.1 })
          .fromTo(toSlide.querySelectorAll('.bento-box, .giant-text, .share-btn, .year-badge, .start-trigger, p'), 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
        );
}

window.nextSlide = function(isAuto = false) {
    if(!isAuto) resetAutoPlay();
    if(currentSlide < totalSlides - 1) {
        animateSlide(currentSlide, currentSlide + 1);
        currentSlide++;
        updateUI();
    }
}

window.prevSlide = function() {
    resetAutoPlay();
    if(currentSlide > 0) {
        animateSlide(currentSlide, currentSlide - 1);
        currentSlide--;
        updateUI();
    }
}

function animateScramble(element) {
    const finalValue = element.getAttribute('data-value');
    if (!finalValue) return;
    const chars = "0123456789";
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = finalValue.split("").map((letter, index) => {
            if(index < iterations) return finalValue[index];
            return chars[Math.floor(Math.random() * 10)];
        }).join("");
        if(iterations >= finalValue.length) clearInterval(interval);
        iterations += 1/2;
    }, 50);
}

// Share
// ==========================================
// GÜÇLENDİRİLMİŞ SHARE CARD GENERATOR
// ==========================================
// ==========================================
// SHARE CARD GENERATOR (SİYAH EKRAN FİX)
// ==========================================
window.generateShareCard = function() {
    const originalCard = document.getElementById('share-card');
    
    // 1. Verileri Doldur
    document.getElementById('share-kills').innerText = formatNumber(rawData.totalKills);
    document.getElementById('share-hs').innerText = userData.headshotStats.rate;
    document.getElementById('share-match').innerText = formatNumber(rawData.totalMatches);
    document.getElementById('share-win').innerText = formatNumber(rawData.totalWins);
    document.getElementById('share-weapon').innerText = userData.topWeapon.name;
    document.getElementById('share-username-display').innerText = userData.username;

    // 2. Buton Loading Animasyonu
    const btn = document.querySelector('.share-btn');
    const oldText = btn.innerHTML;
    btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> OLUŞTURULUYOR...`;
    btn.style.pointerEvents = "none";

    // 3. HAYALET KOPYA TEKNİĞİ
    // Orijinal kartı klonluyoruz
    const clonedCard = originalCard.cloneNode(true);
    
    // Klonun stilini ayarlıyoruz: Ekranın dışında ama EN ÖNDE olacak
    clonedCard.style.position = "fixed";
    clonedCard.style.left = "-10000px"; // Kullanıcı görmesin
    clonedCard.style.top = "0";
    clonedCard.style.zIndex = "99999"; // Her şeyin önünde olsun (Siyah ekranı çözen satır)
    clonedCard.style.display = "flex"; // Gizli kalmasın
    
    // Klonu sayfaya ekle
    document.body.appendChild(clonedCard);

    // 4. Fotoğrafı Çek
    html2canvas(clonedCard, {
        scale: 1, // 1080p kalitesi
        backgroundColor: "#050505", // Arka plan rengini garantiye al
        useCORS: true, // Resimler için izin
        allowTaint: true,
        scrollY: 0, 
        scrollX: 0
    }).then(canvas => {
        // İndir
        const link = document.createElement('a');
        link.download = `PB_2025_Efsane_${userData.username}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Temizlik: Klonu sil ve butonu düzelt
        document.body.removeChild(clonedCard);
        btn.innerHTML = oldText;
        btn.style.pointerEvents = "auto";
    }).catch(err => {
        console.error("Hata:", err);
        alert("Görsel oluşturulamadı. Karakter resmi yüklenemiyor olabilir.");
        
        // Hata durumunda da temizlik yap
        if(document.body.contains(clonedCard)) document.body.removeChild(clonedCard);
        btn.innerHTML = "HATA!";
        setTimeout(() => {
            btn.innerHTML = oldText;
            btn.style.pointerEvents = "auto";
        }, 2000);
    });
}

// Audio
window.toggleAudio = function() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => { 
            bgMusic.volume = 0.4; document.getElementById('soundText').innerText = "SES AÇIK";
            document.querySelectorAll('.equalizer .bar').forEach(b => b.style.animationPlayState = 'running');
        });
    } else {
        bgMusic.pause(); document.getElementById('soundText').innerText = "SES KAPALI";
        document.querySelectorAll('.equalizer .bar').forEach(b => b.style.animationPlayState = 'paused');
    }
}

// Init Animations
function initPageAnimations() {
    const introText = document.querySelector('#slide-0 .giant-text');
    if(introText) introText.classList.add('animate-intro');

    gsap.to('.year-badge, .start-trigger', {
        opacity: 1, duration: 1, delay: 0.8, stagger: 0.3, ease: "power2.out"
    });

    startAutoPlay(); 
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 10, speed: 400, glare: true, "max-glare": 0.2
    });
}

// ==========================================
// KUPON KOPYALAMA FONKSİYONU
// ==========================================
function copyCoupon(element) {
    const code = "PB-2025-GIFT"; // Kopyalanacak kod
    
    // Panoya kopyala
    navigator.clipboard.writeText(code).then(() => {
        // Görsel Geri Bildirim (Feedback)
        const originalText = element.innerText;
        const originalBg = element.style.background;
        const originalColor = element.style.color;

        // Butonu "Başarılı" moduna al
        element.innerText = "KOPYALANDI! ✅";
        element.style.background = "#ccff00"; // Neon Yeşil
        element.style.color = "black";
        element.style.borderColor = "#ccff00";

        // 2 saniye sonra eski haline döndür
        setTimeout(() => {
            element.innerText = originalText;
            element.style.background = originalBg;
            element.style.color = originalColor;
            element.style.borderColor = "white";
        }, 2000);

    }).catch(err => {
        console.error('Kopyalama hatası:', err);
        element.innerText = "HATA OLUŞTU!";
    });
}