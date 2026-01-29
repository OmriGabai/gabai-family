-- Schema for Gabai Family website
-- Run this in Vercel Postgres console

-- Family members table
CREATE TABLE IF NOT EXISTS family_members (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  site_title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES family_members(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  visitor_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, visitor_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_member_id ON posts(member_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);

-- Insert family members
INSERT INTO family_members (slug, name, site_title) VALUES
  ('gili', 'גילי', 'העולם המופלא של גילי'),
  ('ron', 'רון', NULL),
  ('yana', 'יאנה', NULL),
  ('omri', 'עומרי', NULL)
ON CONFLICT (slug) DO NOTHING;
