import { defineConfig } from 'drizzle-kit';

// drizzle.config.ts
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './local.db', // 여기를 index.ts와 맞춰줍니다.
  },
});