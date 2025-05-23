# 📌  FutureBlink

A backend API built using **Node.js**, **Express**, **MongoDB**, and **TypeScript**, with schema validation powered by **Zod**. This is a application for creating sequence for your email marketing also helps you to  schedule and automate them

---

## 🧰 Tech Stack

### Backend
- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **TypeScript** – Static typing
- **Zod** – Runtime schema validation
- **Docker** – Containerized development

### Frontend 
- [***React.js***](https://vite.dev/guide/)
- [**Tailwind**](https://tailwindcss.com/docs/installation/using-vite) - For styling
- [**React flow**](https://reactflow.dev/learn) - For Sequence Editor
- [**papa parse**](http://papaparse.com/docs) - For parsing CSV data
---

### **Clone the repo**

```bash
git clone https://github.com/fkk989/future-blink.git
cd future-blink
```

## ⚙️ Setup Instructions

### smtp server setup

- go to https://myaccount.google.com/apppasswords
- create a app password, copy the password and update `SMTP_USER=your-email` `SMTP_PASS=the password you have created right now` ( make sure you create the password with the same email that you puttin here as SMTP_USER)

### ✅ With Docker ( Recomended )

1. **Install Docker**:
   - [Docker for macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
   - [Docker for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)



3. **Start Docker daemon** and run:

   ```bash
   docker compose up -d
   ```

### ✅ Without Docker
#### db setup 
- You can run a data base locally or get it from a Mondog DB provider but here you will need you change the value of `DATABASE_URL` in .env. you can get it from [**Supabase**](https://supabase.com/)

- You will also need a redis either locally or from a provider, here also you will need to change these value `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_USERNAME` in .env file. you can get it from [**Redis**](https://redis.io/)

### backend setup

#### copy enviroment varialbes from .env.example file

```bash
cp .env.example .env
```

- note: if you are not using docker you will need to modify `.env` as mentioned above in the pre requisite

#### Install dependencies

```bash
npm install
```

#### To start the server in dev mode

```bash
npm run dev
```

#### To start the server in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run start
```

## 📘 API Endpoints

- Base Backend Url https://future-blink.onrender.com
  > 🔐 All protected routes require a Bearer token in the Authorization header:  
  > `Authorization: Bearer <your-token>`
- Please wait for 50 seconds if response take time
- Health check endpoint `https://future-blink.onrender.com/health`

### 👤 Auth Routes

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ---------------   | ------------- |
| POST   | `/api/auth/signup` | Register a user   | ❌            |
| POST   | `/api/send-otp`    | Sends Otp to user | ❌            | 
| POST   | `/api/verify-email`| Verify user email | ❌            | 
| POST   | `/api/auth/login`  | Log in a user     | ❌            |
| GET    | `/api/auth`        | Get user info     | ✅            |

#### 📥 Input Body for auth Routes

**_SignUp Input_**

```json
{
  "name": "your name",
  "email": "your email",
  "password": "password"
}
```
**_OTP Input_**

```json
{
  "name":"yor name",
  "email":"your@gmail.com"
}
```
**_Veriy Email Input_**

```json
{
  "email":"your@gmail.com",
  "otp": "429290"
}
```

**_LogIn Input_**
```json
{
  "email": "your email",
  "password": "password"
}
```

---

### 🧾 Email Template Routes

| Method | Endpoint                    | Description             | Auth Required |
| ------ | -------------------------   | ----------------------- | ------------- |
| GET    | `/api/email-template`       | Get all template        | ✅            |
| GET    | `/api/email-template/:id`   | Get all template byid   | ✅            |
| POST   | `/api/email-template`       | Create a new template   | ✅            |
| POST    | `/api/email-template/:id`   | Update a template       | ✅            |
| DELETE | `/api/email-template/:id`   | Delete a template       | ✅            |

**_Email Template Input_**

- same Input is used for Email Template creation and updation ( all fields are optional when updating Email Template )

```json
{
    "name":"Test email template", // REQUIRED
    "subject":"Test Email subject", // OPTIONAL
    "html":"<div>Test Email </div>" // OPTIONAL
    "isCompanyTemplate":false // OPTIONAL ( Default false )
}
```
---

### 🧾 Lead List Routes

| Method | Endpoint          | Description          | Auth Required |
| ------ | ----------------- | ---------------------| ------------- |
| GET    | `/api/lead`       | Get all list         | ✅            |
| GET    | `/api/lead/:id`   | Get all list by id   | ✅            |
| POST   | `/api/lead`       | Create a list        | ✅            |
| POST   | `/api/lead/:id`   | Update a list data   | ✅            |
| DELETE | `/api/lead/:id`   | Delete a list        | ✅            |

**_List Input_**

- Creat list input

```json
{
    "name":"sales list"
}
```
- updateing list data

```json
{
  "data":[
    {
      "name":"faisal dev",
      "email":"faisaldev989@gmail.com"
      //    can add more properties
    }
      // can add more data
  ]
}
```
---

### 🧾 Sequence Routes

| Method | Endpoint          | Description                 | Auth Required |
| ------ | ----------------- | --------------------------- | ------------- |
| GET    | `/api/sequence`       | Get all sequences       | ✅            |
| GET    | `/api/sequence/:id`   | Get all sequence by id  | ✅            |
| POST   | `/api/sequence`       | Create a sequence       | ✅            |
| POST   | `/api/sequence/:id`   | Update a sequence data  | ✅            |
| DELETE | `/api/sequence/:id`   | Delete a sequence       | ✅            |

**_List Input_**

- Creat sequence input

```json
{
    "name":"my custom sequence"
}
```
- updateing sequence data

```json
{ 
    "scheduledAt":"2025-04-06T06:35:16.321Z",
    "leadsList":["67f2072ef2233264d493ddc3", "67f218cc3e0aba8216ca03eb"],
    "nodes":[
        {
            "type": "EMAIL", 
            "order": 0 , 
            "emailTemplate": "67f179910f48a8d97b4b8951"
        },
        {
          "type": "DELAY",
          "delayTimeInMilleseconds": 300000 // 5 MINUTES
        }
        // CAN ADD MORE NODES OF TYPE EMAIL OR DELAY
    ]
}
```
---

### frontend

#### go to frontend directory by running this command in root directory

```bash
 cd frontend
```

#### Install dependencies

```bash
npm install
```

#### To start the frontend in dev mode

```bash
npm run dev
```

#### To start the frontend in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run preview
```
