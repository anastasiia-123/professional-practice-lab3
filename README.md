# Практична робота №2: Контейнеризація та Оркестрація (Частина 2)

**Студент:** Алієва Анастасія  
**Варіант:** 1 (E-commerce backend)

## Опис проекту
Реалізовано мультисервісну систему на базі Docker Compose:
* **Nginx:** Reverse proxy з Rate Limiting (10 req/s) та Gzip стисненням.
* **API:** 2 репліки Node.js додатку (Load Balancing).
* **PostgreSQL 16:** База даних з Persistent Volume.
* **Redis 7:** Кешування з автентифікацією.

## Як запустити
1. **Production режим:** `docker compose up --build`
2. **Development режим:** `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

## Технічні деталі
* Мережева ізоляція (frontend/backend мережі).
* Ліміти ресурсів (CPU/Memory) для кожного сервісу.
* Автоматичні Healthchecks для перевірки стану сервісів.
