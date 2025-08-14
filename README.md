# 🧠 Amazon Clone – Backend API

Backend-ul pentru un e-commerce de tip Amazon, construit cu **Express.js** și arhitectură curată (Clean Architecture). Expune o API RESTful pentru autentificare, produse, coș și plasarea comenzilor.

---

## ⚙️ Stack Tehnologic

- **Server:** Express.js
- **Database:** MongoDB + Mongoose
- **Architecture:** Clean Architecture (domain, use-cases, adapters, infrastructure)
- **Auth:** JWT (access + refresh tokens)
- **Validation:** Zod
- **Env:** dotenv
- **CORS / Logger:** cors, morgan
- **Utils:** bcrypt, jsonwebtoken, multer (pentru upload imagini), nodemailer (dacă e nevoie)

---

## 📁 Structură Clean Architecture

```text
/backend
├── src
│   ├── domain
│   │   ├── entities         → entități pure (Product, User, Order)
│   │   └── interfaces       → interfețe (IUserRepo, IProductRepo)
│   ├── use-cases
│   │   ├── product          → business logic pentru produse
│   │   └── user             → business logic pentru useri
│   ├── infrastructure
│   │   ├── db               → conexiune MongoDB, modele Mongoose
│   │   └── email            → nodemailer utils (opțional)
│   ├── adapters
│   │   ├── controllers      → Express route logic
│   │   ├── routes           → definirea endpointurilor
│   │   └── middlewares      → autentificare, validare, erori
│   ├── config               → variabile de mediu, constante
│   └── server.ts            → inițializare server Express
├── .env
├── .env.example
├── package.json
```

---

## 🔐 Funcționalități MVP

| Domeniu     | Funcții                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| **Auth**    | - Register, Login (JWT Access & Refresh) <br> - Logout                    |
| **User**    | - Get profile                                                             |
| **Product** | - Add product (admin) <br> - Get all <br> - Get one <br> - Delete (admin) |
| **Cart**    | - Add/remove products <br> - View cart (in memorie sau DB)                |
| **Order**   | - Create order with shipping info (fără plată reală)                      |

---

## 🛠️ Setup & Run

### 1. Instalează dependințele

```bash
cd backend
npm install
```

### 2. Creează fișierul `.env`

```env
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 3. Pornește serverul

```bash
npm run dev
```

---

## 📦 Endpointuri API (MVP)

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh

GET    /api/products
GET    /api/products/:id
POST   /api/products           (admin only)
DELETE /api/products/:id       (admin only)

POST   /api/cart
GET    /api/cart

POST   /api/orders
```

---

## 🧩 Librării cheie

| Scop           | Pachet                  |
| -------------- | ----------------------- |
| Routing        | `express`               |
| DB ODM         | `mongoose`              |
| Validare       | `zod`                   |
| JWT            | `jsonwebtoken`          |
| Hashing parole | `bcryptjs`              |
| Logger         | `morgan`                |
| CORS           | `cors`                  |
| Upload imagini | `multer` (opțional)     |
| Email          | `nodemailer` (opțional) |
| Error handling | middleware custom       |

---

## ✅ Good Practices

- Logică separată clar: controller vs use-case vs entitate
- Validare la marginea sistemului (`zod` în route handler)
- Date pure în `domain`, fără logică infrastructurală
- Niciun `console.log` în producție → folosește `morgan`

---

## 📌 Ce urmează?

> MVP-ul trebuie să funcționeze complet cu frontend-ul, fără plată reală, fără favorite, fără filtrare.

Funcționalitățile complexe (ex: plată cu Stripe, categorii, filtre, istoricul comenzilor) pot fi adăugate **după lansarea MVP-ului**.

---

## 📜 Licență

MIT – folosește, modifică și construiește liber.

---

## 👨‍💻 Autor

Creat cu disciplină și simplitate de [alcrro](https://github.com/alcrro)

