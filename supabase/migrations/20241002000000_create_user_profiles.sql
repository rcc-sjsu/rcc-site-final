-- Migration: Create user_profiles table for RCC member signup
-- Description: Stores extended profile information for authenticated users
-- Author: RCC Web Dev Team
-- Date: 2024-10-02

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Account Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Academic Info
  year TEXT NOT NULL,
  major TEXT NOT NULL,
  minor TEXT,
  graduation_year TEXT NOT NULL,
  
  -- Club Info
  how_heard TEXT NOT NULL,
  interest_areas TEXT[] NOT NULL DEFAULT '{}',
  membership_type TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@sjsu\.edu$')
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can insert their own profile (during signup)
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE public.user_profiles IS 'Extended profile information for RCC members';
COMMENT ON COLUMN public.user_profiles.interest_areas IS 'Array of club interest areas (Web Dev, Marketing, etc.)';

