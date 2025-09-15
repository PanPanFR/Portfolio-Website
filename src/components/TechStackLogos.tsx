import React from 'react';
import LogoLoop from './LogoLoop';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiSass, SiTailwindcss,
  SiReact, SiReactrouter, SiNextdotjs, SiNestjs, SiVuedotjs, SiExpress, SiFastapi, SiFlask, SiElectron, SiChartdotjs,
  SiNodedotjs, SiVite, SiEsbuild, SiNpm, SiPnpm, SiBun,
  SiMongodb, SiMysql, SiPostgresql, SiRedis, SiSupabase, SiFirebase,
  SiGooglecloud, SiVercel, SiNetlify, SiRender, SiNginx, SiDocker,
  SiGit, SiGithub, SiGithubactions, SiPostman, SiJsonwebtokens, SiEslint, SiPrettier, SiElasticsearch
} from 'react-icons/si';

const techLogos = [
  // Languages & Styling
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" },
  { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org/" },
  { node: <SiSass />, title: "SASS", href: "https://sass-lang.com/" },
  { node: <SiTailwindcss />, title: "TailwindCSS", href: "https://tailwindcss.com/" },
  
  // Frameworks & Libraries
  { node: <SiReact />, title: "React", href: "https://react.dev/" },
  { node: <SiReactrouter />, title: "React Router", href: "https://reactrouter.com/" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org/" },
  { node: <SiNestjs />, title: "NestJS", href: "https://nestjs.com/" },
  { node: <SiVuedotjs />, title: "Vue.js", href: "https://vuejs.org/" },
  { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com/" },
  { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com/" },
  { node: <SiFlask />, title: "Flask", href: "https://flask.palletsprojects.com/" },
  { node: <SiElectron />, title: "Electron", href: "https://www.electronjs.org/" },
  { node: <SiChartdotjs />, title: "Chart.js", href: "https://www.chartjs.org/" },
  
  // Build Tools & Package Managers
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org/" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev/" },
  { node: <SiEsbuild />, title: "Esbuild", href: "https://esbuild.github.io/" },
  { node: <SiNpm />, title: "NPM", href: "https://www.npmjs.com/" },
  { node: <SiPnpm />, title: "PNPM", href: "https://pnpm.io/" },
  { node: <SiBun />, title: "Bun", href: "https://bun.sh/" },
  
  // Databases & Backend
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com/" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com/" },
  { node: <SiPostgresql />, title: "Postgres (PostgreSQL)", href: "https://www.postgresql.org/" },
  { node: <SiRedis />, title: "Redis", href: "https://redis.io/" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com/" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com/" },
  
  // Cloud & Deployment
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com/" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com/" },
  { node: <SiNetlify />, title: "Netlify", href: "https://www.netlify.com/" },
  { node: <SiRender />, title: "Render", href: "https://render.com/" },
  { node: <SiNginx />, title: "Nginx", href: "https://www.nginx.com/" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com/" },
  
  // DevOps & Tools
  { node: <SiGit />, title: "Git", href: "https://git-scm.com/" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/" },
  { node: <SiGithubactions />, title: "GitHub Actions", href: "https://github.com/features/actions" },
  { node: <SiPostman />, title: "Postman", href: "https://www.postman.com/" },
  { node: <SiJsonwebtokens />, title: "JWT (JSON Web Tokens)", href: "https://jwt.io/" },
  { node: <SiEslint />, title: "ESLint", href: "https://eslint.org/" },
  { node: <SiPrettier />, title: "Prettier", href: "https://prettier.io/" },
  { node: <SiElasticsearch />, title: "Elasticsearch", href: "https://www.elastic.co/elasticsearch/" },
];

const TechStackLogos: React.FC = () => {
  return (
    <div className="col-span-4 p-0.5 rounded mt-1">
      <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }} className="flex items-center">
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={35}
          gap={35}
          pauseOnHover
          scaleOnHover
          fadeOut
          ariaLabel="Technology stack"
        />
      </div>
    </div>
  );
};

export default TechStackLogos;