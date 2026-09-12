const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const SITE = "https://www.kuaformustafasimsek.com.tr";
const PHONE = "0538 830 36 83";
const TEL = "+905388303683";
const MAIL = "kuaformustafasimsek@gmail.com";
const WA = "https://wa.me/905388303683";
const IG = "https://www.instagram.com/kuaformustafasimsek/";
const IG_HANDLE = "kuaformustafasimsek";
const YT = "https://www.youtube.com/@kuaformustafasimsek-cankay3229";
const LAT = "39.892394838628825";
const LNG = "32.8010825293024";
const MAPS = `https://www.google.com/maps?q=${LAT},${LNG}`;
const DIR = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
const MAP_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;
const ADDRESS =
  "Kuaför Mustafa Şimşek, İşçi Blokları, 1522.Cd. No:8, 06530 Çankaya/Ankara";
const SLOGAN = "Tarzınızı Yansıtan Dokunuşlar.";

const nav = [
  ["/ana-sayfa/", "Ana Sayfa"],
  ["/sac-kesimi/", "Saç Kesimi"],
  ["/sac-modelleri/", "Saç Modelleri"],
  ["/sac-bakim/", "Saç Bakım"],
  ["/ankara-brezilya-fonu/", "Brezilya Fönü"],
  ["/ankara-keratin-bakim/", "Keratin"],
  ["/transparan-sac-boyasi/", "Transparan Boya"],
  ["/iletisim/", "İletişim"]
];

const videos = {
  keratin: {
    id: "i_kXkwHMr-Y",
    title: "Keratin bakım ve Brezilya fönü — Kuaför Mustafa Şimşek"
  },
  brezilya: {
    id: "srK2rrJQuxU",
    title: "Brezilya fönü — Ankara bayan kuaförü Mustafa Şimşek"
  },
  boyaSonra: {
    id: "9j2OR_0lHOQ",
    title: "Transparan saç boyası — sonrası"
  },
  boyaOnce: {
    id: "zs7HzbLr2l0",
    title: "Transparan saç boyası — öncesi"
  },
  kesimNasil: {
    id: "iTtXt4BuyPk",
    title: "Bayan saç kesimi nasıl yapılır?"
  },
  salon: {
    id: "1b3R0nf56dg",
    title: "Ankara Çankaya bayan kuaförü Mustafa Şimşek"
  },
  enIyi: {
    id: "dLS2uH2dpWc",
    title: "Ankara’da Kuaför Mustafa Şimşek"
  },
  kesimGoster: {
    id: "iuODBsSp6fM",
    title: "Çankaya’da saç kesimini gösteriyor"
  }
};

function ic(name) {
  return `<img class="icon" src="/assets/icons/${name}.svg" alt="" width="22" height="22">`;
}

function icLg(name) {
  return `<img class="icon icon-lg card-icon" src="/assets/icons/${name}.svg" alt="" width="32" height="32">`;
}

function media(file, alt, size) {
  const cls = size ? ` media-${size}` : "";
  return `<div class="media${cls}"><img src="/assets/img/${file}" alt="${alt}" onerror="this.remove()" onload="this.nextElementSibling && this.nextElementSibling.remove()"><span>${file}</span></div>`;
}

function pageHero({ kicker, title, lede, file, extra = "", buttons = "" }) {
  return `<section class="page-hero">
  <img class="page-hero-photo" src="/assets/img/${file}" alt="" onerror="this.remove()">
  <div class="page-hero-shade" aria-hidden="true"></div>
  <div class="wrap page-hero-copy">
    <p class="kicker">${kicker}</p>
    <h1>${title}</h1>
    <p class="lede">${lede}</p>
    ${extra}
    <div class="btn-row">${buttons}</div>
  </div>
</section>`;
}

function socialRow() {
  return `<div class="social-row" aria-label="Sosyal ve iletişim">
    <a href="${WA}" aria-label="WhatsApp">${ic("icon-whatsapp")}</a>
    <a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${ic("icon-instagram")}</a>
    <a href="${YT}" target="_blank" rel="noopener" aria-label="YouTube">${ic("icon-youtube")}</a>
    <a href="tel:${TEL}" aria-label="Telefon">${ic("icon-phone")}</a>
    <a href="mailto:${MAIL}" aria-label="E-posta">${ic("icon-mail")}</a>
    <a href="${DIR}" aria-label="Konum">${ic("icon-location")}</a>
  </div>`;
}

function faqItems(items) {
  return `<div class="faq">${items
    .map(
      ([q, a]) => `<details>
    <summary>${q}</summary>
    <p>${a}</p>
  </details>`
    )
    .join("\n")}</div>`;
}

function faqBlock({ kicker = "Sık sorulanlar", heading, intro, items }) {
  return `<section class="faq-section">
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">${kicker}</p>
      <h2>${heading}</h2>
      <p>${intro}</p>
    </div>
    ${faqItems(items)}
  </div>
</section>`;
}

function videoEmbed(v) {
  return `<article class="video-card">
    <div class="video-frame">
      <iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="${v.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <p>${v.title}</p>
  </article>`;
}

function videoSection(heading, lede, list) {
  return `<section class="video-section">
  <div class="wrap">
    <div class="section-head">
      <p class="kicker icon-row">${ic("icon-youtube")} YouTube</p>
      <h2>${heading}</h2>
      <p>${lede}</p>
    </div>
    <div class="video-grid">${list.map(videoEmbed).join("\n")}</div>
    <div class="btn-row" style="margin-top:20px">
      <a class="btn btn-ghost" href="${YT}" target="_blank" rel="noopener">${ic("icon-youtube")} Kanalı aç</a>
    </div>
  </div>
</section>`;
}

const hoursHtml = `
<div class="hours">
  <div><span>Pazartesi</span><span>07:30–19:00</span></div>
  <div><span>Salı</span><span>07:30–19:00</span></div>
  <div><span>Çarşamba</span><span>07:30–19:00</span></div>
  <div><span>Perşembe</span><span>07:30–19:00</span></div>
  <div><span>Cuma</span><span>07:30–19:00</span></div>
  <div><span>Cumartesi</span><span>08:00–19:00</span></div>
  <div><span>Pazar</span><span>09:30–19:00</span></div>
</div>
`;

