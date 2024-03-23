const {Pool} = require("pg");
const config = require("./config");

const pool = new Pool({
  supabase_url: config.db.supabase_url,
});

module.exports = pool; 
