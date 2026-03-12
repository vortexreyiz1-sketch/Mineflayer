# Groq AI Destekli Mineflayer Bot Planı

## Faz 1 — MVP Temeli
- Mineflayer bağlantı, reconnect ve temel event logları.
- Groq API ile doğal dil komutundan görev planı üretme.
- Güvenli `tool` katmanı (follow, stop, goto, say).
- Görev yürütücü (queue + timeout + hata mesajları).

## Faz 2 — Oyun Eylemleri
- Envanter denetimi ve item bulma.
- Basit kazma/blok yerleştirme araçları.
- Pathfinder ile hedefe koordinat bazlı yürüyüş.

## Faz 3 — Çok Adımlı Görevler
- Önkoşul/sonuç doğrulaması.
- Eksik kaynakta fallback görevleri.
- Görev geçmişi ve kısa hafıza özeti.

## Faz 4 — Operasyonel Dayanıklılık
- Komut başına oran limiti.
- Yetkili kullanıcı listesi.
- Prompt injection savunması (yalnızca JSON plan kabulü).

## Faz 5 — Gelişmiş Seviye
- Uzun süreli hafıza.
- Web dashboard + telemetri.
- Plugin tabanlı beceri genişletme.
