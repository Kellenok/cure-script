import os
import re

# Укажите путь к папке с вашими .md файлами.
# Точка '.' означает "текущая папка", где запущен скрипт.
directory_path = 'G:/cure-script/config/docs/ru'

print("Шаг 1: Создание карты файлов по номерам уроков...")

# Словарь для хранения соответствия "номер урока" -> "имя файла"
lesson_file_map = {}

# Регулярное выражение для извлечения номера урока из имени файла
filename_pattern = re.compile(r'^([0-9a-zA-Z.]+)-.*\.md$')

for filename in os.listdir(directory_path):
    match = filename_pattern.match(filename)
    if match:
        lesson_id = match.group(1)
        lesson_file_map[lesson_id] = filename
        print(f"  > Найден урок '{lesson_id}' -> файл '{filename}'")

print("\nШаг 2: Поиск и замена текста в файлах...")

# ОБНОВЛЕННОЕ регулярное выражение.
# \s? в начале ищет один опциональный пробельный символ перед всей конструкцией.
content_pattern = re.compile(r'\s?\*\s*\(\s*Урок\s+([0-9a-zA-Z.]+)\s*\)\s*\*')

# Счётчик сделанных замен
total_replacements = 0

# Проходим по всем файлам в директории
for filename in os.listdir(directory_path):
    if filename.endswith('.md'):
        file_path = os.path.join(directory_path, filename)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
        except Exception as e:
            print(f"Ошибка чтения файла {filename}: {e}")
            continue

        # Функция для выполнения замены
        def perform_replacement(match):
            global total_replacements
            lesson_id = match.group(1)  # Захваченный номер урока, например, '8b'
            
            # Ищем имя файла в нашей карте
            target_filename = lesson_file_map.get(lesson_id)
            
            if target_filename:
                # Если файл найден, формируем новую строку.
                # Она заменит всё, что нашло выражение, включая опциональный пробел.
                replacement_string = f'<sup>[[{lesson_id}]](./{target_filename})</sup>'
                print(f"  - В файле '{filename}': замена '{match.group(0).strip()}' на '{replacement_string}'")
                total_replacements += 1
                return replacement_string
            else:
                # Если для номера урока нет файла, оставляем как есть и выводим предупреждение
                print(f"  - ВНИМАНИЕ: В файле '{filename}' найдена ссылка на урок '{lesson_id}', но файл для него не найден. Замена не произведена.")
                return match.group(0) # Возвращаем исходное совпадение без изменений

        # Применяем замену ко всему содержимому файла
        updated_content = content_pattern.sub(perform_replacement, original_content)
        
        # Если содержимое изменилось, перезаписываем файл
        if updated_content != original_content:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"  > Файл '{filename}' успешно обновлен.")
            except Exception as e:
                print(f"Ошибка записи в файл {filename}: {e}")

print(f"\nГотово! Всего произведено замен: {total_replacements}.")