import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

export const supabase = createClient('https://gmosiigapqapgevmioyq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtb3NpaWdhcHFhcGdldm1pb3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxOTE3NDQsImV4cCI6MTk4OTc2Nzc0NH0.5qO6tU8dgopabz_B-Gbr2CORNNGMhKTe23dyH9yGXVQ')
