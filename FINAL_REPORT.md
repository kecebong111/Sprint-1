# Laporan Akhir: School Nutrition Vault (Student Side Inventory)

## 1. Pendahuluan
Sistem ini dirancang untuk memantau stok nutrisi (susu dan suplemen) di UKS sekolah guna mendukung program Makan Bergizi Gratis (MBG). Fitur utama meliputi pengelolaan inventaris, pencatatan transaksi barang masuk/keluar, dan sistem peringatan stok kritis.

## 2. Entity Relationship Diagram (ERD)

Berikut adalah struktur basis data yang digunakan:

```mermaid
erDiagram
    ITEM ||--o{ TRANSACTION : "has"
    ITEM {
        int id PK
        string name "Unique"
        string category "Milk, Supplement, etc"
        float quantity "Current Stock"
        string unit "pcs, bottles, cans"
        float criticalThreshold "Alert Level"
        datetime createdAt
        datetime updatedAt
    }
    TRANSACTION {
        int id PK
        int itemId FK
        enum type "IN, OUT"
        float amount
        string reason
        datetime createdAt
    }
```

**Penjelasan Relasi:**
- **Item (1) ke Transaction (N):** Satu item barang dapat memiliki banyak riwayat transaksi (masuk atau keluar).
- **Stok Otomatis:** Setiap kali transaksi dibuat, kolom `quantity` pada tabel `Item` akan diperbarui secara otomatis melalui Prisma Transaction.

## 3. Hasil Pengujian Endpoint (Postman)

*Silakan tempelkan screenshot Postman Anda di bawah setiap poin berikut:*

### A. Create New Item (POST `/api/inventory`)
*Digunakan untuk menambahkan stok baru ke sistem.*
> **Screenshot Placeholder:**
> ![Screenshot Postman Create Item](https://via.placeholder.com/800x400?text=Screenshot+POST+Create+Item)

### B. Get Inventory Summary (GET `/api/inventory/summary`)
*Menampilkan dashboard ringkas: total barang, jumlah peringatan stok rendah, dan transaksi terakhir.*
> **Screenshot Placeholder:**
> ![Screenshot Postman Summary](https://via.placeholder.com/800x400?text=Screenshot+GET+Summary)

### C. Add Stock Transaction (POST `/api/inventory/:id/transaction`)
*Mencatat barang keluar (misal: susu dibagikan ke siswa) atau barang masuk.*
> **Screenshot Placeholder:**
> ![Screenshot Postman Transaction](https://via.placeholder.com/800x400?text=Screenshot+POST+Transaction)

### D. Low Stock Alerts (GET `/api/inventory/alerts`)
*Menampilkan daftar barang yang sudah mencapai batas kritis agar segera dipesan ulang.*
> **Screenshot Placeholder:**
> ![Screenshot Postman Alerts](https://via.placeholder.com/800x400?text=Screenshot+GET+Alerts)

## 4. Kesimpulan
Sistem berhasil diimplementasikan dengan Clean Code, validasi data menggunakan Zod, dan dokumentasi API yang lengkap via Swagger. Kontainerisasi dengan Docker memastikan sistem dapat dijalankan di lingkungan mana pun dengan konsisten.