const faqs = {
  home: [
    [
      "Kuaför Mustafa Şimşek nerede?",
      "Çankaya İşçi Blokları’ndayız: 1522. Cadde No:8, 06530. Çukurambar, Yüzüncü Yıl ve Balgat’tan gelenler bizi “en yakın salon” diye anlatıyor. Kapıyı bulmak için haritayı açmanız yeterli."
    ],
    [
      "Randevu almadan gelebilir miyim?",
      "Gelmeden yazın veya arayın. Kesim, boya, keratin ve Brezilya fönü süre ister; koltuğu sizin için ayıralım. Telefonda “internetten görüp aradım” demeniz yeter."
    ],
    [
      "2026’da saç kesimi ne kadar?",
      "Rakam saçınızın boyuna, yoğunluğuna ve istediğiniz işleme göre değişir. Sitede eski fiyat tutmayız. Arayın, aynı gün net konuşuruz."
    ],
    [
      "Kişiye özel saç kesimi nedir?",
      "Katalogdan model kopyalamayız. Kafa formu, tel kalınlığı, gününüz ve giyiminize bakarak keseriz. 2025’te bizi önerenler 2026’da da aynı koltuğa bu yüzden oturuyor."
    ],
    [
      "Brezilya fönü nedir, ne kadar kalır?",
      "Kabaran, elektriklenen saça uzun süreli pürüzsüzlük ve parlaklık verir. Kalıcılık saç tipine, yıkama sıklığına ve ev bakımına bağlıdır; koltukta saçınıza göre konuşuruz."
    ],
    [
      "Keratin bakım, Brezilya fönünden nasıl farklı?",
      "Keratin yıpranmış, mat ve kırılgan saça protein iade eder. Brezilya fönü daha çok düzlük ve elektriklenme kontrolü ister. Hangisinin size uyduğu, saçı görünce belli olur."
    ],
    [
      "Transparan saç boyası dip boyasından nasıl ayrılır?",
      "Beyaz kapatmada daha yumuşak bir yoldur. Saçı boğmaz, aktığında sert dip çizgisi bırakmaz, ışıltı katar. Kendi doğal rengine rastgele sürülmez; önce tonunuza bakarız."
    ],
    [
      "Ombre, sombre, röfle ve balyaj yapıyor musunuz?",
      "Evet. Dip boya, komple boya, organik boya, ombre, sombre, röfle, balyaj ve transparan boya Çankaya salonumuzda. Renk randevusuna fotoğraf da gönderebilirsiniz."
    ],
    [
      "Fön, maşa, örgü ve okyanus dalgası var mı?",
      "Var. Günlük fön, kırık fön, maşa, örgü ve okyanus dalgası menümüzde. Özel gün öncesi süre ayırmak için randevu alın."
    ],
    [
      "Gelin saçı ve özel gün çalışması yapıyor musunuz?",
      "Kına, sünnet, isteme, nişan, düğün ve gelin saçı çalışıyoruz. Prova öneririz; 2026 düğün takvimi dolmadan yazın."
    ],
    [
      "Türban ve tesettür hizmetiniz var mı?",
      "Evet. Konusunda uzman bayan kuaför arkadaşımız türban ve tesettür saç düzenlemesinde yardımcı olur. Tesettür için ayrı bölümümüz vardır."
    ],
    [
      "Makyaj, manikür, pedikür ve ağda var mı?",
      "Kaş, dudaküstü, ağda, manikür, pedikür, günlük ve özel makyaj hizmeti veriyoruz. Kesim veya boya randevusuna ekletmek için belirtin."
    ],
    [
      "Hijyen kurallarınız nelerdir?",
      "Kişiye özel tek kullanımlık ürünlerle çalışıyoruz. 2025’te de 2026’da da aynı kural: salona girdiğiniz anda hijyen pazarlık konusu değil."
    ],
    [
      "Çalışma saatleriniz nedir?",
      "Pazartesi–Cuma 07:30–19:00, Cumartesi 08:00–19:00, Pazar 09:30–19:00."
    ],
    [
      "Çalışmalarınızı nereden izleyebilirim?",
      "Instagram’da @kuaformustafasimsek, YouTube’da @kuaformustafasimsek-cankay3229. Kesim, Brezilya fönü ve transparan boya videolarını kanalda izleyebilirsiniz."
    ]
  ],
  kesim: [
    [
      "Kişiye özel saç kesimi nedir?",
      "Yüzünüze, kafa formunuza ve gününüze uyan kesimdir. Trend fotoğrafı getirin, birlikte süzelim; sizi yormayan hali koltukta çıkar."
    ],
    [
      "Fotoğraftaki modeli birebir keser misiniz?",
      "Bakarız, konuşuruz. Aynı saç, aynı kafa, aynı hayat olmayınca birebir kopya yaramaz. Tarzınızı yansıtan dokunuş o fotoğrafın size uyan halidir."
    ],
    [
      "Saç kesimi ne kadar sürer?",
      "Yıkama, kesim ve fönle çoğu randevu bir saati geçer. Uzun saç veya model değişiminde süre uzar; randevuyu ona göre ayırırız."
    ],
    [
      "2026 saç kesimi fiyatı nedir?",
      "Boy, yoğunluk ve istediğiniz modele göre değişir. Çankaya İşçi Blokları’nda kaliteden ödün vermeden net fiyatı telefon veya WhatsApp’tan alırsınız."
    ],
    [
      "Çukurambar’dan kesime nasıl gelirim?",
      "İşçi Blokları 1522. Cadde No:8’deyiz. Çukurambar, Yüzüncü Yıl ve Balgat’a yakınız; yol tarifi için haritayı kullanın."
    ],
    [
      "Tesettürde kesim oluyor mu?",
      "Oluyor. Tesettür için ayrı bölümümüz var; türban düzenlemesi de yapılır. Rahatınız için randevuda belirtin."
    ],
    [
      "Kesimi YouTube’da izleyebilir miyim?",
      "Evet. Kanalımızda saç kesiminin nasıl yapıldığını ve Çankaya salonundaki çalışmaları gösteriyoruz."
    ]
  ],
  modeller: [
    [
      "2026’da hangi saç modelleri duruyor?",
      "Trend her yıl değişir; yüzünüz değişmez. 2026 modelini saçınıza, işinize ve bakım sürenize göre eleyerek öneririz."
    ],
    [
      "Kararsızsam ne yapmalıyım?",
      "Doğru yerdesiniz. Birkaç fotoğraf gönderin veya koltukta gösterin. Birlikte eleyelim; koltuktan “keşke” ile kalkmayın."
    ],
    [
      "Gelin saçı ve nişan modeli çalışıyor musunuz?",
      "Kına, sünnet, isteme, nişan, düğün ve gelin saçı çalışıyoruz. Prova randevusu öneririz."
    ],
    [
      "Günlük fön ve maşa var mı?",
      "Günlük fön, kırık fön, maşa, örgü ve okyanus dalgası menümüzde. Özel gün öncesi süre ayırın."
    ],
    [
      "Galerideki fotoğraflar sizin çalışmalarınız mı?",
      "Salon galerisi ve Instagram’daki kareler bizim işimiz. YouTube’daki kesim ve boya videoları da aynı koltuktan."
    ],
    [
      "Model seçmek için randevu şart mı?",
      "Şart. Konuşmadan, saçı görmeden model kilitlemeyiz. Formu doldurun veya arayın."
    ]
  ],
  bakim: [
    [
      "Saç bakımı olarak neler yapıyorsunuz?",
      "Ankara keratin bakım ve Brezilya fönü ile yıpranmış, kabaran, elektriklenen saçı toparlıyoruz. Hangisi size uyar, saçı görünce konuşuruz."
    ],
    [
      "Keratin bakım mı, Brezilya fönü mü?",
      "Mat, kırılgan, protein isteyen saça keratin. Kabarma ve elektriklenme ön plandaysa Brezilya fönü. İkisini de Çankaya’da uyguluyoruz."
    ],
    [
      "Bakım ne sıklıkla yapılır?",
      "Saç tipine ve ev bakımına göre değişir. Çoğu misafir birkaç ayda bir gelir; sizin takviminizi koltukta çıkarırız."
    ],
    [
      "2026 bakım fiyatı nedir?",
      "Saç boyu ve duruma göre çıkar. İşçi Blokları’nda uygun fiyat–kalite dengesini koruyoruz; güncel rakam için arayın."
    ],
    [
      "Boya sonrası bakım olur mu?",
      "Olur. Boya, ısı ve şehir havası telleri yorar. Keratin veya Brezilya fönünü boya randevusuna bağlayabiliriz."
    ],
    [
      "Bakım videolarını izleyebilir miyim?",
      "YouTube kanalımızda keratin ve Brezilya fönü kareleri var. Gelmeden önce izleyin, koltukta daha net konuşuruz."
    ]
  ],
  brezilya: [
    [
      "Brezilya fönü nedir?",
      "Kabaran, elektriklenen saça uzun süreli pürüzsüzlük ve parlaklık veren işlemdir. Abartı değil, idare edilebilir düzlük hedefleriz."
    ],
    [
      "Ankara Brezilya fönü 2026’da ne kadar?",
      "Fiyat saç boyu ve yoğunluğuna göre çıkar. Çankaya 100. Yıl İşçi Blokları’nda kaliteden ödün vermeden net fiyatı telefon veya WhatsApp’tan alırsınız."
    ],
    [
      "Ne kadar kalır?",
      "Saç tipine, yıkama sıklığına ve ev bakımına bağlıdır. Koltukta saçınıza göre konuşuruz; mucize süre yazmayız."
    ],
    [
      "Keratin bakımdan farkı nedir?",
      "Brezilya fönü düzlük ve elektriklenme kontrolüne daha yakındır. Keratin protein ve ışıltı ister. İkisini de aynı salonda yapıyoruz."
    ],
    [
      "Çukurambar’dan Brezilya fönüne gelir miyim?",
      "Evet. İşçi Blokları’ndayız; Çukurambar, Yüzüncü Yıl ve Balgat’a yakınız."
    ],
    [
      "İşlemi videoda görebilir miyim?",
      "Evet. Kanalımızdaki Brezilya fönü videosu salonumuzdan. Gelmeden izleyin."
    ],
    [
      "Randevu şart mı?",
      "Şart. Süre ister. Gelmeden arayın veya formu doldurun."
    ]
  ],
  keratin: [
    [
      "Keratin bakım nedir?",
      "Yıpranmış, mat ve kırılgan saça protein iade eder. Kopmayı azaltır, ışıltı bırakır, şekil almayı kolaylaştırır."
    ],
    [
      "Ankara keratin bakım fiyatı 2026’da nedir?",
      "Saç durumuna göre değişir. İşçi Blokları’nda uygun fiyat–kalite dengesini koruyoruz; güncel rakam için arayın."
    ],
    [
      "Kimlere önerirsiniz?",
      "Boya, ısı ve şehir havasıyla yorulmuş saça. Her saç tipine aynı tüp gitmez; önce saçı okuruz."
    ],
    [
      "Brezilya fönü yerine keratin mi?",
      "Düzlük istiyorsanız Brezilya fönü, güç ve ışıltı istiyorsanız keratin öne çıkar. Kararsızsanız koltukta netleşir."
    ],
    [
      "Tesettür bölümünde bakım olur mu?",
      "Olur. Tesettür için ayrı bölümümüz var; randevuda belirtin."
    ],
    [
      "Keratin videosu var mı?",
      "YouTube’da keratin bakım ve Brezilya fönü karelerimiz duruyor. Kanalı açıp bakabilirsiniz."
    ]
  ],
  boya: [
    [
      "Transparan saç boyası nedir?",
      "Beyaz kapatmada dip boyasına yumuşak bir alternatiftir. Saçı boğmaz, aktığında sert dip çizgisi bırakmaz, ışıltı katar."
    ],
    [
      "Kendi doğal rengine sürülür mü?",
      "Rastgele sürülmez. Önce ton analizi yapılır. Radikal renk değişimi değil, kendi güzelliğinizin görünmesi hedeflenir."
    ],
    [
      "Öncesi ve sonrasını görebilir miyim?",
      "YouTube’da transparan boyanın öncesi ve sonrası ayrı videolar. Bu sayfada ikisini de açtık."
    ],
    [
      "Ombre, sombre, röfle ve balyaj da var mı?",
      "Var. Dip boya, komple boya, organik boya, ombre, sombre, röfle ve balyaj Çankaya’da uygulanır."
    ],
    [
      "2026 transparan boya fiyatı nedir?",
      "Saç boyu, beyaz oranı ve istenen ışıltıya göre değişir. Sitede eski rakam tutmayız; arayın, net konuşalım."
    ],
    [
      "Çankaya’da randevu nasıl alınır?",
      "Telefon, WhatsApp veya randevu formu. “İnternetten görüp aradım” deyin, 2026’da da en hızlı sırayı o cümle açıyor."
    ]
  ],
  iletisim: [
    [
      "Adresiniz neresi?",
      "Kuaför Mustafa Şimşek, İşçi Blokları, 1522. Cadde No:8, 06530 Çankaya/Ankara. Haritadaki pin salonun kapısı."
    ],
    [
      "Çukurambar, Yüzüncü Yıl veya Balgat’tan nasıl gelirim?",
      "İşçi Blokları’ndayız; bu mahallelere en yakın bayan kuaför adreslerinden biriyiz. Yol tarifi butonuna basın, telefon sizi getirir."
    ],
    [
      "Telefon ve WhatsApp nedir?",
      "0538 830 36 83. Aynı numara hem arama hem WhatsApp. Formu doldurursanız mesaj hazır gelir."
    ],
    [
      "Çalışma saatleriniz nedir?",
      "Pazartesi–Cuma 07:30–19:00, Cumartesi 08:00–19:00, Pazar 09:30–19:00."
    ],
    [
      "Sosyal medyanız hangileri?",
      "Instagram @kuaformustafasimsek, YouTube @kuaformustafasimsek-cankay3229. Kesim ve bakım videoları kanalda."
    ],
    [
      "Walk-in kabul ediyor musunuz?",
      "Randevu ile çalışıyoruz. Gelmeden yazın; boş koltuk varsa aynı gün de bakarız."
    ]
  ],
  randevu: [
    [
      "Formu gönderince ne olur?",
      "WhatsApp sohbeti açılır, adınız, hizmetiniz ve notunuz hazır gelir. “İnternetten görüp yazdım” cümlesi otomatik eklenir."
    ],
    [
      "Randevu almam şart mı?",
      "Evet. Kesim, keratin ve Brezilya fönü süre ister. 2026’da da walk-in ile hayal kırıklığı yaşamayın."
    ],
    [
      "Hangi hizmeti seçmeliyim?",
      "Emin değilseniz “Diğer” deyip not yazın. Fotoğraf da gönderebilirsiniz; birlikte netleştiririz."
    ],
    [
      "Aynı gün randevu olur mu?",
      "Boşluk varsa olur. Formu gönderin veya doğrudan arayın. Sabah erken saatler Çankaya’da çabuk dolar."
    ],
    [
      "Fiyatı formda neden yok?",
      "Saç uzunluğu ve işlem değişince rakam da değişir. 2026 güncel fiyatı telefonda veya WhatsApp’ta konuşuruz."
    ],
    [
      "Tesettür randevusu nasıl alınır?",
      "Hizmet listesinden tesettür / türban seçin veya notta belirtin. Ayrı bölümümüz var."
    ]
  ],
  notFound: [
    [
      "Bu sayfa neden açılmadı?",
      "Bağlantı eski kalmış olabilir. Menüdeki adresler 2026’da da aynı durur: ana sayfa, kesim, bakım, iletişim."
    ],
    [
      "Randevu almak istiyorum, ne yapayım?",
      "Randevu formuna gidin veya 0538 830 36 83’ü arayın. Çankaya İşçi Blokları’ndayız."
    ],
    [
      "Hizmetlerinizi nereden göreyim?",
      "Ana sayfadan tüm işlere geçersiniz. YouTube kanalında kesim ve boya videoları da var."
    ]
  ]
};

const salonSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Kuaför Mustafa Şimşek",
  url: `${SITE}/`,
  telephone: TEL,
  email: MAIL,
  image: `${SITE}/assets/img/logo.svg`,
  description:
    "Çankaya İşçi Blokları’nda bayan kuaförü. Kişiye özel saç kesimi, saç modelleri, keratin bakım, Brezilya fönü ve transparan saç boyası.",
  slogan: SLOGAN,
  priceRange: "₺₺",
  hasMap: MAPS,
  address: {
    "@type": "PostalAddress",
    streetAddress: "İşçi Blokları, 1522.Cd. No:8",
    addressLocality: "Çankaya",
    addressRegion: "Ankara",
    postalCode: "06530",
    addressCountry: "TR"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: Number(LAT),
    longitude: Number(LNG)
  },
  areaServed: ["Çankaya", "Çukurambar", "Yüzüncü Yıl", "Balgat", "İşçi Blokları"],
  sameAs: [IG, YT],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:30",
      closes: "19:00"
    }
  ]
};

function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a
      }
    }))
  };
}

function breadcrumbSchema(urlPath, name) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: `${SITE}/ana-sayfa/`
    }
  ];
  if (urlPath !== "/ana-sayfa/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name,
      item: `${SITE}${urlPath === "/" ? "/" : urlPath}`
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  };
}

