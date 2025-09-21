📋 Ringkasan Temuan Keamanan
Missing Security Headers

Content-Security-Policy (CSP) ❌ tidak ada.

X-Frame-Options ❌ tidak ada.

X-Content-Type-Options ❌ tidak ada.

Referrer-Policy ❌ tidak ada.

Permissions-Policy ❌ tidak ada.

Risiko yang Ditimbulkan

Tanpa CSP → rawan XSS (Cross-Site Scripting).

Tanpa X-Frame-Options → rawan Clickjacking attack.

Tanpa X-Content-Type-Options → browser bisa salah deteksi tipe file → serangan MIME-sniffing.

Tanpa Referrer-Policy → URL & query user bisa bocor ke pihak ketiga.

Tanpa Permissions-Policy → fitur sensitif browser (kamera, mic, geolocation) tidak dibatasi.

Server software detected

Informasi server/teknologi kebaca (kadang bisa jadi clue buat attacker).

🛠️ Solusi & Fix
1. X-Content-Type-Options
Tambahkan header:

X-Content-Type-Options: nosniff
👉 Mencegah browser sniff file type.

2. X-Frame-Options
Tambahkan header:

X-Frame-Options: SAMEORIGIN
👉 Cegah iframe dari domain lain (proteksi clickjacking).

3. Referrer-Policy
Tambahkan header:

Referrer-Policy: strict-origin-when-cross-origin
👉 Bocoran referer minimal, tapi masih bisa dipakai analytics.

4. Content-Security-Policy (CSP)
Contoh sederhana:

Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
👉 Batasi sumber script, style, dll hanya dari domain sendiri. Bisa di-tune sesuai kebutuhan.

5. Permissions-Policy
Contoh aman:

Permissions-Policy: geolocation=(), microphone=(), camera=()
👉 Matikan akses API sensitif.