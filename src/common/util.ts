export function capitalizeWord(word: string) {
    const firstChar = word[0];
    return word.replace(firstChar, firstChar.toUpperCase());
}