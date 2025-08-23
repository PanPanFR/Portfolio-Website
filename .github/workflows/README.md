# GitHub Actions Workflows

Repository ini menggunakan GitHub Actions untuk otomatisasi CI/CD (Continuous Integration/Continuous Deployment).

## Workflows yang Tersedia

### 1. **deploy.yml** - Deploy Otomatis ke GitHub Pages
- **Trigger**: Push ke branch `main` atau Pull Request ke `main`
- **Fungsi**: Build dan deploy otomatis ke GitHub Pages
- **Node.js Version**: 20.x
- **Features**:
  - Linting otomatis
  - Build otomatis
  - Deploy ke GitHub Pages

### 2. **test.yml** - Quality Check dan Testing
- **Trigger**: Push ke branch `main` atau `develop`, Pull Request ke `main` atau `develop`
- **Fungsi**: Quality assurance sebelum deploy
- **Features**:
  - Linting check
  - Type checking
  - Format checking dengan Prettier

### 3. **ci-cd.yml** - Pipeline CI/CD Lengkap
- **Trigger**: Push ke branch `main` atau `develop`, Pull Request, atau Manual trigger
- **Fungsi**: Pipeline lengkap dengan multiple environments
- **Features**:
  - Quality check
  - Build dengan artifacts
  - Deploy ke staging (branch `develop`)
  - Deploy ke production (branch `main`)
  - Manual deployment option

## Cara Kerja

### Branch Strategy
- **`main`**: Branch production, auto-deploy ke production
- **`develop`**: Branch development, auto-deploy ke staging
- **Feature branches**: Bisa dibuat dari `develop` untuk development

### Deployment Flow
1. **Push ke `develop`** → Deploy ke staging
2. **Push ke `main`** → Deploy ke production
3. **Pull Request** → Quality check tanpa deploy
4. **Manual trigger** → Pilih environment (staging/production)

## Environment Variables

Workflow otomatis membuat file `.env` dengan:
- `VITE_NICKNAME`: PanPanFR
- `VITE_FULL_NAME`: Pandu Fatikha Rahmadana
- `VITE_GITHUB_LINK`: Link GitHub profile
- `VITE_LINKEDIN_LINK`: Link LinkedIn profile
- `VITE_GITHUB_API_LINK`: API endpoint untuk GitHub stats

## Manual Deployment

Untuk deploy manual:
1. Buka tab "Actions" di GitHub
2. Pilih workflow "CI/CD Pipeline"
3. Klik "Run workflow"
4. Pilih environment (staging/production)
5. Klik "Run workflow"

## Monitoring

- **Status**: Lihat di tab "Actions"
- **Deployment**: Lihat di tab "Environments"
- **Pages**: Lihat di repository settings > Pages

## Troubleshooting

### Build Failed
- Cek error di log workflow
- Pastikan semua dependencies terinstall
- Cek TypeScript errors

### Deploy Failed
- Pastikan GitHub Pages enabled
- Cek permissions repository
- Verifikasi environment configuration
