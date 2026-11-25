# AffilMate — Tim AI Affiliate

AffilMate adalah prototipe dashboard berbahasa Indonesia untuk membantu kreator merencanakan promosi affiliate Shopee. Buka `index.html` di browser untuk mencoba.

## Yang tersedia

- Empat peran kerja: Product Scout, Campaign Strategist, Content Creator, dan Performance Analyst.
- Form produk untuk nama, kategori, harga, komisi, audiens, dan keunggulan yang sudah diverifikasi.
- Pembuatan draft angle kampanye, hook, naskah video pendek, caption, CTA, dan checklist.
- Tombol salin dan penyimpanan maksimal lima draft di `localStorage` browser.
- Layout responsif untuk layar desktop dan ponsel.

## Batasan prototipe

Fitur pembuatan draft saat ini menggunakan template lokal di `app.js`; ini **belum terhubung ke model AI, Shopee, data performa affiliate, atau sistem publikasi**. Angka pada kartu ringkasan adalah contoh, bukan hasil akun pengguna. Jangan memasukkan kredensial atau data sensitif. Untuk integrasi AI sungguhan, panggil model melalui backend yang mengamankan API key—jangan pernah menaruh secret di JavaScript browser. Integrasi Shopee hanya melalui API resmi dan akses yang memang diizinkan; prototipe ini tidak melakukan scraping atau posting otomatis.

## Pengembangan selanjutnya

1. Tambahkan backend dan endpoint AI untuk Product Scout, Campaign Strategist, Content Creator, dan Performance Analyst.
2. Hubungkan sumber data produk dan laporan performa resmi yang tersedia bagi akun affiliate.
3. Tambahkan kalender konten, pengujian beberapa variasi hook, dan analisis hasil klik/konversi.
4. Wajibkan tinjauan manusia sebelum konten dipublikasikan; cek harga, stok, klaim, disclosure affiliate, serta aturan platform.
