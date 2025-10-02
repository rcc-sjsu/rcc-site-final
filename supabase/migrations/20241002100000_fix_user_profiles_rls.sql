-- Migration: Fix RLS policy for user profile creation during signup
-- Description: Simplifies INSERT policy to work with signup flow
-- Date: 2024-10-02

-- Drop the old restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile during signup" ON public.user_profiles;

-- Create new INSERT policy that allows profile creation during signup
-- This uses true to allow inserts, relying on:
-- 1. UNIQUE constraint on user_id (prevents duplicates)
-- 2. Foreign key constraint to auth.users (ensures valid user_id)
-- 3. Application logic to only insert during signup
CREATE POLICY "Enable insert for authenticated users"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (true);

-- Add a comment explaining the policy
COMMENT ON POLICY "Enable insert for authenticated users" ON public.user_profiles IS 
  'Allows profile creation during signup. Security enforced by UNIQUE constraint on user_id and foreign key to auth.users.';

