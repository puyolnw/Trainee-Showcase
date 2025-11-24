# HREx Talent: Performance Management Module - TODO List

## วิเคราะห์จาก PRD

### ภาพรวมระบบ
- ระบบประเมินผลแบบ Enterprise-Grade
- รองรับ 360 Feedback, Fact-Based Evaluation, และ Calibration
- เชื่อมต่อกับ HREx Time Service สำหรับข้อมูล Attendance

### Database Schema (14 Tables)
1. **Group 1: Configuration** - PERF_CYCLE, PERF_RATING_SCALE, PERF_FORM_TEMPLATE, PERF_FORM_SECTION, PERF_COMPETENCY_LIB
2. **Group 2: Transactional Review** - PERF_REVIEW, PERF_REVIEW_PARTICIPANT, PERF_ITEM, PERF_ITEM_RATING
3. **Group 3: Continuous Development** - PERF_CHECK_IN, PERF_IDP
4. **Group 4: Governance & Audit** - PERF_CALIBRATION_SESSION, PERF_CALIBRATION_ADJ, PERF_AUDIT_LOG

### Core Features
1. **Phase 1: Goal Setting** - Employee สร้าง KPIs, Manager อนุมัติ
2. **Phase 2: 360 & Self-Assessment** - Nomination peers, Scoring
3. **Phase 3: Manager Evaluation** - Integration กับ Time Service แสดง Attendance Stats
4. **Phase 4: Calibration & Closure** - HR ปรับเกรด, Finalize

---

## TODO: การแก้ไขระบบ Frontend

### Phase 1: การลบและปรับโครงสร้างพื้นฐาน

#### 1.1 ลบ Sidebar Menu เดิมทั้งหมด
- [ ] ลบ `src/components/SidebarHR.tsx`
- [ ] ลบ `src/components/SidebarFund.tsx`
- [ ] ลบ `src/components/SidebarReports.tsx`
- [ ] ลบ `src/components/SystemSwitcherModal.tsx` (หรือแก้ไขใหม่)

#### 1.2 เปลี่ยนชื่อระบบเป็น "hrex"
- [ ] แก้ไข `index.html` - เปลี่ยน title จาก "Smart PTT System" เป็น "HREx"
- [ ] แก้ไข `src/layouts/LayoutAuth.tsx` - เปลี่ยน "Smart PTT System" เป็น "HREx"
- [ ] แก้ไข branding text ทั้งหมดในระบบ

#### 1.3 ปรับ Navbar Menu
- [ ] แก้ไข `src/components/Navbar.tsx`
  - ลบ modules เดิม (HR, Fund, Reports)
  - เพิ่ม modules ใหม่: Talent (ใช้งานได้), Core (แสดงแต่ไม่ใช้งาน), Time (แสดงแต่ไม่ใช้งาน)
  - Talent เป็น main module ที่ใช้งานได้
  - Core และ Time แสดงใน navbar แต่ยังไม่ใช้งาน (สำหรับอนาคต)

#### 1.4 สร้าง Sidebar ใหม่สำหรับ Talent (Employee Role)
- [ ] สร้าง `src/components/SidebarTalent.tsx`
  - Menu สำหรับ Employee:
    - Dashboard (My Performance)
    - Goal Setting (Goal Editor)
    - Self-Assessment
    - 360 Feedback Request
    - Check-ins (1-on-1 Notes)
    - IDP (Individual Development Plan)
  - ไม่มี System Switcher Modal
  - ใช้ชื่อระบบ "HREx Talent"

#### 1.5 สร้าง Sidebar สำหรับ Core/Time (Manager & HR Role)
- [ ] สร้าง `src/components/SidebarCoreTime.tsx`
  - Menu สำหรับ Manager/HR:
    - Dashboard
    - Team Performance
    - Evaluation Forms
    - Calibration (HR only)
    - Reports
  - ใช้ชื่อระบบ "HREx Talent" (แต่แสดง role เป็น Manager/HR)
  - ไม่มี System Switcher Modal

#### 1.6 สร้าง Layout ใหม่
- [ ] สร้าง `src/layouts/LayoutTalent.tsx` - สำหรับ Talent module (Employee)
- [ ] สร้าง `src/layouts/LayoutCoreTime.tsx` - สำหรับ Core/Time modules (Manager/HR)
- [ ] ลบหรือเก็บ `src/layouts/LayoutHR.tsx`, `LayoutFund.tsx`, `LayoutReports.tsx` ไว้ (หรือลบทิ้ง)

### Phase 2: Routing และ Navigation

#### 2.1 ปรับ Routing ใน main.tsx
- [ ] ลบ routes เดิมทั้งหมด (HR, Fund, Reports)
- [ ] สร้าง routes ใหม่:
  - `/app/talent` - Talent module (Employee)
  - `/app/core` - Core module (Manager/HR) - placeholder
  - `/app/time` - Time module (Manager/HR) - placeholder
- [ ] Default redirect ไปที่ `/app/talent`

#### 2.2 สร้าง Pages ใหม่สำหรับ Talent
- [ ] สร้าง `src/pages/talent/Dashboard.tsx` - My Performance Dashboard
- [ ] สร้าง `src/pages/talent/GoalSetting.tsx` - Goal Editor (KPIs)
- [ ] สร้าง `src/pages/talent/SelfAssessment.tsx` - Self-Assessment Form
- [ ] สร้าง `src/pages/talent/FeedbackRequest.tsx` - 360 Feedback Request
- [ ] สร้าง `src/pages/talent/CheckIns.tsx` - 1-on-1 Notes
- [ ] สร้าง `src/pages/talent/IDP.tsx` - Individual Development Plan

