import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// D1 데이터베이스 연결 (로컬 또는 원격)
// 추후 실제 배포 시에는 Cloudflare 환경 변수 바인딩을 사용하게 됩니다.
const client = createClient({
  url: process.env.DATABASE_URL || 'file:./local.db', 
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);