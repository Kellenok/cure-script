-- furigana.lua
-- Converts [kanji]{kana} into HTML5 <ruby>kanji<rp>(</rp><rt>kana</rt><rp>)</rp></ruby>
function Str(el)
  local text = el.text
  if not text:find("%[") or not text:find("%{") then
    return nil
  end

  local inlines = {}
  local pos = 1
  while pos <= #text do
    local s, e, kanji, kana = text:find("%[([^%]]+)%]%{([^%}]+)%}", pos)
    if s then
      if s > pos then
        table.insert(inlines, pandoc.Str(text:sub(pos, s - 1)))
      end
      local ruby_html = "<ruby>" .. kanji .. "<rp>(</rp><rt>" .. kana .. "</rt><rp>)</rp></ruby>"
      table.insert(inlines, pandoc.RawInline("html", ruby_html))
      pos = e + 1
    else
      table.insert(inlines, pandoc.Str(text:sub(pos)))
      break
    end
  end

  if #inlines > 0 then
    return inlines
  end
  return nil
end