#### 2.3 สร้าง Pages สำหรับ Manager/HR
- [ ] สร้าง `src/pages/core/Dashboard.tsx` - Team Dashboard (Manager)
- [ ] สร้าง `src/pages/core/EvaluationForm.tsx` - Manager Scoring Form (with Time Integration)
- [ ] สร้าง `src/pages/core/Calibration.tsx` - Calibration Board (HR only)
- [ ] สร้าง `src/pages/time/Dashboard.tsx` - Time Dashboard (placeholder)

### Phase 3: Integration กับ HREx Time Service

#### 3.1 สร้าง API Service
- [ ] สร้าง `src/lib/api/talent.ts` - Talent API calls
- [ ] สร้าง `src/lib/api/time.ts` - Time Service integration
  - `getAttendanceSummary(employeeId)` - GET /timesheets/summary?employee_id=...

#### 3.2 สร้าง Attendance Widget Component
- [ ] สร้าง `src/components/AttendanceWidget.tsx`
  - แสดง Total Late Arrivals (YTD)
  - แสดง Total Absent Days (YTD)
  - แสดง Total Sick Leave Used
  - ใช้ใน Manager Evaluation Form

### Phase 4: UI Components สำหรับ Performance Management

#### 4.1 Goal Setting Components
- [ ] สร้าง `src/components/talent/GoalEditor.tsx` - Dynamic table สำหรับ KPIs
  - Add/Edit/Delete KPIs
  - Weight validation (Total = 100%)
  - Target และ Actual Result fields

#### 4.2 Evaluation Components
- [ ] สร้าง `src/components/talent/EvaluationForm.tsx` - Split View Form
  - Left: Employee Self-Rating & Comments
  - Right: Manager Input
  - Top: Attendance Stats Widget

#### 4.3 360 Feedback Components
- [ ] สร้าง `src/components/talent/PeerNomination.tsx` - UI สำหรับค้นหาและขอ feedback จาก peers
- [ ] สร้าง `src/components/talent/FeedbackForm.tsx` - Form สำหรับ peers ให้คะแนน

#### 4.4 Calibration Components (HR)
- [ ] สร้าง `src/components/core/CalibrationBoard.tsx`
  - Scatter Plot หรือ Table view
  - แสดง distribution ของ grades (Bell Curve)
  - Drag-and-drop grade adjustment

### Phase 5: ลบส่วนเก่าที่ไม่ใช้

#### 5.1 ลบ Pages เก่า
- [ ] ลบ `src/pages/hr/*` ทั้งหมด (หรือเก็บไว้เป็น reference)
- [ ] ลบ `src/pages/fund/*` ทั้งหมด
- [ ] ลบ `src/pages/reports/*` ทั้งหมด

#### 5.2 ลบ Components ที่ไม่ใช้
- [ ] ตรวจสอบและลบ components ที่ไม่เกี่ยวข้องกับ Talent

#### 5.3 Cleanup
- [ ] อัปเดต imports ใน main.tsx
- [ ] ตรวจสอบและลบ unused dependencies
- [ ] อัปเดต TypeScript types ถ้าจำเป็น

### Phase 6: Role-Based Access Control

#### 6.1 สร้าง Auth Context/Hook
- [ ] สร้าง `src/lib/auth/roles.ts` - Role definitions (Employee, Manager, HR)
- [ ] สร้าง `src/hooks/useRole.ts` - Hook สำหรับตรวจสอบ role
- [ ] ปรับ `src/lib/auth.ts` ให้รองรับ roles

#### 6.2 Implement Role-Based UI
- [ ] ใน Talent module: แสดง UI สำหรับ Employee เท่านั้น
- [ ] ใน Core/Time modules: แสดง UI สำหรับ Manager และ HR
- [ ] Conditional rendering ตาม role

### Phase 7: Testing & Polish

#### 7.1 Testing
- [ ] ทดสอบ navigation ระหว่าง modules
- [ ] ทดสอบ role-based access
- [ ] ทดสอบ responsive design

#### 7.2 Polish
- [ ] ตรวจสอบ UI/UX consistency
- [ ] ตรวจสอบ loading states
- [ ] ตรวจสอบ error handling

---

## Sprint 1 Focus (ตาม PRD)

### Days 1-2: Foundations
- Setup Database (Tables 1-6)
- Implement API connection to HREx Time
- Define Rating Scales

### Days 3-5: Goal Setting
- Build "Goal Editor" UI
- Implement "Approve Goal" workflow
- Tables 8 (Items) usage

### Days 6-8: Review Core
- Build the Manager Scoring Form
- Integrate Time Data Widget into the form
- Calculate weighted scores

### Days 9-10: Polish
- Dashboard UI
- Role-based permissions
- Demo

---

## Notes
- ระบบเดิมเป็น Multi-module (HR, Fund, Reports)
- ต้องแปลงเป็น Single-module (Talent) แต่ยังแสดง Core และ Time ใน navbar
- Core และ Time เป็น placeholder สำหรับอนาคต
- Talent module ต้องรองรับ Employee, Manager, และ HR roles

