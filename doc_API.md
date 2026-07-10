# 📚 API Documentation — BE-WPM

> **Base URL:** `https://be-wpm.vercel.app`  
> **Tech Stack:** Express.js · TypeScript · Prisma ORM · PostgreSQL  
> **Authentication:** Bearer Token (JWT) — masa berlaku **2 hari**

---

## 📋 Daftar Isi

- [Authentication](#-authentication)
- [Kategori](#%EF%B8%8F-kategori)
- [Berita](#-berita)
- [Guru](#-guru)
- [Karyawan](#-karyawan)
- [Upload](#-upload)
- [Format Response](#-format-response)
- [Error Codes](#-error-codes)

---

## 🔐 Authentication

Base path: `/api/auth`

### Register

Mendaftarkan akun pengguna baru.

```
POST /api/auth/register
```

**Request Body** (`application/json`)

| Field      | Type     | Required | Keterangan             |
|------------|----------|----------|------------------------|
| `nama`     | `string` | ✅        | Nama lengkap pengguna  |
| `email`    | `string` | ✅        | Alamat email unik      |
| `password` | `string` | ✅        | Kata sandi             |

**Contoh Request**
```json
{
  "nama": "Budi Santoso",
  "email": "budi@example.com",
  "password": "rahasia123"
}
```

**Response `201 Created`**
```json
{
  "success": true,
  "message": "Register berhasil",
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com"
  }
}
```

**Response Error**

| Status | Keterangan              |
|--------|-------------------------|
| `400`  | Field wajib tidak diisi |
| `409`  | Email sudah digunakan   |
| `500`  | Kesalahan server        |

---

### Login

Autentikasi pengguna dan mendapatkan token JWT.

```
POST /api/auth/login
```

**Request Body** (`application/json`)

| Field      | Type     | Required | Keterangan    |
|------------|----------|----------|---------------|
| `email`    | `string` | ✅        | Alamat email  |
| `password` | `string` | ✅        | Kata sandi    |

**Contoh Request**
```json
{
  "email": "budi@example.com",
  "password": "rahasia123"
}
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com"
  }
}
```

**Response Error**

| Status | Keterangan                |
|--------|---------------------------|
| `400`  | Field wajib tidak diisi   |
| `401`  | Email atau password salah |
| `500`  | Kesalahan server          |

---

### Get Current User

Mendapatkan data pengguna yang sedang login.

```
GET /api/auth/me
```

**Headers**

```
Authorization: Bearer <token>
```

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com"
  }
}
```

**Response Error**

| Status | Keterangan                          |
|--------|-------------------------------------|
| `401`  | Token tidak valid / tidak ada       |
| `500`  | Kesalahan server                    |

---

## 🗂️ Kategori

Base path: `/api/kategori`

> **Catatan:** `slug` di-generate otomatis dari field `nama`.

### Get All Kategori

Mengambil semua kategori beserta berita yang terkait.

```
GET /api/kategori
```

**Response `200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Pengumuman",
      "slug": "pengumuman",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z",
      "berita": [ ... ]
    }
  ]
}
```

---

### Get Kategori by ID

```
GET /api/kategori/:id
```

**Path Parameter**

| Parameter | Type  | Keterangan       |
|-----------|-------|------------------|
| `id`      | `int` | ID dari kategori |

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Pengumuman",
    "slug": "pengumuman",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z",
    "berita": [ ... ]
  }
}
```

**Response Error**

| Status | Keterangan               |
|--------|--------------------------|
| `404`  | Kategori tidak ditemukan |

---

### Create Kategori 🔒

```
POST /api/kategori
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**

| Field  | Type     | Required | Keterangan    |
|--------|----------|----------|---------------|
| `nama` | `string` | ✅        | Nama kategori |

**Contoh Request**
```json
{
  "nama": "Pengumuman"
}
```

**Response `201 Created`**
```json
{
  "success": true,
  "message": "Kategori berhasil dibuat",
  "data": {
    "id": 1,
    "nama": "Pengumuman",
    "slug": "pengumuman",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Response Error**

| Status | Keterangan                                    |
|--------|-----------------------------------------------|
| `400`  | Field `nama` wajib diisi                      |
| `409`  | Kategori dengan nama/slug yang sama sudah ada |

---

### Update Kategori 🔒

```
PUT /api/kategori/:id
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameter**

| Parameter | Type  | Keterangan       |
|-----------|-------|------------------|
| `id`      | `int` | ID dari kategori |

**Request Body**

| Field  | Type     | Required | Keterangan         |
|--------|----------|----------|--------------------|
| `nama` | `string` | ✅        | Nama kategori baru |

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Kategori berhasil diupdate",
  "data": {
    "id": 1,
    "nama": "Info Sekolah",
    "slug": "info-sekolah",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-06-01T00:00:00.000Z"
  }
}
```

---

### Delete Kategori 🔒

```
DELETE /api/kategori/:id
```

**Headers**

```
Authorization: Bearer <token>
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Kategori berhasil dihapus"
}
```

---

## 📰 Berita

Base path: `/api/berita`

> **Catatan:** `slug` di-generate otomatis dari field `judul`. Berita yang dibuat langsung berstatus `published: true`.

### Get All Berita

Mengambil semua berita beserta data kategori dan penulis, diurutkan dari terbaru.

```
GET /api/berita
```

**Response `200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "judul": "Penerimaan Siswa Baru 2026",
      "slug": "penerimaan-siswa-baru-2026",
      "ringkasan": "Pendaftaran dibuka mulai 1 Juli 2026",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "isi": "<p>Konten berita...</p>",
      "published": true,
      "publishedAt": "2026-07-01T00:00:00.000Z",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z",
      "kategoriId": 1,
      "userId": 1,
      "kategori": {
        "id": 1,
        "nama": "Pengumuman",
        "slug": "pengumuman"
      },
      "user": {
        "id": 1,
        "nama": "Budi Santoso",
        "email": "budi@example.com"
      }
    }
  ]
}
```

---

### Get Berita by Slug

```
GET /api/berita/:slug
```

**Path Parameter**

| Parameter | Type     | Keterangan       |
|-----------|----------|------------------|
| `slug`    | `string` | Slug dari berita |

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Penerimaan Siswa Baru 2026",
    "slug": "penerimaan-siswa-baru-2026",
    "ringkasan": "Pendaftaran dibuka mulai 1 Juli 2026",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "isi": "<p>Konten berita...</p>",
    "published": true,
    "publishedAt": "2026-07-01T00:00:00.000Z",
    "kategori": { "id": 1, "nama": "Pengumuman", "slug": "pengumuman" },
    "user": { "id": 1, "nama": "Budi Santoso" }
  }
}
```

**Response Error**

| Status | Keterangan             |
|--------|------------------------|
| `404`  | Berita tidak ditemukan |

---

### Create Berita 🔒

```
POST /api/berita
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**

| Field        | Type     | Required | Keterangan                    |
|--------------|----------|----------|-------------------------------|
| `judul`      | `string` | ✅        | Judul berita                  |
| `isi`        | `string` | ✅        | Konten/isi berita (bisa HTML) |
| `kategoriId` | `int`    | ✅        | ID kategori                   |
| `ringkasan`  | `string` | ❌        | Ringkasan/excerpt berita      |
| `thumbnail`  | `string` | ❌        | URL gambar thumbnail          |

**Contoh Request**
```json
{
  "judul": "Penerimaan Siswa Baru 2026",
  "ringkasan": "Pendaftaran dibuka mulai 1 Juli 2026",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "isi": "<p>Konten lengkap berita di sini...</p>",
  "kategoriId": 1
}
```

**Response `201 Created`**
```json
{
  "success": true,
  "message": "Berita berhasil dibuat",
  "data": {
    "id": 1,
    "judul": "Penerimaan Siswa Baru 2026",
    "slug": "penerimaan-siswa-baru-2026",
    "ringkasan": "Pendaftaran dibuka mulai 1 Juli 2026",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "isi": "<p>Konten lengkap berita di sini...</p>",
    "published": true,
    "publishedAt": "2026-07-01T00:00:00.000Z",
    "kategoriId": 1,
    "userId": 1
  }
}
```

**Response Error**

| Status | Keterangan                              |
|--------|-----------------------------------------|
| `400`  | `judul`, `isi`, atau `kategoriId` kosong |

---

### Update Berita 🔒

```
PUT /api/berita/:id
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameter**

| Parameter | Type  | Keterangan     |
|-----------|-------|----------------|
| `id`      | `int` | ID dari berita |

**Request Body** (semua opsional)

| Field        | Type     | Required | Keterangan                    |
|--------------|----------|----------|-------------------------------|
| `judul`      | `string` | ❌        | Judul baru (slug auto-update) |
| `isi`        | `string` | ❌        | Isi berita baru               |
| `ringkasan`  | `string` | ❌        | Ringkasan baru                |
| `thumbnail`  | `string` | ❌        | URL thumbnail baru            |
| `kategoriId` | `int`    | ❌        | ID kategori baru              |

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Berita berhasil diupdate",
  "data": { ... }
}
```

---

### Delete Berita 🔒

```
DELETE /api/berita/:id
```

**Headers**

```
Authorization: Bearer <token>
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Berita berhasil dihapus"
}
```

---

## 👨‍🏫 Guru

Base path: `/api/guru`

> **Catatan:** Endpoint create & update menggunakan `multipart/form-data` karena mendukung upload foto.

### Get All Guru

Mengambil semua data guru, diurutkan A–Z berdasarkan nama.

```
GET /api/guru
```

**Response `200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Ahmad Fauzi",
      "foto": "https://be-wpm.vercel.app/uploads/foto-1234567890.jpg",
      "mapel": "Matematika",
      "biografi": "Guru berpengalaman selama 10 tahun",
      "tglLahir": "1985-05-20T00:00:00.000Z",
      "gender": "L",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Guru by ID

```
GET /api/guru/:id
```

**Path Parameter**

| Parameter | Type  | Keterangan   |
|-----------|-------|--------------|
| `id`      | `int` | ID dari guru |

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Ahmad Fauzi",
    "foto": "https://be-wpm.vercel.app/uploads/foto-1234567890.jpg",
    "mapel": "Matematika",
    "biografi": "Guru berpengalaman selama 10 tahun",
    "tglLahir": "1985-05-20T00:00:00.000Z",
    "gender": "L",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Response Error**

| Status | Keterangan           |
|--------|----------------------|
| `404`  | Guru tidak ditemukan |

---

### Create Guru 🔒

```
POST /api/guru
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Form Fields**

| Field      | Type     | Required | Keterangan                             |
|------------|----------|----------|----------------------------------------|
| `nama`     | `string` | ✅        | Nama lengkap guru                      |
| `mapel`    | `string` | ✅        | Mata pelajaran yang diampu             |
| `gender`   | `string` | ✅        | `"L"` (Laki-laki) / `"P"` (Perempuan) |
| `biografi` | `string` | ❌        | Biografi singkat                       |
| `tglLahir` | `string` | ❌        | Tanggal lahir format `YYYY-MM-DD`      |

**Response `201 Created`**
```json
{
  "success": true,
  "message": "Data guru berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Ahmad Fauzi",
    "foto": "https://be-wpm.vercel.app/uploads/foto-1234567890.jpg",
    "mapel": "Matematika",
    "biografi": "Guru berpengalaman selama 10 tahun",
    "tglLahir": "1985-05-20T00:00:00.000Z",
    "gender": "L",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Response Error**

| Status | Keterangan                                 |
|--------|--------------------------------------------|
| `400`  | `nama`, `mapel`, atau `gender` wajib diisi |

---

### Update Guru 🔒

```
PUT /api/guru/:id
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameter**

| Parameter | Type  | Keterangan   |
|-----------|-------|--------------|
| `id`      | `int` | ID dari guru |

**Form Fields** (semua opsional)

| Field        | Type     | Required | Keterangan                                              |
|--------------|----------|----------|---------------------------------------------------------|
| `nama`       | `string` | ❌        | Nama baru                                               |
| `mapel`      | `string` | ❌        | Mata pelajaran baru                                     |
| `gender`     | `string` | ❌        | `"L"` / `"P"`                                          |
| `biografi`   | `string` | ❌        | Biografi baru                                           |
| `tglLahir`   | `string` | ❌        | Tanggal lahir baru format `YYYY-MM-DD`                  |

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Data guru berhasil diperbarui",
  "data": { ... }
}
```

**Response Error**

| Status | Keterangan           |
|--------|----------------------|
| `404`  | Guru tidak ditemukan |

---

### Delete Guru 🔒

```
DELETE /api/guru/:id
```

**Headers**

```
Authorization: Bearer <token>
```

> File foto di disk akan otomatis dihapus.

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Data guru berhasil dihapus"
}
```

**Response Error**

| Status | Keterangan           |
|--------|----------------------|
| `404`  | Guru tidak ditemukan |

---

## 👷 Karyawan

Base path: `/api/karyawan`

> **Catatan:** Endpoint create & update menggunakan `multipart/form-data` karena mendukung upload foto.

### Get All Karyawan

Mengambil semua data karyawan, diurutkan A–Z berdasarkan nama.

```
GET /api/karyawan
```

**Response `200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Siti Rahayu",
      "foto": "https://be-wpm.vercel.app/uploads/foto-9876543210.jpg",
      "jabatan": "Staff Tata Usaha",
      "biografi": "Bekerja sejak tahun 2015",
      "tglLahir": "1990-03-15T00:00:00.000Z",
      "gender": "P",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Karyawan by ID

```
GET /api/karyawan/:id
```

**Path Parameter**

| Parameter | Type  | Keterangan        |
|-----------|-------|-------------------|
| `id`      | `int` | ID dari karyawan  |

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Siti Rahayu",
    "foto": "https://be-wpm.vercel.app/uploads/foto-9876543210.jpg",
    "jabatan": "Staff Tata Usaha",
    "biografi": "Bekerja sejak tahun 2015",
    "tglLahir": "1990-03-15T00:00:00.000Z",
    "gender": "P",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Response Error**

| Status | Keterangan               |
|--------|--------------------------|
| `404`  | Karyawan tidak ditemukan |

---

### Create Karyawan 🔒

```
POST /api/karyawan
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Form Fields**

| Field      | Type     | Required | Keterangan                             |
|------------|----------|----------|----------------------------------------|
| `nama`     | `string` | ✅        | Nama lengkap karyawan                  |
| `jabatan`  | `string` | ✅        | Jabatan/posisi karyawan                |
| `gender`   | `string` | ✅        | `"L"` (Laki-laki) / `"P"` (Perempuan) |
| `biografi` | `string` | ❌        | Biografi singkat                       |
| `tglLahir` | `string` | ❌        | Tanggal lahir format `YYYY-MM-DD`      |

**Response `201 Created`**
```json
{
  "success": true,
  "message": "Data karyawan berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Siti Rahayu",
    "foto": "https://be-wpm.vercel.app/uploads/foto-9876543210.jpg",
    "jabatan": "Staff Tata Usaha",
    "biografi": "Bekerja sejak tahun 2015",
    "tglLahir": "1990-03-15T00:00:00.000Z",
    "gender": "P",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Response Error**

| Status | Keterangan                                    |
|--------|-----------------------------------------------|
| `400`  | `nama`, `jabatan`, atau `gender` wajib diisi  |

---

### Update Karyawan 🔒

```
PUT /api/karyawan/:id
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameter**

| Parameter | Type  | Keterangan       |
|-----------|-------|------------------|
| `id`      | `int` | ID dari karyawan |

**Form Fields** (semua opsional)

| Field        | Type     | Required | Keterangan                                              |
|--------------|----------|----------|---------------------------------------------------------|
| `nama`       | `string` | ❌        | Nama baru                                               |
| `jabatan`    | `string` | ❌        | Jabatan baru                                            |
| `gender`     | `string` | ❌        | `"L"` / `"P"`                                          |
| `biografi`   | `string` | ❌        | Biografi baru                                           |
| `tglLahir`   | `string` | ❌        | Tanggal lahir baru format `YYYY-MM-DD`                  |

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Data karyawan berhasil diperbarui",
  "data": { ... }
}
```

---

### Delete Karyawan 🔒

```
DELETE /api/karyawan/:id
```

**Headers**

```
Authorization: Bearer <token>
```

> File foto di disk akan otomatis dihapus.

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Data karyawan berhasil dihapus"
}
```

**Response Error**

| Status | Keterangan               |
|--------|--------------------------|
| `404`  | Karyawan tidak ditemukan |

---

## 📤 Upload

Base path: `/api/upload`

> Semua endpoint upload memerlukan autentikasi. File disimpan di `public/uploads/` dan diakses via `/uploads/<filename>`.

### Upload Gambar 🔒

Mengupload satu file gambar.

```
POST /api/upload
```

**Headers**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Form Fields**

| Field   | Type   | Required | Keterangan                         |
|---------|--------|----------|------------------------------------|
| `image` | `file` | ✅        | File gambar (field name: `image`)  |

**Response `200 OK`**
```json
{
  "success": true,
  "url": "https://be-wpm.vercel.app/uploads/image-1720655400000.jpg"
}
```

---

### Delete Gambar 🔒

Menghapus file gambar dari server.

```
DELETE /api/upload/:filename
```

**Headers**

```
Authorization: Bearer <token>
```

**Path Parameter**

| Parameter  | Type     | Keterangan                   |
|------------|----------|------------------------------|
| `filename` | `string` | Nama file yang ingin dihapus |

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Gambar berhasil dihapus"
}
```

---

## 📐 Format Response

Semua response API menggunakan struktur JSON yang konsisten:

### Success Response
```json
{
  "success": true,
  "message": "Pesan sukses (opsional)",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Deskripsi error"
}
```

---

## ❌ Error Codes

| HTTP Status | Keterangan                                                   |
|-------------|--------------------------------------------------------------|
| `200`       | OK — Request berhasil                                        |
| `201`       | Created — Data berhasil dibuat                               |
| `400`       | Bad Request — Field wajib tidak diisi / data tidak valid     |
| `401`       | Unauthorized — Token tidak ada, tidak valid, atau kedaluwarsa |
| `404`       | Not Found — Data tidak ditemukan                             |
| `409`       | Conflict — Data duplikat (email/nama/slug sudah ada)         |
| `500`       | Internal Server Error — Terjadi kesalahan di sisi server     |

---

## 🔑 Cara Menggunakan Token

1. Login via `POST /api/auth/login` untuk mendapatkan token
2. Simpan token dari response field `token`
3. Tambahkan header berikut pada setiap request ke endpoint 🔒:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

> Token berlaku selama **2 hari** sejak dibuat.

---

## 🗄️ Database Schema

```
User          → id, nama, email, password, createdAt, updatedAt
              → relasi: hasMany Berita

Kategori      → id, nama, slug, createdAt, updatedAt
              → relasi: hasMany Berita

Berita        → id, judul, slug, ringkasan?, thumbnail?, isi,
                published, publishedAt?, kategoriId, userId,
                createdAt, updatedAt
              → relasi: belongsTo Kategori, belongsTo User

Guru          → id, nama, foto?, mapel, biografi?, tglLahir?,
                gender, createdAt, updatedAt

Karyawan      → id, nama, foto?, jabatan, biografi?, tglLahir?,
                gender, createdAt, updatedAt
```

---

*Dokumentasi ini di-generate berdasarkan source code proyek **be-wpm** versi `1.0.0`.*
