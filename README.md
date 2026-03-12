# Mineflayer Groq Bot (MVP iskeleti)

Bu repo, Groq API destekli gelişmiş bir Mineflayer botu için modüler bir başlangıç yapısı içerir.

## Özellikler (MVP)
- Mineflayer ile sunucu bağlantısı
- Groq tabanlı komut planlayıcı
- Güvenli aksiyon filtresi (yalnızca izinli action'lar)
- Tool katmanı (`say`, `follow_player`, `goto`, `stop`)
- Chat prefix + yetkili kullanıcı listesi
- Bağlantı kopmasında otomatik tekrar bağlanma

## Kurulum
```bash
npm install
cp .env.example .env
```

`.env` içinde en az şu alanları doldurun:
- `GROQ_API_KEY`
- `MINECRAFT_HOST`
- `MINECRAFT_PORT`
- `MINECRAFT_USERNAME`

## Çalıştırma
```bash
npm run dev
```

Mesajlar `BOT_PREFIX` ile başlamalıdır (varsayılan: `!`).
Örnek:
- `!beni takip et`
- `!x 100 y 65 z -20 noktasına git`

## Mimari
- `src/ai/` -> Groq istemcisi + planlayıcı
- `src/bot/` -> Mineflayer botu + toollar + görev yürütücü
- `docs/PLAN.md` -> Faz bazlı geliştirme planı

## Sonraki adımlar
- Envanter/craft görevleri
- Kazma ve blok yerleştirme eylemleri
- Çok adımlı görev doğrulama
- Uzun dönem hafıza
