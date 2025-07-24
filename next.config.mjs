const nextConfig = {
  output: 'export',          
  basePath: process.env.NODE_ENV === 'production' ? '/bullet-journal' : '',
  trailingSlash: true,
  images: { unoptimized: true }, 
};

export default nextConfig;