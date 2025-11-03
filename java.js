// Current date in footer (update to 2025 format)
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-GB');

// Supabase Setup – REPLACE WITH YOUR CREDENTIALS
const SUPABASE_URL = 'https://YOUR_SUPABASE_URL.supabase.co';  // e.g., https://abc123xyz.supabase.co
const SUPABASE_KEY = 'YOUR_ANON_KEY';  // e.g., eyJhbGciOiJIUzI1NiIs...

// Import Supabase (CDN for HTML)
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Contact Form Handler
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');  // Add <div id="form-status"></div> after form in index.html if missing

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const data = {
    name: fd.get('name'),
    email: fd.get('email'),
    message: fd.get('message'),
    created_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from('messages')
    .insert([data]);

  if (error) {
    status.textContent = 'Error – try again';
    status.style.color = '#dc2626';
    console.error('DB Error:', error);
  } else {
    status.textContent = 'Message saved! I’ll reply soon.';
    status.style.color = '#16a34a';
    form.reset();
  }
});
