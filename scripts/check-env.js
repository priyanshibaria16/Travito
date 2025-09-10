// This script checks if environment variables are being loaded correctly
console.log('Environment Variables:');
console.log('---------------------');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GITHUB_ID:', process.env.GITHUB_ID ? '***' : 'Not Set');
console.log('GITHUB_SECRET:', process.env.GITHUB_SECRET ? '***' : 'Not Set');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '***' : 'Not Set');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '***' : 'Not Set');
console.log('---------------------');
console.log('If you see "Not Set" for any required variables, please check your .env.local file');
