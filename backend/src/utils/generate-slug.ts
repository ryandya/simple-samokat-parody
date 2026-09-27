export const generateSlug = (text: string): string => {
    const ru = "а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я".split(" ")
    const en = [
        "a", "b", "v", "g", "d", "e", "yo", "zh", "z", "i", "y",
        "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f",
        "h", "ts", "ch", "sh", "sch", "", "y", "", "e", "yu", "ya"
    ]

    return text
        .toLowerCase()
        .split("")
        .map((char) => {
            const index = ru.indexOf(char)
            return index !== -1 ? en[index] : char
        })
        .join("")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
};