const chips = `<div class="areas">
      <span class="chip">Çukurambar</span>
      <span class="chip">Yüzüncü Yıl</span>
      <span class="chip">Balgat</span>
      <span class="chip">İşçi Blokları</span>
      <span class="chip">Çankaya / Ankara</span>
    </div>`;

function layout({ urlPath, title, description, active, content, faqs: pageFaqs = [] }) {
  const canonical = SITE + urlPath;
  const links = nav
    .map(
      ([href, label]) =>
        `<a href="${href}" class="${href === active ? "is-active" : ""}">${label}</a>`
    )
    .join("\n            ");
  const crumbName = title.split("|")[0].trim();
  const schemas = [salonSchema, breadcrumbSchema(urlPath, crumbName)];
  if (pageFaqs.length) schemas.push(faqSchema(pageFaqs));
  const jsonLd = schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n  ");

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="author" content="Kuaför Mustafa Şimşek">
  <meta name="geo.region" content="TR-06">
  <meta name="geo.placename" content="Çankaya, Ankara">
  <meta name="geo.position" content="${LAT};${LNG}">
  <meta name="ICBM" content="${LAT}, ${LNG}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="Kuaför Mustafa Şimşek">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}/assets/img/og-gorsel.jpg">
  <meta property="og:image:alt" content="Kuaför Mustafa Şimşek — Çankaya bayan kuaförü">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${SITE}/assets/img/og-gorsel.jpg">
  <meta name="theme-color" content="#000000">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Gelasio:ital,wght@0,400;0,600;1,400&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/site.css">
  ${jsonLd}
</head>
<body>
  <a class="skip-link" href="#icerik">İçeriğe geç</a>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="/ana-sayfa/">
        <img src="/assets/img/logo.svg" alt="Kuaför Mustafa Şimşek" width="47" height="56">
        <span class="logo-text">
          <small>Çankaya / Ankara</small>
          <strong>Mustafa Şimşek</strong>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Menü">
        <img src="/assets/icons/menu.svg" width="24" height="24" alt="">
      </button>
      <nav class="nav" aria-label="Ana menü">
            ${links}
        <a class="btn btn-primary nav-cta" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      </nav>
    </div>
  </header>
  <main id="icerik">
    ${content}
  </main>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <a class="logo" href="/ana-sayfa/" style="margin-bottom:16px">
          <img src="/assets/img/logo.svg" alt="" width="47" height="56">
          <span class="logo-text">
            <small>Çankaya / Ankara</small>
            <strong>Mustafa Şimşek</strong>
          </span>
        </a>
        <p>${SLOGAN} 1997’den beri saça tutkuyla bağlıyız. 2010’dan beri kendi salonumuzda, Çukurambar, Yüzüncü Yıl, Balgat ve İşçi Blokları’na en yakın bayan kuaför hizmetini veriyoruz.</p>
        ${socialRow()}
      </div>
      <div>
        <h3>Sayfalar</h3>
        <ul>
          ${nav.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}
          <li><a href="/randevu-formu/">Randevu Formu</a></li>
        </ul>
      </div>
      <div>
        <h3>İletişim</h3>
        <ul class="footer-contact">
          <li><a href="tel:${TEL}">${ic("icon-phone")} ${PHONE}</a></li>
          <li><a href="${WA}">${ic("icon-whatsapp")} WhatsApp</a></li>
          <li><a href="mailto:${MAIL}">${ic("icon-mail")} ${MAIL}</a></li>
          <li><a href="${IG}" rel="noopener" target="_blank">${ic("icon-instagram")} Instagram</a></li>
          <li><a href="${YT}" rel="noopener" target="_blank">${ic("icon-youtube")} YouTube</a></li>
          <li><a href="${DIR}">${ic("icon-location")} Yol tarifi</a></li>
          <li><span>${ic("icon-time")} Pzt–Cuma 07:30–19:00</span></li>
        </ul>
      </div>
    </div>
  </footer>
  <nav class="mobile-bar" aria-label="Hızlı iletişim">
    <a href="tel:${TEL}">${ic("icon-phone")} Ara</a>
    <a href="${WA}">${ic("icon-whatsapp")} WhatsApp</a>
    <a class="hot" href="/randevu-formu/">${ic("icon-randevu")} Randevu</a>
  </nav>
  <script src="/assets/js/site.js"></script>
</body>
</html>
`;
}

const pages = [
  {
    dir: "ana-sayfa",
    urlPath: "/ana-sayfa/",
    active: "/ana-sayfa/",
    title: "Kuaför Mustafa Şimşek | Çankaya Çukurambar Bayan Kuaförü 2026",
    description:
      "Tarzınızı yansıtan dokunuşlar. Çankaya İşçi Blokları’nda Kuaför Mustafa Şimşek: Çukurambar, Yüzüncü Yıl ve Balgat’a yakın bayan kuaförü. 2026 randevu.",
    faqs: faqs.home,
    content: `
${pageHero({
  kicker: "Size en yakın bayan kuaförü",
  title: SLOGAN.replace(/\.$/, ""),
  lede: "Ankara Çankaya Çukurambar’dan İşçi Blokları’na uzanan yol kısa. 2025’te bizi önerenler 2026’da hâlâ koltuğumuza oturuyor. Tarzınızı yansıtan dokunuşlar için buradayız.",
  file: "hero-ana-sayfa.webp",
  extra: chips,
  buttons: `<a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="tel:${TEL}">${ic("icon-phone")} ${PHONE}</a>
      <a class="btn btn-ghost" href="/iletisim/">${ic("icon-location")} İletişim</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <div>
      <p class="kicker">1997’den beri</p>
      <h2>Sanat, işine değer katmaktır</h2>
      <p>1997’de başladığım kuaförlük mesleğine aynı anlayışla devam ediyorum. 2007’den beri Kanal 24 Ankara bürosunun bayan muhabirlerinin saçını yapıyorum. 2010’da kendi salonumu kurdum; her gün saçlarla dansım sürüyor.</p>
      <p>2026’da da vaadimiz aynı: en yakın, en net randevu, fiyat–kalite dengesi ve koltuktan mutlu kalkmanız.</p>
      ${socialRow()}
    </div>
      <blockquote class="quote card">“${SLOGAN}”<cite>Mustafa Şimşek</cite></blockquote>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">Hizmetler</p>
      <h2>Çankaya’da ne arıyorsanız</h2>
    </div>
    <div class="grid grid-3">
      <a class="card" href="/sac-kesimi/">${icLg("icon-randevu")}<h3>Kişiye özel saç kesimi</h3><p>Kafa yapısı, saç yapısı, sosyal hayat ve giyim tarzına göre kesim.</p></a>
      <a class="card" href="/transparan-sac-boyasi/">${icLg("icon-instagram")}<h3>Renklendirme</h3><p>Dip boya, komple boya, organik boya, ombre, sombre, röfle, balyaj, transparan boya.</p></a>
      <a class="card" href="/ankara-brezilya-fonu/">${icLg("icon-time")}<h3>Şekillendirme</h3><p>Fön, Brezilya fönü, kırık fön, örgü, maşa, okyanus dalgası.</p></a>
      <a class="card" href="/sac-bakim/">${icLg("icon-whatsapp")}<h3>Saç bakım</h3><p>Ankara keratin bakım ve Brezilya fönü ile yıpranmış saça yeniden hayat.</p></a>
      <div class="card">${icLg("icon-mail")}<h3>Güzellik salonu</h3><p>Kaş, dudaküstü, ağda, manikür, pedikür, günlük ve özel makyaj.</p></div>
      <div class="card">${icLg("icon-youtube")}<h3>Özel günler</h3><p>Kına, sünnet, isteme, nişan, düğün ve gelin saçı. Tesettür bölümü mevcut.</p></div>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">Çalışmalarımız</p>
      <h2>Salon galerisi</h2>
      <p>Farklı boyutlarda fotoğraf alanları <strong>resimler.txt</strong> içindeki dosya adlarını bekler. Aynı isimle koyduğunuz görsel otomatik görünür.</p>
    </div>
    <div class="mosaic">
      ${media("banner-ana-sayfa.webp", "Kuaför Mustafa Şimşek salon kapağı", "banner")}
      ${media("galeri-01.webp", "Kuaför Mustafa Şimşek çalışma 1", "tall")}
      ${media("galeri-02.webp", "Kuaför Mustafa Şimşek çalışma 2", "wide")}
      ${media("galeri-03.webp", "Kuaför Mustafa Şimşek çalışma 3", "sq")}
      ${media("galeri-04.webp", "Kuaför Mustafa Şimşek çalışma 4", "sq")}
      ${media("galeri-05.webp", "Kuaför Mustafa Şimşek çalışma 5", "mid")}
      ${media("galeri-06.webp", "Kuaför Mustafa Şimşek çalışma 6", "sm")}
      ${media("galeri-07.webp", "Kuaför Mustafa Şimşek çalışma 7", "sm")}
      ${media("galeri-08.webp", "Kuaför Mustafa Şimşek çalışma 8", "wide")}
    </div>
    <div class="btn-row" style="margin-top:20px">
      <a class="btn btn-ghost" href="${IG}" target="_blank" rel="noopener">${ic("icon-instagram")} Instagram</a>
      <a class="btn btn-ghost" href="${YT}" target="_blank" rel="noopener">${ic("icon-youtube")} YouTube</a>
      <a class="btn btn-ghost" href="${MAPS}" target="_blank" rel="noopener">${ic("icon-location")} Google yorumları</a>
    </div>
  </div>
</section>
${videoSection(
  "Salondan kareler",
  "Kesim, Brezilya fönü ve transparan boyayı YouTube kanalımızdan izleyin. Gelen videolar bu sayfada durur.",
  [videos.kesimNasil, videos.brezilya, videos.boyaSonra, videos.salon]
)}
${faqBlock({
  heading: "Merak ettikleriniz",
  intro: "Kesim, boya, Brezilya fönü, keratin, tesettür ve yol tarifi. Kısa sorular, insanca cevaplar.",
  items: faqs.home
})}
<section>
  <div class="wrap grid grid-2">
    <div>
      <p class="kicker icon-row">${ic("icon-location")} Konum</p>
      <h2>Yol tarifi alın</h2>
      <p>${ADDRESS}</p>
      <div class="btn-row" style="margin:16px 0 20px">
        <a class="btn btn-primary" href="${DIR}">${ic("icon-location")} Yol tarifi</a>
        <a class="btn btn-ghost" href="${WA}">${ic("icon-whatsapp")} WhatsApp</a>
      </div>
    </div>
    <div>
      <p class="hours-head">${ic("icon-time")} Çalışma saatleri</p>
      ${hoursHtml}
    </div>
  </div>
</section>
<section class="cta-band">
  <div class="wrap">
    <h2>Randevunuzu bugün kilitleyin</h2>
    <p>2026 takvimi dolmadan yazın. İnternetten gördüğünüzü söylemeniz yeterli.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/randevu-formu/" style="background:#000;border-color:#000">${ic("icon-randevu")} Randevu formu</a>
      <a class="btn btn-ghost" href="tel:${TEL}">${ic("icon-phone")} Hemen ara</a>
    </div>
  </div>
</section>`
  },
  {
    dir: "sac-kesimi",
    urlPath: "/sac-kesimi/",
    active: "/sac-kesimi/",
    title: "Kişiye Özel Saç Kesimi | Kuaför Mustafa Şimşek Çankaya 2026",
    description:
      "Tarzınızı yansıtan dokunuşlar: Çankaya Çukurambar kişiye özel saç kesimi. Mustafa Şimşek kafa yapısı ve yaşamınıza göre keser. 2026 randevu.",
    faqs: faqs.kesim,
    content: `
${pageHero({
  kicker: "Saç kesimi",
  title: "Kişiye özel saç kesimi",
  lede: "Kesim yaparken insanı tanımak gerekir. 2025’te de 2026’da da aynı kriterler: kafa yapısı, saç yapısı, sosyal hayat, giyim tarzı. Çukurambar, Yüzüncü Yıl, Balgat ve İşçi Blokları’na yakınız.",
  file: "hero-sac-kesimi.webp",
  buttons: `<a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="/sac-modelleri/">${ic("icon-instagram")} Saç modelleri</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <div>
      <h2 class="icon-row">${ic("icon-randevu")} Neden burada kesilir?</h2>
      <ul class="list">
        <li>Kafa ve saç yapısına göre planlanan kesim</li>
        <li>Günlük hayatınızda idare edebileceğiniz model</li>
        <li>Uygun fiyat, salon kalitesi</li>
        <li>Tek kullanımlık hijyen ürünleri</li>
      </ul>
      <blockquote class="quote" style="margin-top:24px">“${SLOGAN}”<cite>Mustafa Şimşek</cite></blockquote>
    </div>
    ${media("hizmet-sac-kesimi.webp", "Çankaya kişiye özel saç kesimi", "tall")}
  </div>
</section>
<section>
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">Kesim galerisi</p>
      <h2>Farklı kareler</h2>
    </div>
    <div class="mosaic">
      ${media("kesim-banner.webp", "Saç kesimi geniş kare", "banner")}
      ${media("kesim-01.webp", "Saç kesimi 1", "tall")}
      ${media("kesim-02.webp", "Saç kesimi 2", "wide")}
      ${media("kesim-03.webp", "Saç kesimi 3", "sq")}
      ${media("kesim-04.webp", "Saç kesimi 4", "sq")}
      ${media("kesim-05.webp", "Saç kesimi 5", "mid")}
    </div>
  </div>
</section>
${videoSection(
  "Kesimi izleyin",
  "Salonda kesimin nasıl yürüdüğünü kanalımızdan gösteriyoruz. Gelmeden bir kez bakın.",
  [videos.kesimNasil, videos.kesimGoster]
)}
${faqBlock({
  heading: "Kesim hakkında",
  intro: "Fotoğraf mı getireceksiniz, yoksa koltukta mı karar vereceksiniz? İkisini de konuşuyoruz.",
  items: faqs.kesim
})}
<section>
  <div class="wrap">
    <div class="btn-row">
      <a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="/iletisim/">${ic("icon-phone")} İletişim</a>
    </div>
  </div>
</section>`
  },
  {
    dir: "sac-modelleri",
    urlPath: "/sac-modelleri/",
    active: "/sac-modelleri/",
    title: "Saç Modelleri ve Galeri | Kuaför Mustafa Şimşek Ankara 2026",
    description:
      "Tarzınızı yansıtan dokunuşlar: 2026 saç modelleri, gelin saçı ve fön. Çankaya İşçi Blokları Kuaför Mustafa Şimşek galeri ve randevu.",
    faqs: faqs.modeller,
    content: `
${pageHero({
  kicker: "Saç modelleri",
  title: "Modele değil, size bakıyoruz",
  lede: "Kararsızsanız doğru yerdesiniz. 2026 trendini yüzünüze, saçınıza ve hayat tempounuza göre süzüyoruz. Fotoğrafları eklediğinizde bu sayfa canlı galeri olur; dosya adları değişmez.",
  file: "hero-sac-modelleri.webp",
  buttons: `<a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="${IG}" target="_blank" rel="noopener">${ic("icon-instagram")} Instagram</a>`
})}
<section>
  <div class="wrap">
    <div class="mosaic">
      ${media("model-banner.webp", "Saç modelleri kapak", "banner")}
      ${media("model-01.webp", "Saç modeli 1", "tall")}
      ${media("model-02.webp", "Saç modeli 2", "wide")}
      ${media("model-03.webp", "Saç modeli 3", "sq")}
      ${media("model-04.webp", "Saç modeli 4", "sq")}
      ${media("model-05.webp", "Saç modeli 5", "mid")}
      ${media("model-06.webp", "Saç modeli 6", "sm")}
      ${media("model-07.webp", "Saç modeli 7", "sm")}
      ${media("model-08.webp", "Saç modeli 8", "wide")}
      ${media("model-09.webp", "Saç modeli 9", "tall")}
    </div>
  </div>
</section>
${videoSection(
  "Model ve kesim videoları",
  "Galerinin yanına salondan çekilmiş kesim ve boya karelerini koyduk.",
  [videos.enIyi, videos.kesimNasil, videos.boyaSonra]
)}
${faqBlock({
  heading: "Model seçerken",
  intro: "Trend bir yana, sizin gününüz bir yana. İkisini dengeleyelim.",
  items: faqs.modeller
})}
<section>
  <div class="wrap">
    <div class="btn-row">
      <a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="${DIR}">${ic("icon-location")} Yol tarifi</a>
      <a class="btn btn-ghost" href="${YT}" target="_blank" rel="noopener">${ic("icon-youtube")} YouTube</a>
    </div>
  </div>
</section>`
  },
  {
    dir: "sac-bakim",
    urlPath: "/sac-bakim/",
    active: "/sac-bakim/",
    title: "Saç Bakım | Ankara Keratin ve Brezilya Fönü | 2026",
    description:
      "Tarzınızı yansıtan dokunuşlar: Ankara Çankaya saç bakım, keratin ve Brezilya fönü. İşçi Blokları Kuaför Mustafa Şimşek, 2026 randevu.",
    faqs: faqs.bakim,
    content: `
${pageHero({
  kicker: "Saç bakım",
  title: "Yıpranan saça 2026 bakımı",
  lede: "Isı, boya ve şehir havası saçtaki keratini azaltır. Çankaya İşçi Blokları’nda keratin bakım ve Brezilya fönü ile saçı yeniden parlaktır, güçlü ve idare edilebilir hale getiriyoruz.",
  file: "hero-sac-bakim.webp",
  buttons: `<a class="btn btn-primary" href="/ankara-keratin-bakim/">${ic("icon-randevu")} Keratin bakım</a>
      <a class="btn btn-ghost" href="/ankara-brezilya-fonu/">${ic("icon-time")} Brezilya fönü</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <article class="card">
      ${icLg("icon-whatsapp")}
      <h2>Keratin bakım</h2>
      <p>Ankara keratin bakım, mat ve kırılgan saça protein iade eder. Çankaya keratin bakım işlemi telleri besler, kırıkları toparlar, pürüzsüz ışıltı bırakır. İşçi Blokları keratin bakımını uzman ekip, kaliteyi uygun fiyatla sunar.</p>
      <a class="btn btn-primary" href="/ankara-keratin-bakim/" style="margin-top:16px">Fiyat ve detay</a>
    </article>
    <article class="card">
      ${icLg("icon-time")}
      <h2>Brezilya fönü</h2>
      <p>Ankara Brezilya fönü, kabaran ve elektriklenen saçta uzun süre kalıcı düzlük ve parlaklık ister. 100. Yıl İşçi Blokları’nda Çankaya Brezilya fönü hem doğal durur hem idare kolaylığı bırakır.</p>
      <a class="btn btn-primary" href="/ankara-brezilya-fonu/" style="margin-top:16px">Fiyat ve detay</a>
    </article>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="mosaic">
      ${media("bakim-banner.webp", "Saç bakım kapağı", "banner")}
      ${media("bakim-01.webp", "Saç bakım 1", "tall")}
      ${media("bakim-02.webp", "Saç bakım 2", "wide")}
      ${media("bakim-03.webp", "Saç bakım 3", "sq")}
      ${media("hizmet-keratin-bakim.webp", "Keratin bakım", "mid")}
      ${media("hizmet-brezilya-fonu.webp", "Brezilya fönü", "mid")}
    </div>
  </div>
</section>
${videoSection(
  "Bakımı izleyin",
  "Keratin ve Brezilya fönünü salondan çekilmiş videolarla görün.",
  [videos.keratin, videos.brezilya]
)}
${faqBlock({
  heading: "Bakım soruları",
  intro: "Saçınız yorulduysa önce konuşuruz, sonra işlem seçeriz.",
  items: faqs.bakim
})}
<section class="cta-band">
  <div class="wrap">
    <h2>Bakım randevusu alın</h2>
    <p>Saç uzunluğu ve duruma göre süre değişir. WhatsApp’tan fotoğraf da gönderebilirsiniz.</p>
    <a class="btn btn-ghost" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
  </div>
</section>`
  },
  {
    dir: "ankara-brezilya-fonu",
    urlPath: "/ankara-brezilya-fonu/",
    active: "/ankara-brezilya-fonu/",
    title: "Ankara Brezilya Fönü Fiyatları 2026 | Çankaya Kuaför Mustafa Şimşek",
    description:
      "Tarzınızı yansıtan dokunuşlar: Ankara Brezilya fönü 2026. Çankaya 100. Yıl İşçi Blokları, Çukurambar ve Balgat’a yakın. Kuaför Mustafa Şimşek.",
    faqs: faqs.brezilya,
    content: `
${pageHero({
  kicker: "Ankara Brezilya fönü fiyatları",
  title: "Pürüzsüz ve ışıltılı saç",
  lede: "Brezilya fönü, yıpranmış, elektriklenen ve kabaran saç için uzun süreli pürüzsüzlük ister. 2025’te bizi Brezilya fönü için seçenler 2026’da da aynı koltuğa dönüyor. Çankaya 100. Yıl İşçi Konutları / İşçi Blokları.",
  file: "hero-brezilya-fonu.webp",
  extra: chips,
  buttons: `<a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="tel:${TEL}">${ic("icon-phone")} Fiyat için ara</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <div>
      <h2 class="icon-row">${ic("icon-time")} Çankaya’da Brezilya fönü</h2>
      <p>Saça özel keratin proteini telleri toparlar, elektriklenmeyi keser, şekil almayı kolaylaştırır. Kuaför Mustafa Şimşek’te işlem saç tipinize göre planlanır; abartı değil, idare edilebilir düzlük hedeflenir.</p>
      <h3>Uygun fiyat, ürün kalitesi</h3>
      <p>Fiyatlar saç uzunluğu ve yoğunluğuna göre değiştiği için sitede sabit rakam yazmıyoruz. 2026 güncel Ankara Brezilya fönü fiyatı için arayın veya yazın. Kaliteden ödün vermeden net fiyat alırsınız.</p>
    </div>
    ${media("hizmet-brezilya-fonu.webp", "Ankara Brezilya fönü", "tall")}
  </div>
</section>
<section>
  <div class="wrap">
    <div class="mosaic">
      ${media("brezilya-banner.webp", "Brezilya fönü kapak", "banner")}
      ${media("brezilya-01.webp", "Brezilya fönü 1", "wide")}
      ${media("brezilya-02.webp", "Brezilya fönü 2", "sq")}
      ${media("brezilya-03.webp", "Brezilya fönü 3", "tall")}
      ${media("brezilya-04.webp", "Brezilya fönü 4", "mid")}
    </div>
    <p style="margin-top:16px">Örnekler için Instagram: <a href="${IG}" target="_blank" rel="noopener">@${IG_HANDLE}</a></p>
  </div>
</section>
${videoSection(
  "Brezilya fönünü izleyin",
  "İşlemi salondan çekilmiş videolarla görün; gelince ne olacağını bilin.",
  [videos.brezilya, videos.keratin]
)}
${faqBlock({
  heading: "Brezilya fönü soruları",
  intro: "Kalıcılık, fiyat ve keratin farkı. Net, kısa cevaplar.",
  items: faqs.brezilya
})}
<section>
  <div class="wrap">
    <div class="btn-row">
      <a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="/iletisim/">${ic("icon-mail")} İletişim</a>
    </div>
  </div>
</section>`
  },
  {
    dir: "ankara-keratin-bakim",
    urlPath: "/ankara-keratin-bakim/",
    active: "/ankara-keratin-bakim/",
    title: "Ankara Keratin Bakım Fiyatları 2026 | Çankaya İşçi Blokları",
    description:
      "Tarzınızı yansıtan dokunuşlar: Ankara keratin bakım 2026. Çankaya 100. Yıl İşçi Konutları’nda Kuaför Mustafa Şimşek; yıpranmış saça protein ve parlaklık.",
    faqs: faqs.keratin,
    content: `
${pageHero({
  kicker: "Ankara keratin bakım fiyatları",
  title: "Saça yeniden hayat",
  lede: "Keratin bakımı solgun, cansız ve kırılgan saçı kökten uca toparlar. Çankaya 100. Yıl İşçi Konutları’nda 2026 keratin bakımı; uzman ekip, kaliteli ürün, uygun fiyat.",
  file: "hero-keratin-bakim.webp",
  buttons: `<a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="${IG}" target="_blank" rel="noopener">${ic("icon-instagram")} Örnekler</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <div>
      <h2 class="icon-row">${ic("icon-whatsapp")} Çankaya keratin bakım</h2>
      <p>İşlem pürüzsüzlük, az elektriklenme ve kolay şekil alma sağlar. Kopmayı azaltır, ipeksi dokunuş bırakır. Her saç tipine aynı tüp gitmez; önce saçı okuruz.</p>
      <p>Ankara 100. Yıl İşçi Konutları’nda uygun fiyatlı keratin bakım mümkün. Güncel 2026 fiyatı için telefon veya WhatsApp yeter. Sitede eski rakam tutmayız; doğru fiyatı o gün konuşuruz.</p>
    </div>
    ${media("hizmet-keratin-bakim.webp", "Ankara keratin bakım", "tall")}
  </div>
</section>
<section>
  <div class="wrap">
    <div class="mosaic">
      ${media("keratin-banner.webp", "Keratin bakım kapak", "banner")}
      ${media("keratin-01.webp", "Keratin 1", "tall")}
      ${media("keratin-02.webp", "Keratin 2", "wide")}
      ${media("keratin-03.webp", "Keratin 3", "sq")}
      ${media("keratin-04.webp", "Keratin 4", "mid")}
    </div>
  </div>
</section>
${videoSection(
  "Keratin bakımı izleyin",
  "Salondaki keratin ve Brezilya fönü kareleri kanalımızda.",
  [videos.keratin, videos.brezilya]
)}
${faqBlock({
  heading: "Keratin soruları",
  intro: "Protein mi, düzlük mü? Saçınızı görünce netleşir.",
  items: faqs.keratin
})}
<section class="cta-band">
  <div class="wrap">
    <h2>Keratin randevusu</h2>
    <p>Çukurambar, Yüzüncü Yıl ve Balgat’tan İşçi Blokları’na gelin. Tesettür bölümümüz var.</p>
    <a class="btn btn-ghost" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
  </div>
</section>`
  },
  {
    dir: "transparan-sac-boyasi",
    urlPath: "/transparan-sac-boyasi/",
    active: "/transparan-sac-boyasi/",
    title: "Ankara Transparan Saç Boyası 2026 | Çankaya Kuaför Mustafa Şimşek",
    description:
      "Tarzınızı yansıtan dokunuşlar: Ankara transparan saç boyası 2026. Beyaz kapatma, ışıltı ve doğal görünüm. Çankaya İşçi Blokları, Çukurambar’a yakın.",
    faqs: faqs.boya,
    content: `
${pageHero({
  kicker: "Ankara transparan saç boyası",
  title: "Beyaza dip boyası şart değil",
  lede: "Transparan saç boyası, beyazları kapatmak isteyenler için dip boyasına yumuşak bir alternatiftir. Saçı boğmaz, aktığında dip boyası gelmiş gibi sert bir çizgi bırakmaz, ışıltı katar.",
  file: "hero-transparan-boya.webp",
  extra: chips,
  buttons: `<a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="/iletisim/">${ic("icon-phone")} İletişim</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <div>
      <h2 class="icon-row">${ic("icon-instagram")} Transparan boya merkezi</h2>
      <ul class="list">
        <li>Beyaz kapatmada dip boyasına alternatif</li>
        <li>Yumuşak formül, saç teline saygılı</li>
        <li>Aktığında sert dip çizgisi oluşturmaz</li>
        <li>Sürekli ağır kimyasal ihtiyaç doğurmaz</li>
        <li>Işıltılı, doğal görünüm</li>
        <li>Kendi doğal rengine sürülmez; analiz şarttır</li>
      </ul>
      <p style="margin-top:16px">Çankaya 100. Yıl İşçi Konutları’nda Kuaför Mustafa Şimşek, 2026 transparan boya uygulamasını saç tonunuza göre hazırlar. Radikal renk değişimi değil, kendi güzelliğinizin görünmesi hedeflenir.</p>
    </div>
    ${media("hizmet-transparan-boya.webp", "Ankara transparan saç boyası", "tall")}
  </div>
</section>
<section>
  <div class="wrap">
    <div class="mosaic">
      ${media("boya-banner.webp", "Transparan boya kapak", "banner")}
      ${media("boya-01.webp", "Transparan boya 1", "tall")}
      ${media("boya-02.webp", "Transparan boya 2", "wide")}
      ${media("boya-03.webp", "Transparan boya 3", "sq")}
      ${media("boya-04.webp", "Transparan boya 4", "mid")}
    </div>
  </div>
</section>
${videoSection(
  "Öncesi ve sonrası",
  "Transparan boyanın öncesi ve sonrası kanalımızda yan yana. Farkı kendiniz görün.",
  [videos.boyaOnce, videos.boyaSonra]
)}
${faqBlock({
  heading: "Transparan boya soruları",
  intro: "Dip boyası şart değil. Işıltı ve doğal duruş için konuşalım.",
  items: faqs.boya
})}
<section>
  <div class="wrap">
    <div class="btn-row">
      <a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu Al</a>
      <a class="btn btn-ghost" href="${DIR}">${ic("icon-location")} Yol tarifi</a>
    </div>
  </div>
</section>`
  },
  {
    dir: "iletisim",
    urlPath: "/iletisim/",
    active: "/iletisim/",
    title: "İletişim | Kuaför Mustafa Şimşek Çankaya 2026",
    description:
      "Kuaför Mustafa Şimşek iletişim: 0538 830 36 83, WhatsApp, İşçi Blokları 1522.Cd. No:8 Çankaya/Ankara. 2026 saatler, yol tarifi ve YouTube.",
    faqs: faqs.iletisim,
    content: `
${pageHero({
  kicker: "İletişim",
  title: "Arayın, yazın, gelin",
  lede: "Randevu ile çalışıyoruz. İnternetten gördüğünüzü söyleyin, 2026’da da en hızlı dönüşü o cümle alır.",
  file: "hero-iletisim.webp",
  buttons: `<a class="btn btn-primary" href="tel:${TEL}">${ic("icon-phone")} ${PHONE}</a>
      <a class="btn btn-ghost" href="${WA}">${ic("icon-whatsapp")} WhatsApp ile yaz</a>
      <a class="btn btn-ghost" href="${DIR}">${ic("icon-location")} Yol tarifi al</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <div class="contact-list">
      <a href="tel:${TEL}">${icLg("icon-phone")}<span class="contact-copy"><strong>Telefon</strong>${PHONE}</span></a>
      <a href="${WA}">${icLg("icon-whatsapp")}<span class="contact-copy"><strong>WhatsApp</strong>${PHONE}</span></a>
      <a href="mailto:${MAIL}">${icLg("icon-mail")}<span class="contact-copy"><strong>E-posta</strong>${MAIL}</span></a>
      <a href="${IG}" target="_blank" rel="noopener">${icLg("icon-instagram")}<span class="contact-copy"><strong>Instagram</strong>@${IG_HANDLE}</span></a>
      <a href="${YT}" target="_blank" rel="noopener">${icLg("icon-youtube")}<span class="contact-copy"><strong>YouTube</strong>@kuaformustafasimsek-cankay3229</span></a>
      <div class="card">${icLg("icon-location")}<span class="contact-copy"><strong>Adres</strong><p>${ADDRESS}</p></span></div>
      <div class="card">${icLg("icon-time")}<span class="contact-copy"><strong>Çalışma saatleri</strong>${hoursHtml}</span></div>
      <div class="card">${icLg("icon-randevu")}<span class="contact-copy"><strong>Randevu</strong><p>Form veya telefon. Walk-in yok.</p></span></div>
    </div>
    <div>
      <div class="map-frame">
        <iframe title="Kuaför Mustafa Şimşek harita" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${MAP_EMBED}"></iframe>
      </div>
      ${media("salon-iletisim.webp", "Salon dış görünüm", "mid")}
      ${socialRow()}
      <div class="btn-row" style="margin-top:16px">
        <a class="btn btn-primary" href="/randevu-formu/">${ic("icon-randevu")} Randevu formu</a>
      </div>
    </div>
  </div>
</section>
${videoSection(
  "Salonu görün",
  "Çankaya salonunu ve çalışmaları YouTube’dan izleyin.",
  [videos.salon, videos.enIyi]
)}
${faqBlock({
  heading: "Yol ve iletişim",
  intro: "Kapıyı, saati ve numarayı buradan netleştirin.",
  items: faqs.iletisim
})}`
  },
  {
    dir: "randevu-formu",
    urlPath: "/randevu-formu/",
    active: "/randevu-formu/",
    title: "Randevu Formu | Kuaför Mustafa Şimşek 2026",
    description:
      "Kuaför Mustafa Şimşek randevu formu. Çankaya İşçi Blokları bayan kuaförü. Form WhatsApp’a düşer, telefon: 0538 830 36 83.",
    faqs: faqs.randevu,
    content: `
${pageHero({
  kicker: "Randevu formu",
  title: "2026 randevusu",
  lede: "Formu gönderince WhatsApp sohbeti açılır, mesajınız hazır gelir. İsterseniz doğrudan arayın. Gelmeden mutlaka randevu alın.",
  file: "hero-randevu.webp",
  buttons: `<a class="btn btn-ghost" href="tel:${TEL}">${ic("icon-phone")} ${PHONE}</a>
      <a class="btn btn-ghost" href="${WA}">${ic("icon-whatsapp")} WhatsApp</a>`
})}
<section>
  <div class="wrap grid grid-2">
    <form class="form card" id="randevu-form">
      <p class="icon-row">${ic("icon-randevu")} WhatsApp’a hazır mesaj</p>
      <label>Ad soyad
        <input name="ad" type="text" required autocomplete="name">
      </label>
      <label>Telefon
        <input name="telefon" type="tel" required autocomplete="tel">
      </label>
      <label>Hizmet
        <select name="hizmet" required>
          <option value="">Seçin</option>
          <option>Saç kesimi</option>
          <option>Saç modeli / fön</option>
          <option>Brezilya fönü</option>
          <option>Keratin bakım</option>
          <option>Transparan saç boyası</option>
          <option>Boya / ombre / balyaj</option>
          <option>Gelin saçı / özel gün</option>
          <option>Tesettür / türban</option>
          <option>Diğer</option>
        </select>
      </label>
      <label>Tarih
        <input name="tarih" type="date">
      </label>
      <label>Saat
        <input name="saat" type="time">
      </label>
      <label>Not
        <textarea name="not" placeholder="Saç uzunluğu, önceki işlem, tercih ettiğiniz usta..."></textarea>
      </label>
      <p class="form-note">Gönderince WhatsApp açılır. “İnternetten görüp yazdım” notu otomatik eklenir.</p>
      <button class="btn btn-primary" type="submit">${ic("icon-whatsapp")} WhatsApp’tan gönder</button>
    </form>
    <div>
      <div class="card">
        ${icLg("icon-randevu")}
        <h2>Neden randevu?</h2>
        <p>Kesim, keratin ve Brezilya fönü süre ister. 2026’da da walk-in ile hayal kırıklığı yaşamayın. En yakın boşluğu telefon veya bu formla veriyoruz.</p>
      </div>
      <div class="card" style="margin-top:16px">
        ${icLg("icon-location")}
        <h3>Adres</h3>
        <p>${ADDRESS}</p>
        <p class="hours-head" style="margin-top:12px">${ic("icon-time")} Saatler</p>
        ${hoursHtml}
      </div>
      ${media("randevu-salon.webp", "Randevu salonu", "mid")}
    </div>
  </div>
</section>
${videoSection(
  "Gelmeden izleyin",
  "Salonu ve kesimi YouTube’dan görün; randevuda ne beklediğinizi bilin.",
  [videos.salon, videos.kesimNasil]
)}
${faqBlock({
  heading: "Randevu soruları",
  intro: "Form, fiyat ve aynı gün boşluk. Kısa cevaplar.",
  items: faqs.randevu
})}`
  }
];

for (const page of pages) {
  const html = layout(page);
  const outDir = path.join(root, page.dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
}

const notFound = layout({
  urlPath: "/",
  active: "",
  title: "Sayfa bulunamadı | Kuaför Mustafa Şimşek",
  description: "Aradığınız sayfa taşınmamış olabilir. Ana sayfaya veya randevu formuna dönün.",
  faqs: faqs.notFound,
  content: `
<section class="hero">
  <div class="wrap">
    <p class="kicker">404</p>
    <h1>Bu bağlantı boş</h1>
    <p class="lede">Eski Google Sites adresi duruyor olabilir. Menüdeki sayfalar 2026’da da aynı kalır.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/ana-sayfa/">${ic("icon-location")} Ana sayfa</a>
      <a class="btn btn-ghost" href="/randevu-formu/">${ic("icon-randevu")} Randevu</a>
    </div>
  </div>
</section>
${faqBlock({
  heading: "Nereye gideyim?",
  intro: "Yanlış adrese düştüyseniz buradan toparlanır.",
  items: faqs.notFound
})}`
});
fs.writeFileSync(path.join(root, "404.html"), notFound, "utf8");

const urls = ["/", ...pages.map((p) => p.urlPath)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u === "/" ? "/" : u}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");

console.log("Pages written:", pages.length + 1);
