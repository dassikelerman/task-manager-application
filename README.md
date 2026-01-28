# 📋 Team Tasks - מערכת לניהול משימות בצוות

מערכת לניהול משימות בצוותים, בדומה ל-ClickUp, הבנויה ב-Angular 20. 
המערכת מאפשרת עבודה בצוותים, ניהול פרויקטים, וניהול משימות עם לוח קנבן.

![Angular](https://img.shields.io/badge/Angular-20-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 תכונות עיקריות

### ✨ ניהול משתמשים
- 🔐 **התחברות והרשמה** עם JWT Token
- 👤 **ניהול פרופיל משתמש**
- 🔒 **אבטחת נתונים** עם Authorization headers

### 👥 ניהול צוותים
- ➕ **יצירת צוותים חדשים**
- 👨‍💼 **הוספת חברים לצוות** לפי User ID
- 📊 **צפייה במספר חברים** בכל צוות
- 🔍 **רשימת צוותים** שהמשתמש חבר בהם

### 📁 ניהול פרויקטים
- 🆕 **יצירת פרויקטים** בתוך צוות
- 📝 **תיאור מפורט** לכל פרויקט
- 🗂️ **ארגון פרויקטים** לפי צוותים

### ✅ לוח משימות (Kanban Board)
- 📋 **3 עמודות**: לביצוע, בתהליך, הושלם
- ➕ **הוספת משימות** עם פרטים מלאים
- 🎨 **עדיפויות צבעוניות**: נמוכה, רגילה, גבוהה
- 📅 **תאריכי יעד** למשימות
- 🔄 **גרירת משימות** בין עמודות (Drag & Drop)
- 💬 **תגובות למשימות**
- 🗑️ **מחיקת משימות** עם אישור
- 👤 **הקצאת משימות** למשתמשים

---

## 🚀 התחלת עבודה

### דרישות מוקדמות

- **Node.js** (גרסה 18 ומעלה)
- **npm** (מגיע עם Node.js)
- **Angular CLI** (גרסה 20)

```bash
# התקנת Angular CLI
npm install -g @angular/cli@20
```

### 📥 התקנת הפרויקט

#### 1. שכפול הפרויקט

```bash
git clone https://github.com/your-username/team-tasks-angular.git
cd team-tasks-angular
```

#### 2. התקנת תלויות

```bash
npm install
```

#### 3. הגדרת השרת

הפרויקט עובד מול שרת Node.js. להורדת והפעלת השרת:

```bash
# שכפול השרת
git clone https://github.com/rivkamos/WolfTasksServer.git
cd WolfTasksServer

# התקנת תלויות
npm install

# הפעלת השרת
npm start
```

השרת יפעל על: `http://localhost:3000`

#### 4. הפעלת האפליקציה

```bash
# חזרה לתיקיית הפרויקט
cd ../team-tasks-angular

# הפעלה במצב development
ng serve

# או הפעלה עם פתיחה אוטומטית בדפדפן
ng serve --open
```

האפליקציה תהיה זמינה ב: `http://localhost:4200`

---

## 📂 מבנה הפרויקט

```
src/
├── app/
│   ├── components/           # קומפוננטות
│   │   ├── header/          # כותרת עליונה
│   │   ├── login/           # התחברות
│   │   ├── register/        # הרשמה
│   │   ├── teams/           # ניהול צוותים
│   │   ├── projects/        # ניהול פרויקטים
│   │   └── tasks/           # לוח משימות
│   ├── services/            # שירותים
│   │   ├── auth.ts          # שירות התחברות
│   │   ├── teams.service.ts # שירות צוותים
│   │   ├── projects.service.ts # שירות פרויקטים
│   │   ├── task.service.ts  # שירות משימות
│   │   └── base.service.ts  # שירות בסיס
│   ├── models/              # מודלים
│   │   ├── models.ts        # טיפוסים ראשיים
│   │   └── auth.model.ts    # טיפוסי אימות
│   ├── api.interceptor.ts   # Interceptor ל-JWT
│   ├── auth.guard.ts        # Guard לדפים מוגנים
│   ├── app.routes.ts        # ניתוב
│   └── app.config.ts        # הגדרות
├── styles.css               # סגנונות גלובליים
└── index.html
```

---

## 🔌 API Endpoints

### Authentication (לא מוגן)
- `POST /api/auth/register` - הרשמת משתמש חדש
- `POST /api/auth/login` - התחברות למערכת

### Teams (מוגן - דורש token)
- `GET /api/teams` - קבלת רשימת צוותים
- `POST /api/teams` - יצירת צוות חדש
- `POST /api/teams/:teamId/members` - הוספת חבר לצוות

### Projects (מוגן)
- `GET /api/projects` - קבלת רשימת פרויקטים
- `POST /api/projects` - יצירת פרויקט חדש

### Tasks (מוגן)
- `GET /api/tasks?projectId=:id` - קבלת משימות של פרויקט
- `POST /api/tasks` - יצירת משימה חדשה
- `PATCH /api/tasks/:id` - עדכון משימה
- `DELETE /api/tasks/:id` - מחיקת משימה

### Comments (מוגן)
- `GET /api/comments?taskId=:id` - קבלת תגובות של משימה
- `POST /api/comments` - הוספת תגובה חדשה

**הערה חשובה:** לכל קריאה מוגנת יש לשלוח:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🏗️ בנייה לפרודקשן

### בניית הפרויקט

```bash
ng build --configuration production
```

הקבצים ייווצרו בתיקייה: `dist/team-tasks-angular/browser/`

### בדיקת הבנייה מקומית

```bash
# התקנת http-server אם לא קיים
npm install -g http-server

# הפעלת השרת מתיקיית ה-build
cd dist/team-tasks-angular/browser
http-server -p 8080
```

גש ל: `http://localhost:8080`

---

## 🌐 העלאה ל-Render

### שלב 1: הכנת הפרויקט

1. **ודא ש-package.json מכיל:**

```json
{
  "scripts": {
    "build": "ng build --configuration production"
  }
}
```

2. **בדוק את נתיב ה-output:**

```bash
ng build --configuration production
```

בדוק היכן נמצא קובץ `index.html`. למשל: `dist/team-tasks-angular/browser/`

### שלב 2: העלאה ל-GitHub

```bash
# אתחול Git (אם עדיין לא בוצע)
git init

# הוספת כל הקבצים
git add .

# Commit ראשון
git commit -m "Initial commit"

# קישור למאגר GitHub (צור מאגר חדש ב-GitHub קודם)
git remote add origin https://github.com/your-username/team-tasks-angular.git

# העלאה ל-GitHub
git branch -M main
git push -u origin main
```

### שלב 3: יצירת Static Site ב-Render

1. **התחבר ל-[Render](https://render.com)**

2. **לחץ על "New" → "Static Site"**

3. **חבר את GitHub:**
   - בחר את המאגר: `team-tasks-angular`
   - תן הרשאה ל-Render לגשת למאגר

4. **הגדר את פרטי הבנייה:**
   - **Name**: `team-tasks-angular` (או כל שם אחר)
   - **Branch**: `main`
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: 
     ```
     dist/team-tasks-angular/browser
     ```
     (או הנתיב שמצאת בשלב 1)

5. **לחץ על "Create Static Site"**

6. **המתן לסיום הבנייה**
   - Render יבנה את הפרויקט אוטומטית
   - בסיום תקבל URL ייחודי: `https://your-app.onrender.com`

### שלב 4: עדכונים אוטומטיים

מעכשיו, כל `git push` ל-GitHub יפעיל בנייה והפצה אוטומטית ב-Render! 🎉

---

## 🎨 טכנולוגיות

### Frontend
- **Angular 20** - Framework ראשי
- **TypeScript 5.0** - שפת התכנות
- **RxJS** - ניהול אסינכרוניות
- **Angular Signals** - ניהול מצב מודרני
- **Angular Router** - ניתוב
- **HttpClient** - תקשורת עם השרת

### Backend (מסופק)
- **Node.js** - סביבת הרצה
- **Express** - Framework לשרת
- **SQLite** - בסיס נתונים
- **JWT** - אימות ואבטחה

---

## 🔐 אבטחה

- **JWT Authentication** - אימות מאובטח
- **HTTP Interceptor** - הוספת Token אוטומטית
- **Route Guards** - הגנה על דפים
- **Password Validation** - בדיקת חוזק סיסמה

---

## 📱 Responsive Design

האפליקציה מותאמת לכל המכשירים:
- 💻 Desktop (1024px+)
- 📱 Tablet (768px-1023px)
- 📱 Mobile (320px-767px)

---

## 🧪 הרצת בדיקות

```bash
# Unit Tests
ng test

# E2E Tests
ng e2e

# Code Coverage
ng test --code-coverage
```

---

## 📝 דוגמאות שימוש

### יצירת צוות חדש

```typescript
// teams.component.ts
addTeam(name: string) {
  this.teamsService.createTeam(name).subscribe({
    next: (newTeam) => {
      this.teams.update(prev => [...prev, newTeam]);
    }
  });
}
```

### הוספת משימה חדשה

```typescript
// tasks.component.ts
addTask() {
  const taskData: Task = {
    projectId: this.projectId(),
    title: 'משימה חדשה',
    status: 'todo',
    priority: 'normal'
  };
  
  this.tasksService.createTask(taskData).subscribe({
    next: (task) => {
      this.tasks.update(prev => [...prev, task]);
    }
  });
}
```

---

## 🐛 פתרון בעיות נפוצות

### השרת לא עובד
```bash
# בדוק שהשרת רץ על פורט 3000
curl http://localhost:3000/health

# אם לא עובד, הפעל מחדש
cd WolfTasksServer
npm start
```

### שגיאות CORS
ודא שהשרת מגדיר CORS נכון. בקובץ `server.js` של השרת:
```javascript
app.use(cors());
```

### Token לא עובד
- ודא שהתחברת למערכת
- בדוק ש-Token שמור ב-localStorage
- נסה להתנתק ולהתחבר שוב

---

## 👨‍💻 פיתוח נוסף

### הוספת קומפוננטה חדשה
```bash
ng generate component components/my-component
```

### הוספת שירות חדש
```bash
ng generate service services/my-service
```

### הוספת Guard
```bash
ng generate guard guards/my-guard
```

---

## 📄 רישיון

MIT License - ראה קובץ LICENSE לפרטים

---

## 🤝 תרומה לפרויקט

מוזמנים לתרום לפרויקט! 

1. עשה Fork לפרויקט
2. צור Branch חדש (`git checkout -b feature/amazing-feature`)
3. בצע Commit לשינויים (`git commit -m 'Add amazing feature'`)
4. עשה Push ל-Branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

---

## 📧 יצירת קשר

לשאלות או בעיות, פנה ל:
- **Email**: dassikelerman@example.com

---

## 🎓 למידה נוספת

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)
- [Render Documentation](https://render.com/docs)

---

**נבנה עם ❤️ ב-Angular 20**
