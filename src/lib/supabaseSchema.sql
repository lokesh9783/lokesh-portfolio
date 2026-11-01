-- ==============================================================================
-- LOKESH KUMAWAT PORTFOLIO & CMS - SUPABASE POSTGRESQL SCHEMA
-- Run this in your Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    headline TEXT NOT NULL,
    subtitle TEXT,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT,
    availability TEXT,
    is_available_for_hire BOOLEAN DEFAULT true,
    resume_url TEXT,
    experience_letter_url TEXT,
    certificates_portal_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_experiences (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    skills TEXT[],
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. EDUCATIONS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_educations (
    id TEXT PRIMARY KEY,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    location TEXT,
    period TEXT,
    highlights TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT DEFAULT 'Advanced',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    badge TEXT,
    description TEXT NOT NULL,
    deliverables TEXT[],
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    tags TEXT[],
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CERTIFICATES & DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_certificates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT,
    date TEXT,
    type TEXT,
    file_url TEXT,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. CONTACT INQUIRIES & MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures public can READ portfolio data and SUBMIT messages,
-- while only AUTHENTICATED users (you, the admin) can modify content.
-- ==============================================================================

ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_messages ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public Read Profiles" ON public.portfolio_profile FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.portfolio_experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Educations" ON public.portfolio_educations FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.portfolio_skills FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.portfolio_services FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.portfolio_certificates FOR SELECT USING (true);

-- Public can insert contact inquiries
CREATE POLICY "Public Can Submit Messages" ON public.portfolio_messages FOR INSERT WITH CHECK (true);

-- Authenticated Admin full access
CREATE POLICY "Admin All Profiles" ON public.portfolio_profile FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Experiences" ON public.portfolio_experiences FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Educations" ON public.portfolio_educations FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Skills" ON public.portfolio_skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Services" ON public.portfolio_services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Projects" ON public.portfolio_projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Certificates" ON public.portfolio_certificates FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Messages" ON public.portfolio_messages FOR ALL TO authenticated USING (true);
