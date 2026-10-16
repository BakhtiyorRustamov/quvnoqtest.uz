"""Uzbek Latin -> Cyrillic transliteration (for MMS-TTS, which was trained on Cyrillic)."""
import re

# apostrophe variants used for oʻ / gʻ / tutuq belgisi
_APOS = "ʻʼ'‘’`´"

_DIGRAPHS = [
    ("yo" + a, "йў") for a in _APOS
] + [
    ("o" + a, "ў") for a in _APOS
] + [
    ("g" + a, "ғ") for a in _APOS
] + [
    ("sh", "ш"), ("ch", "ч"), ("yo", "ё"), ("yu", "ю"), ("ya", "я"), ("ye", "е"),
]

_SINGLE = {
    "a": "а", "b": "б", "d": "д", "e": "е", "f": "ф", "g": "г", "h": "ҳ", "i": "и",
    "j": "ж", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", "q": "қ",
    "r": "р", "s": "с", "t": "т", "u": "у", "v": "в", "x": "х", "y": "й", "z": "з",
    "c": "с", "w": "в",
}

_ONES = ["nol", "bir", "ikki", "uch", "toʻrt", "besh", "olti", "yetti", "sakkiz", "toʻqqiz"]
_TENS = ["", "oʻn", "yigirma", "oʻttiz", "qirq", "ellik", "oltmish", "yetmish", "sakson", "toʻqson"]


def number_words(n: int) -> str:
    """0..999999 as Uzbek Latin words (so digits are spoken, not skipped)."""
    if n < 10:
        return _ONES[n]
    if n < 100:
        t, o = divmod(n, 10)
        return _TENS[t] + ("" if o == 0 else " " + _ONES[o])
    if n < 1000:
        h, r = divmod(n, 100)
        head = "yuz" if h == 1 else _ONES[h] + " yuz"
        return head + ("" if r == 0 else " " + number_words(r))
    if n < 1_000_000:
        th, r = divmod(n, 1000)
        head = "ming" if th == 1 else number_words(th) + " ming"
        return head + ("" if r == 0 else " " + number_words(r))
    return str(n)


def to_cyrillic(text: str) -> str:
    text = re.sub(r"\d+", lambda m: number_words(int(m.group())), text)
    out = []
    i = 0
    low = text.lower()
    while i < len(text):
        ch = text[i]
        matched = False
        for lat, cyr in _DIGRAPHS:
            if low.startswith(lat, i):
                rep = cyr
                out.append(rep[0].upper() + rep[1:] if ch.isupper() else rep)
                i += len(lat)
                matched = True
                break
        if matched:
            continue
        lc = ch.lower()
        if lc == "e":
            prev_letter = i > 0 and low[i - 1].isalpha()
            rep = "е" if prev_letter else "э"
        elif lc in _SINGLE:
            rep = _SINGLE[lc]
        elif ch in _APOS:
            rep = "ъ"  # tutuq belgisi (maʼno -> маъно)
        else:
            rep = ch
        out.append(rep.upper() if ch.isupper() and rep != ch else rep)
        i += 1
    return "".join(out)


if __name__ == "__main__":
    for s in [
        "Aylana markazidan uning istalgan chekka nuqtasigacha boʻlgan masofa radius deyiladi.",
        "Velosiped gʻildiragini koʻrganmisan? Shu simlarning har biri — radius!",
        "Agar diametr 10 santimetr boʻlsa, radius 5 santimetr.",
        "Eng muhim qoida: maʼno, yangi, yoʻl, choʻqqi, sheʼr.",
    ]:
        print(to_cyrillic(s))
