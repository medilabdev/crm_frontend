// Data Structure untuk Weekly Planning System

// 1. MAIN FORM DATA STRUCTURE
const weeklyPlanningData = {
    marketing_name: "ayu",           // User yang buat planning
    branch: "cempaka_putih",         // Cabang tempat kerja
    month: "2025-04-01",             // Bulan planning (ISO date)
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-01T00:00:00Z",
    status: "draft",                 // draft, submitted, approved
    
    weeks: [
        {
            weekNumber: 1,
            startDate: "2025-04-01",     // Senin
            endDate: "2025-04-04",       // Jumat
            
            days: [
                {
                    date: "2025-04-01",
                    dayName: "Senin",
                    activities: [
                        {
                            id: "act_001",
                            activity_type: "customer_visit",    // customer_visit, phone_call, presentation, follow_up, meeting, others
                            customer_name: "PT ABC Indonesia",
                            planned_time: "09:00",              // Format HH:mm
                            notes: "Presentasi produk baru",
                            status: "planned",                  // planned, completed, cancelled, rescheduled
                            
                            // Fields untuk actual execution (nanti diisi saat reporting)
                            actual_time: null,
                            actual_notes: null,
                            completed_at: null,
                            execution_status: null              // on_time, late, early, not_executed
                        }
                    ]
                },
                {
                    date: "2025-04-02",
                    dayName: "Selasa", 
                    activities: []
                }
                // ... dst untuk Rabu-Jumat
            ]
        },
        {
            weekNumber: 2,
            startDate: "2025-04-07",
            endDate: "2025-04-11",
            days: [
                // Similar structure
            ]
        }
        // ... up to week 6
    ]
};

// 2. ACTIVITY TYPES REFERENCE
const activityTypes = [
    {
        value: "customer_visit",
        label: "Customer Visit",
        category: "field_work",
        weight: 1.0                      // Untuk perhitungan performance nanti
    },
    {
        value: "phone_call", 
        label: "Phone Call",
        category: "communication",
        weight: 0.5
    },
    {
        value: "presentation",
        label: "Presentation", 
        category: "sales_activity",
        weight: 1.5
    },
    {
        value: "follow_up",
        label: "Follow Up",
        category: "communication", 
        weight: 0.7
    },
    {
        value: "meeting",
        label: "Meeting",
        category: "collaboration",
        weight: 1.0
    },
    {
        value: "others",
        label: "Others",
        category: "miscellaneous",
        weight: 0.3
    }
];

// 3. CUSTOMER CATEGORIZATION (untuk metrics calculation)
const customerCategories = {
    "assurance": ["PT Asuransi ABC", "PT Prudential", "PT Allianz"],
    "company": ["PT Pertamina", "PT PLN", "PT Telkom"],
    "others": ["Toko Maju Jaya", "CV Sukses Mandiri"]
};

// 4. BRANCH/REGION DATA
const branches = [
    {
        value: "cempaka_putih",
        label: "Cempaka Putih",
        region: "jakarta",
        target_visits_per_month: 45      // Target kunjungan bulanan
    },
    {
        value: "jakarta_pusat", 
        label: "Jakarta Pusat",
        region: "jakarta",
        target_visits_per_month: 50
    }
];

// 5. MONTHLY REPORT CALCULATION STRUCTURE
const monthlyReportMetrics = {
    // Planning Metrics
    total_planned_activities: 0,
    total_planned_customer_visits: 0,
    
    // Execution Metrics  
    total_executed_activities: 0,
    total_customer_visits: 0,
    
    // Performance Calculations
    planning_percentage: 0,             // executed / planned * 100
    on_planning_percentage: 0,          // on_time execution rate
    off_planning_percentage: 0,         // late/rescheduled rate
    
    // Customer Visit Metrics
    total_cust_visit_percentage: 0,     // vs target
    repetition_percentage: 0,           // repeat customers vs new
    
    // Customer Category Breakdown
    assurance_visited: 0,
    company_visited: 0, 
    others_visited: 0,
    
    // Derived Metrics
    total_visit: 0,
    total_cust_planned: 0,
    
    // Performance Alerts
    alerts: [
        {
            type: "warning",            // warning, danger, info
            message: "Planning percentage below 80%",
            metric: "planning_percentage", 
            threshold: 80
        }
    ]
};

// 6. DATABASE SCHEMA CONCEPT (untuk nanti)
const databaseTables = {
    weekly_plannings: {
        id: "UUID",
        user_id: "Foreign Key",
        branch_id: "Foreign Key", 
        month: "Date",
        status: "Enum",
        created_at: "Timestamp",
        updated_at: "Timestamp"
    },
    
    weekly_planning_days: {
        id: "UUID",
        planning_id: "Foreign Key",
        week_number: "Integer",
        date: "Date",
        day_name: "String"
    },
    
    weekly_activities: {
        id: "UUID", 
        planning_day_id: "Foreign Key",
        activity_type: "Enum",
        customer_name: "String",
        planned_time: "Time",
        notes: "Text",
        status: "Enum",
        
        // Execution fields
        actual_time: "Time",
        actual_notes: "Text", 
        completed_at: "Timestamp",
        execution_status: "Enum"
    },
    
    monthly_reports: {
        id: "UUID",
        planning_id: "Foreign Key", 
        metrics_json: "JSON",       // Store calculated metrics
        generated_at: "Timestamp"
    }
};

export {
    weeklyPlanningData,
    activityTypes,
    customerCategories,
    branches,
    monthlyReportMetrics,
    databaseTables
};