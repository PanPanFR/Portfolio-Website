## Global Rule
- Jangan jalankan npm run dev atau pnpm dev
- saya sudah jalankan server secara local di http://localhost:5173/ jadi jangan jalankan lagi, pake itu saja
- selakukan gunakan pnpm jika ingin cek lint atau build jangan npm
- sebelum melakukan implementasi diawali dengan membaca AGENTS.md

## Perubahan pada halaman projects
- Kotak Type animasi kliknya sangat jelek, perbaiki atau ubah animasi saat di klik agar lebih smooth
- kotak type ukurannya samakan dengan ukuran kotak search, karna yg skrng masih kegedean dikit, pokoknya ukurannya harus sama
- perbaiki animasi in animation untuk kotak search agar sama atau seragam dengan kotak type agar setara
- pada tampilan mobile ukuran cards dari projects nya tidak sesuai dengan kanan kirinya kotak diatasnya (akan saya lampirkan gambar) sehingga bagian kanan kirinya tidak sejajar dengan semua kotak yg ada

## Perubahan pada halaman achievment
- kotak sort ubah ukurannya samakan dengan kotak search, karna yg skrng aga kegedean
- kotak sort juga animasi kliknya sangat jelek, perbaiki atau ubah animasinya agar ketika di klik bisa lebih baik atau lebih smooth
- perbaiki in animation pada kotak search dan sort agar keduanya sama atau seragam
- pada tampilan mobile ukuran cards dari achievement nya tidak sesuai dengan kanan kirinya kotak diatasnya (akan saya lampirkan gambar) sehingga bagian kanan kirinya tidak sejajar dengan semua kotak yg ada

## Perubahan pada halaman Stats
- ukuran kotak followers, following, dan repository kebesaran di dalam kotak containernya, ubah agar ukurannya lebih sesuai atau simpelnya ukurannya di perkecil karna yg sekarang itu keluar kotak (akan saya lampirkan gambar). hal ini kegedean baik pada tampilan pc dan mobile

## Perubahan pada halaman Blogs
- pada tampilan mobile ukuran cards dari blog nya tidak sesuai dengan kanan kirinya kotak diatasnya yaitu kotak sorts by (akan saya lampirkan gambar) sehingga bagian kanan kirinya tidak sejajar dengan semua kotak yg ada

## Rule secara general
- note aja pokoknya saya mau konsisten ukuran ukuran cardsnya jangan ada yg kebesaran atau kekecilan, gunakan mcp server playwright untuk cek ini
- saya mau setiap hal yg bisa dipencet kursor dari mouse berubah jadi bentuk jari tangan jangan tetep sama hal ini untuk UX yg lebih baik sehingga user tau mana hal yg bisa dipencet dan mana yg tidak

## MCP Server Rule
- gunakan mcp server yg sesuai kebutuhan
- gunakan mcp server playwright jika ingin cek UI
- gunakan mcp server ChromeDevTool untuk cek console log jika terjadi error
