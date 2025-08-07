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

<details> <summary>✅ Versiune corectă (copiază așa cum e):</summary>
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
</details>


## 🔐 Funcționalități MVP

| Domeniu     | Funcții                                                      |
|-------------|--------------------------------------------------------------|
| **Auth**    | - Register, Login (JWT Access & Refresh) <br> - Logout       |
| **User**    | - Get profile                                                |
| **Product** | - Add product (admin) <br> - Get all <br> - Get one <br> - Delete (admin) |
| **Cart**    | - Add/remove products <br> - View cart (in memorie sau DB)   |
| **Order**   | - Create order with shipping info (fără plată reală)         |

---



