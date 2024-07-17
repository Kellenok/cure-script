import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

interface SidebarItem {
  text: string;
  link: string;
}

interface SidebarGroup {
  text: string;
  items: SidebarItem[];
}

// Получаем список всех .md файлов в папке docs
const mdFiles: string[] = glob.sync('**/*.md', { cwd: 'docs' });

// Функция для извлечения числа из названия файла
const getFileNumber = (fileName: string): number => {
  const match = fileName.match(/-(\d+)-/);
  return match ? parseInt(match[1], 10) : Infinity;
};

// Сортируем файлы по порядковому числу в названии
mdFiles.sort((a, b) => {
  const aNum = getFileNumber(a);
  const bNum = getFileNumber(b);
  return aNum - bNum;
});

// Формируем данные для боковой панели
const sidebarData: SidebarGroup[] = [
  {
    text: 'Examples',
    items: [
      { text: 'Runtime API Examples', link: '/api-examples' },
      ...mdFiles.map((file, index) => ({
        text: `${index + 1}. ${path.basename(file, '.md').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        link: `/${file.replace('.md', '')}`
      }))
    ]
  }
];

// Создаем директорию .vitepress, если ее нет
const vitepressDir = '.vitepress';
if (!fs.existsSync(vitepressDir)) {
  fs.mkdirSync(vitepressDir);
}

// Сохраняем данные для боковой панели в файл .vitepress/sidebar.mts
const sidebarConfigPath = path.join(vitepressDir, 'sidebar.mts');
const sidebarConfig = `sidebar: ${generateSidebarConfig(sidebarData)}`;
fs.writeFileSync(sidebarConfigPath, sidebarConfig);

console.log(`Sidebar data saved to ${sidebarConfigPath}`);

// Функция для генерации конфигурации боковой панели в формате .mts
function generateSidebarConfig(data: SidebarGroup[]): string {
  const groups = data.map(group => {
    const items = group.items.map(item => `{ text: '${item.text}', link: '${item.link}' }`);
    return `{
  text: '${group.text}',
  items: [
    ${items.join(',\n    ')}
  ]
}`;
  });
  return `[
  ${groups.join(',\n  ')}
]`;
}