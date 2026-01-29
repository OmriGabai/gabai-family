# PRD: אתר משפחת גבאי

## מידע כללי
| פרט | ערך |
|-----|-----|
| שם הפרויקט | אתר משפחת גבאי |
| דומיין | gabai.family (או דומה) |
| קהל יעד | משפחה וחברים |

---

## מבנה האתר - 4 אתרים משנה

| נתיב | שם | בעלים | סטטוס |
|------|-----|-------|-------|
| `/gili` | העולם המופלא של גילי | גילי (בת 7) | 🚧 מתחילים עכשיו |
| `/ron` | TBD | רון | ⏳ בהמשך |
| `/yana` | TBD | יאנה | ⏳ בהמשך |
| `/omri` | TBD | עומרי | ⏳ בהמשך |

### דף הבית הראשי (`/`)
- [ ] דף נחיתה משפחתי עם קישורים ל-4 האתרים
- [ ] עיצוב משפחתי משותף

---

## מטרות הפרויקט
- [ ] אתר אישי לכל אחד מבני המשפחה
- [ ] ממשק פשוט להעלאת תוכן
- [ ] אינטראקציה עם מבקרים (לייקים, שיתוף)
- [ ] עיצוב ייחודי לכל בן משפחה

---

# גילי - העולם המופלא של גילי

---

## Stack טכנולוגי

### Framework
- [ ] Next.js 14 (App Router)
- [ ] TypeScript
- [ ] Tailwind CSS

### תשתיות
- [ ] **Database**: Vercel Postgres
- [ ] **Image Storage**: Vercel Blob (רזולוציה מופחתת)
- [ ] **Hosting**: Vercel
- [ ] **Repo**: GitHub - gabai-family

### אימות
- [ ] סיסמא פשוטה ב-environment variable
- [ ] Session cookie לאדמין

---

## תכונות (Features)

### דף הבית (ציבורי)
- [ ] רשימת פוסטים (חדש ראשון)
- [ ] כרטיס פוסט: כותרת, תמונה, תוכן מקוצר, תאריך
- [ ] כפתור לייק (פעם אחת למבקר)
- [ ] כפתור שיתוף

### אזור אדמין
- [ ] דף login עם סיסמא
- [ ] יצירת פוסט חדש
  - [ ] כותרת
  - [ ] תוכן (textarea)
  - [ ] העלאת תמונה
- [ ] עריכת פוסט קיים
- [ ] מחיקת פוסט

### לייקים
- [ ] מזהה מבקר ב-localStorage
- [ ] מגבלה: לייק אחד לפוסט למבקר
- [ ] אנימציית לב

### שיתוף
- [ ] Web Share API (מובייל)
- [ ] העתקת קישור (דסקטופ)

---

## עיצוב

### סגנון
- [ ] קשתות
- [ ] פרפרים
- [ ] צבעוני ועליז

### צבעים
- [ ] ורוד
- [ ] סגול
- [ ] תכלת
- [ ] צהוב
- [ ] ירוק

### אלמנטים
- [ ] גרדיאנט קשת ברקע
- [ ] פרפרים מונפשים
- [ ] כוכבים/עננים
- [ ] כפתורים מעוגלים

### פונט
- [ ] Rubik (עברית)
- [ ] עגול וידידותי

### Responsive
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] RTL מלא

---

## מודל נתונים

### טבלת family_members
```sql
CREATE TABLE family_members (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,  -- 'gili', 'ron', 'yana', 'omri'
  name VARCHAR(100) NOT NULL,
  site_title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### טבלת posts
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES family_members(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### טבלת likes
```sql
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  visitor_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, visitor_id)
);
```

---

## מבנה תיקיות
```
gabai-family/
├── src/
│   ├── app/
│   │   ├── page.tsx              # דף נחיתה משפחתי
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css
│   │   │
│   │   ├── gili/                 # 🚧 אתר גילי
│   │   │   ├── page.tsx          # דף הבית של גילי
│   │   │   ├── layout.tsx        # Layout ייחודי לגילי
│   │   │   ├── admin/            # אזור אדמין
│   │   │   └── [postId]/         # דף פוסט בודד
│   │   │
│   │   ├── ron/                  # ⏳ אתר רון (בהמשך)
│   │   ├── yana/                 # ⏳ אתר יאנה (בהמשך)
│   │   ├── omri/                 # ⏳ אתר עומרי (בהמשך)
│   │   │
│   │   └── api/                  # API Routes משותף
│   │       ├── posts/
│   │       ├── like/
│   │       └── upload/
│   │
│   ├── components/
│   │   ├── shared/               # קומפוננטות משותפות
│   │   └── gili/                 # קומפוננטות ייחודיות לגילי
│   │
│   └── lib/                      # Utilities משותפים
│
├── public/
│   └── images/
├── .gitignore
├── PRD.md
├── package.json
└── README.md
```

---

## Environment Variables
```env
# אימות - אפשרות 1: סיסמא משותפת
ADMIN_PASSWORD=          # סיסמת אדמין לכל האתרים

# אימות - אפשרות 2: סיסמא לכל משתמש (בהמשך)
# ADMIN_PASSWORD_GILI=
# ADMIN_PASSWORD_RON=
# ADMIN_PASSWORD_YANA=
# ADMIN_PASSWORD_OMRI=

# Database
POSTGRES_URL=            # auto from Vercel

# Storage
BLOB_READ_WRITE_TOKEN=   # auto from Vercel
```

---

## שלבי ביצוע

### שלב 1: Setup
- [ ] אתחול Next.js
- [ ] הגדרת Tailwind
- [ ] Git init
- [ ] Push to GitHub

### שלב 2: Database
- [ ] יצירת Vercel Postgres
- [ ] יצירת טבלאות
- [ ] DB client

### שלב 3: API
- [ ] CRUD posts
- [ ] Like endpoint
- [ ] Upload endpoint

### שלב 4: Public Pages
- [ ] Layout + Header
- [ ] Home page
- [ ] Post components

### שלב 5: Admin
- [ ] Login page
- [ ] Posts management
- [ ] Post editor

### שלב 6: Polish
- [ ] אנימציות
- [ ] Responsive
- [ ] RTL

### שלב 7: Deploy
- [ ] Vercel setup
- [ ] Env vars
- [ ] Domain (optional)

---

## הערות נוספות
<!-- הוסיפו כאן הערות או שינויים שתרצו -->


