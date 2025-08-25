import { createClient } from '@supabase/supabase-js';
const URL = 'https://ejxoywdnxtljgkvxfdqu.supabase.co';
const API_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqeG95d2RueHRsamdrdnhmZHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTA1ODMsImV4cCI6MjA3MTYyNjU4M30.tLqfMxQClbKbKKyazT6QPE0NVz8j3vPUIpckceXsvPw';
export const supabase = createClient(URL, API_KEY);


