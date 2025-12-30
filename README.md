# Corven Dijital - Ajans Web Sitesi

İKAS e-ticaret çözümleri, SEO optimizasyonu ve özel yazılım geliştirme hizmetleri sunan Corven Dijital ajansı için geliştirilmiş modern web sitesi ve admin paneli.

## Teknolojiler

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons

### Backend
- Express.js
- JWT Authentication
- JSON dosya tabanlı veritabanı

## Kurulum

### 1. Repoyu klonlayın
```bash
git clone https://github.com/KULLANICI/corven.git
cd corven
```

### 2. Backend kurulumu
```bash
cd server
npm install
npm start
```
Backend http://localhost:4000 adresinde çalışacak.

### 3. Frontend kurulumu
```bash
cd client
npm install
npm run dev
```
Frontend http://localhost:3000 adresinde çalışacak.

## Sayfalar

### Public Sayfalar
- `/` - Ana Sayfa
- `/hizmetler` - Hizmetler
- `/projeler` - Projeler / Portfolio
- `/blog` - Blog
- `/hakkimizda` - Hakkımızda
- `/iletisim` - İletişim
- `/teklif` - Teklif Formu

### Admin Paneli
- `/admin` - Giriş
- `/admin/dashboard` - Dashboard
- `/admin/teklifler` - Teklif Yönetimi
- `/admin/projeler` - Proje Yönetimi
- `/admin/blog` - Blog Yönetimi
- `/admin/kullanicilar` - Kullanıcı Yönetimi

## Admin Giriş Bilgileri

```
Kullanıcı: admin
Şifre: admin123
```

> ⚠️ Production ortamında bu bilgileri değiştirmeyi unutmayın!

## API Endpoints

- `POST /api/auth/login` - Giriş
- `GET /api/auth/me` - Kullanıcı bilgisi
- `GET /api/projects` - Projeler (public)
- `GET /api/blogs` - Blog yazıları (public)
- `POST /api/proposals` - Teklif gönderme (public)
- `GET /api/stats` - İstatistikler

## Lisans

MIT
